"""Validate static export: route coverage, headings, metadata, assets and internal links."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json

root=Path(__file__).resolve().parents[1]
out=root/'out'
class Page(HTMLParser):
    def __init__(self,text):
        super().__init__();self.h1=0;self.title='';self.in_title=False;self.meta={};self.links=[];self.assets=[];self.ids=set();self.schema=[];self.in_schema=False
        self.feed(text)
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='h1':self.h1+=1
        if tag=='title':self.in_title=True
        if 'id' in a:self.ids.add(a['id'])
        if tag=='meta':self.meta[a.get('name',a.get('property',''))]=a.get('content','')
        if tag=='link' and a.get('rel')=='canonical':self.meta['canonical']=a.get('href','')
        if tag=='a':self.links.append(a.get('href',''))
        if tag=='img':self.assets.append((a.get('src',''),a.get('alt')))
        if tag=='script' and a.get('type')=='application/ld+json':self.in_schema=True
    def handle_endtag(self,tag):
        if tag=='title':self.in_title=False
        if tag=='script':self.in_schema=False
    def handle_data(self,data):
        if self.in_title:self.title+=data
        if self.in_schema:self.schema.append(json.loads(data))

pages={('/'+str(p.parent.relative_to(out)).replace('\\','/')).replace('/.','/'):(p,Page(p.read_text(encoding='utf-8'))) for p in out.rglob('index.html') if '_not-found' not in str(p) and p.parent.name != '404'}
errors=[];titles=set();descriptions=set();links=0
for route,(p,page) in pages.items():
    if page.h1!=1:errors.append(f'{route}: H1={page.h1}')
    if not page.title or page.title in titles:errors.append(f'{route}: missing/duplicate title')
    titles.add(page.title)
    for key in ['description','canonical','og:title','og:description']:
        if not page.meta.get(key):errors.append(f'{route}: missing {key}')
    if page.meta.get('description') in descriptions:errors.append(f'{route}: duplicate description')
    descriptions.add(page.meta.get('description'))
    for src,alt in page.assets:
        if not alt:errors.append(f'{route}: missing image alt')
        if src.startswith('/') and not (out/unquote(src.lstrip('/'))).is_file():errors.append(f'{route}: missing asset {src}')
    for href in page.links:
        parsed=urlsplit(href)
        if parsed.scheme or parsed.netloc:continue
        target=parsed.path.rstrip('/') or route
        if not parsed.path:target=route
        if target=='':target='/'
        if target not in pages:
            if target=='/':target='/'
            else:errors.append(f'{route}: broken link {href}');continue
        if parsed.fragment and parsed.fragment not in pages[target][1].ids:errors.append(f'{route}: missing anchor {href}')
        links+=1
for required in ['sitemap.xml','robots.txt']:
    if not (out/required).is_file():errors.append(f'missing {required}')
report={'pages':len(pages),'internal_links_checked':links,'unique_titles':len(titles),'errors':errors,'routes':sorted(pages)}
(root/'QA-static.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in report.items() if k!='routes'},ensure_ascii=False))
raise SystemExit(bool(errors))

