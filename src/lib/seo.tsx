import type {Metadata} from 'next';
import {site} from '@/data/site';
export function metadata(title:string,description:string,path:string):Metadata{return {title,description,alternates:{canonical:path},openGraph:{title:`${title} | ${site.name}`,description,url:path,siteName:site.englishName,locale:'ko_KR',type:'website'}}}
export function JsonLd({data}:{data:Record<string,unknown>}){return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org',...data}).replace(/</g,'\\u003c')}}/>}
export function BreadSchema({items}:{items:{label:string;href:string}[]}){return <JsonLd data={{'@type':'BreadcrumbList',itemListElement:[{label:'홈',href:'/'},...items].map((x,i)=>({'@type':'ListItem',position:i+1,name:x.label,item:site.url+x.href}))}}/>}
