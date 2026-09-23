import type {Metadata} from 'next';
import Link from 'next/link';
import {Fragment} from 'react';
import {site} from '@/data/site';
import {pageSEO} from '@/data/page-seo';
import {allNavigationPages} from '@/data/navigation';
import {share} from '@/data/share';


export function metadata(title:string,description:string,path:string):Metadata {
  const href=path.replace(/\/$/,'')||'/';
  const config=pageSEO[href]||{};
  const page=allNavigationPages.find(p=>p.href===href);
  const name=config.title||page?.title||title;
  const desc=config.description||page?.description||description;
  const canonical=config.canonical||new URL(href==='/'?'/':href+'/',site.url).href;
  const socialTitle=href==='/'?share.title:config.ogTitle||`${name} | ${site.name}`;
  const socialDescription=href==='/'?share.description:config.ogDescription||desc;
  const custom=!!config.ogImage;
  const image=new URL(config.ogImage||share.image,site.url).href;
  return {title:name,description:desc,keywords:config.keywords||[page?.title||title,'염원컴퍼니'],robots:config.robots||{index:true,follow:true},alternates:{canonical},
    openGraph:{title:socialTitle,description:socialDescription,url:canonical,images:[{url:image,alt:custom?name:share.imageAlt,...(!custom?{width:share.imageWidth,height:share.imageHeight,type:'image/png'}:{})}],siteName:site.name,locale:'ko_KR',type:'website'},
    twitter:{card:'summary_large_image',title:socialTitle,description:socialDescription,images:[{url:image,alt:custom?name:share.imageAlt}]}};
}
export function JsonLd({data}:{data:Record<string,unknown>}){return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org',...data}).replace(/</g,'\\u003c')}}/>}
export function BreadSchema({items}:{items:{label:string;href:string}[]}){return <JsonLd data={{'@type':'BreadcrumbList',itemListElement:[{label:'홈',href:'/'},...items].map((x,i)=>({'@type':'ListItem',position:i+1,name:x.label,item:new URL(x.href==='/'?'/':x.href.replace(/\/$/,'')+'/',site.url).href}))}}/>}


// One source for the visible path and server-rendered structured data. Items omit the implicit home.
export function BreadcrumbTrail({items,className}:{items:{label:string;href:string}[];className?:string}) {
 return <><nav className={className} aria-label="현재 위치"><Link href="/">홈</Link>{items.map((item,index)=><Fragment key={item.href}><span aria-hidden="true">/</span>{index===items.length-1?<span aria-current="page">{item.label}</span>:<Link href={item.href}>{item.label}</Link>}</Fragment>)}</nav><BreadSchema items={items}/></>;
}
