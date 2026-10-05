import approved from '@/data/faq-approved.json';
import {publishable, type SupportEntry} from './core';

export type Faq = typeof approved[number];
export const faqPath = '/support/faq/';
export const faqUrl = 'https://www.yumone.co.kr' + faqPath;
export const faqTitle = '프랜차이즈 마케팅·교육 자주 묻는 질문';
export const faqDescription = '프랜차이즈 본사·가맹점 마케팅, SEO·AEO·GEO, 슈퍼바이저·점주 교육, 자료 이용과 상담 절차에 관한 염원컴퍼니의 자주 묻는 질문을 확인하세요.';
export const faqCategories = ['전체', '마케팅', '교육', '자료·문의'];

// The approved file remains available without CMS credentials. A successful CMS
// read overrides matching stable IDs, including explicit unpublishing.
export function mergeFaq(entries: SupportEntry[], cmsReady: boolean): Faq[] {
  const merged = new Map(approved.map(f => [f.id, {...f}]));
  if (!cmsReady) return [...merged.values()];
  for (const e of entries.filter(e => e.kind === 'faq').sort((a,b) => a.order-b.order || a.id.localeCompare(b.id))) {
    const id = e.sourceId || e.slug;
    const base = merged.get(id);
    if (!publishable(e)) { if (base) merged.delete(id); continue; }
    if (!/^[a-zA-Z0-9-]+$/.test(id)) continue;
    merged.set(id, {
      id, question:e.title, core:e.summary || e.body.split('\n')[0],
      detail:e.summary ? e.body : e.body.split('\n').slice(1).join('\n'),
      category:faqCategories.includes(e.category) && e.category!=='전체' ? e.category : '자료·문의',
      keywords:base?.keywords || [], href:base?.href || '/contact/',
      linkLabel:base?.linkLabel || '1:1 문의 남기기',
    });
  }
  return [...merged.values()];
}

export function matchesFaq(f: Faq, q: string, category: string) {
  const terms=q.trim().toLocaleLowerCase('ko').split(/\s+/).filter(Boolean);
  const text=[f.question,f.core,f.detail,...f.keywords].join(' ').toLocaleLowerCase('ko');
  return (category==='전체' || f.category===category) && terms.every(term=>text.includes(term));
}
export function faqSchema(entries: Faq[], organizationId: string) {
  return {'@type':'FAQPage', '@id':faqUrl+'#faq', url:faqUrl, name:faqTitle,
    inLanguage:'ko-KR', publisher:{'@id':organizationId},
    mainEntity:entries.map(f=>({'@type':'Question','@id':faqUrl+'#'+f.id,name:f.question,
      acceptedAnswer:{'@type':'Answer',text:[f.core,f.detail].filter(Boolean).join('\n\n')}}))};
}
