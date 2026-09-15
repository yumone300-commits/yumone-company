import type {Metadata} from 'next';
import {site} from '@/data/site';
import {pageSEO} from '@/data/page-seo';
import {allNavigationPages} from '@/data/navigation';


export function metadata(title:string,description:string,path:string):Metadata{const href=path.replace(/\/$/,'')||'/';const config=pageSEO[href]||{};const page=allNavigationPages.find(p=>p.href===href);const name=config.title||page?.title||title;const desc=config.description||page?.description||description;const canonical=config.canonical||site.url+(href==='/'?'/':href+'/');return {title:name,description:desc,keywords:config.keywords||[page?.title||title,'염원컴퍼니'],robots:config.robots||{index:true,follow:true},alternates:{canonical},openGraph:{title:config.ogTitle||`${name} | ${site.name}`,description:config.ogDescription||desc,url:canonical,images:[{url:config.ogImage||'/images/yumone-official-logo.png',alt:site.name}],siteName:site.englishName,locale:'ko_KR',type:'website'}}}
export function JsonLd({data}:{data:Record<string,unknown>}){return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org',...data}).replace(/</g,'\\u003c')}}/>}
export function BreadSchema({items}:{items:{label:string;href:string}[]}){return <JsonLd data={{'@type':'BreadcrumbList',itemListElement:[{label:'홈',href:'/'},...items].map((x,i)=>({'@type':'ListItem',position:i+1,name:x.label,item:site.url+x.href}))}}/>}

