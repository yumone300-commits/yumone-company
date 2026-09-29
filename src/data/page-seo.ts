import {serviceGuides} from './service-guide';
import {companyPage,founderPage} from './about-pages';
import {servicePages} from './service-pages';
import type {Metadata} from 'next';
export type PageSEO={title?:string;description?:string;canonical?:string;ogTitle?:string;ogDescription?:string;ogImage?:string;keywords?:string[];robots?:Metadata['robots']};
// Add URL-specific editorial overrides here. Menu titles remain in navigation.ts.
export const pageSEO:Record<string,PageSEO>=Object.fromEntries(Object.values(servicePages).map(p=>[p.href,{title:p.title,description:p.description,ogTitle:p.before+' '+p.emphasis+' '+p.after,ogDescription:p.description,ogImage:p.image,keywords:[p.title,p.emphasis,'염원컴퍼니']}]));

pageSEO['/about/company']={title:'회사 소개',description:companyPage.description,ogTitle:companyPage.title.replace('\n',' '),ogDescription:companyPage.description};
pageSEO['/about/founder']={title:'대표 소개 · 염혜단',description:founderPage.description,ogTitle:founderPage.title.replace('\n',' '),ogDescription:founderPage.description};
for(const p of Object.values(serviceGuides)){pageSEO[p.href]={...pageSEO[p.href],title:pageSEO[p.href]?.title||p.title,description:p.description,ogTitle:p.headline.replace('\n',' '),ogDescription:p.description};}

pageSEO['/insight']={title:'블로그',description:'가맹모집부터 가맹점 매출, AI 마케팅과 SV 교육까지. 프랜차이즈 현장에서 바로 적용할 방법을 전합니다.',keywords:['블로그','프랜차이즈 마케팅','염원컴퍼니']};

pageSEO['/education']={title:'교육 서비스',description:'프랜차이즈 본사를 위한 현장 실무 교육. SV 실무·가맹점 AI 마케팅·가맹점주 온라인 교육을 염원 SV 아카데미에서 만나보세요.',ogTitle:'교육 서비스 | 염원 SV 아카데미',ogImage:'/images/education-academy/original-01.jpg'};
