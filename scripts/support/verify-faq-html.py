"""Verify actual initial response markup, not hydrated DOM or JSON-LD alone."""
import json,sys,urllib.request
from html.parser import HTMLParser
from pathlib import Path
class Page(HTMLParser):
 def __init__(self):
  super().__init__();self.details={};self.current=None;self.scripts=[];self.script=None;self.meta={};self.canonical='';self.links=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='details':self.current=a.get('id');self.details[self.current]=''
  if tag=='script' and a.get('type')=='application/ld+json':self.script=''
  if tag=='meta':self.meta[a.get('name',a.get('property',''))]=a.get('content')
  if tag=='link' and a.get('rel')=='canonical':self.canonical=a.get('href')
  if tag=='a':self.links.append(a.get('href',''))
 def handle_endtag(self,tag):
  if tag=='details':self.current=None
  if tag=='script' and self.script is not None:self.scripts.append(json.loads(self.script));self.script=None
 def handle_data(self,data):
  if self.current:self.details[self.current]+=data
  if self.script is not None:self.script+=data
base=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:4198'
r=urllib.request.urlopen(base+'/support/faq/');assert r.status==200
p=Page();p.feed(r.read().decode())
approved=json.loads(Path('src/data/faq-approved.json').read_text(encoding='utf-8'))
assert len(p.details)==15
for f in approved:
 for field in ['question','core','detail']:assert f[field] in p.details[f['id']],(f['id'],field)
schema=next(s for s in p.scripts if s.get('@type')=='FAQPage')
assert len(schema['mainEntity'])==15
for f,q in zip(approved,schema['mainEntity']):assert q['name']==f['question'] and q['acceptedAnswer']['text']==f['core']+'\n\n'+f['detail']
assert p.canonical==p.meta['og:url']=='https://www.yumone.co.kr/support/faq/'
assert 'noindex' not in p.meta.get('robots','') and 'nosnippet' not in p.meta.get('robots','')
assert 'keywords' not in p.meta
sitemap=urllib.request.urlopen(base+'/sitemap.xml').read().decode()
assert sitemap.count('<loc>https://www.yumone.co.kr/support/faq/</loc>')==1
for path in sorted(set(f['href'].split('#')[0] for f in approved)|{'/support/notices/','/insight/','/support/inquiry/'}):
 response=urllib.request.urlopen(base+path);assert response.status==200,path
print('PASS: initial HTML contains all 15 full answers; JSON-LD matches; canonical/OG/robots/sitemap; service and regression routes HTTP 200')
