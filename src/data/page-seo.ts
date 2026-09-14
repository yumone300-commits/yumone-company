import {servicePages} from './service-pages';
import type {Metadata} from 'next';
export type PageSEO={title?:string;description?:string;canonical?:string;ogTitle?:string;ogDescription?:string;ogImage?:string;keywords?:string[];robots?:Metadata['robots']};
// Add URL-specific editorial overrides here. Menu titles remain in navigation.ts.
export const pageSEO:Record<string,PageSEO>=Object.fromEntries(Object.values(servicePages).map(p=>[p.href,{title:p.title,description:p.description,ogTitle:p.before+' '+p.emphasis+' '+p.after,ogDescription:p.description,ogImage:p.image,keywords:[p.title,p.emphasis,'염원컴퍼니']}]));
