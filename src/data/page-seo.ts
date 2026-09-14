import type {Metadata} from 'next';
export type PageSEO={title?:string;description?:string;canonical?:string;ogTitle?:string;ogDescription?:string;ogImage?:string;keywords?:string[];robots?:Metadata['robots']};
// Add URL-specific editorial overrides here. Menu titles remain in navigation.ts.
export const pageSEO:Record<string,PageSEO>={};
