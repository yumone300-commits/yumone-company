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
