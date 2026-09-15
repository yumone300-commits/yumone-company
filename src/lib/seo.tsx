import type {Metadata} from 'next';
import {site} from '@/data/site';
import {siteCopy,workExamples} from '@/data/site-quality';
import {experienceProfile} from '@/data/service-experience';
import {insights} from '@/data/content';
import {pageSEO} from '@/data/page-seo';
import {allNavigationPages} from '@/data/navigation';


export function metadata(title:string,description:string,path:string):Metadata{const href=path.replace(/\/$/,'')||'/';const service=experienceProfile(href);const quality=siteCopy[href];const article=href.startsWith('/insight/column/')?insights.find(i=>href.endsWith('/'+i.slug)):undefined;const example=href.startsWith('/project/marketing/')?workExamples[href.split('/').pop()!]:undefined;const copy=example?`${example.situation}. ${example.work.join(' · ')}의 구성 예시이며 실제 수행 실적을 의미하지 않습니다.`:service?(service.detail?.description||service.copy.description):quality?.description||article?.summary;const config={...(pageSEO[href]||{}),...(copy?{description:copy,ogDescription:copy}:{}),...(service?{ogTitle:service.detail?service.detail.before+' '+service.detail.emphasis:service.copy.before+' '+service.copy.emphasis,ogImage:'/images/yumone-official-logo.png'}:{})};const page=allNavigationPages.find(p=>p.href===href);const name=example?`${example.title} · 구성 예시`:config.title||page?.title||title;const desc=config.description||page?.description||description;const canonical=config.canonical||site.url+(href==='/'?'/':href+'/');return {title:name,description:desc,keywords:config.keywords||[page?.title||title,'염원컴퍼니'],robots:config.robots||{index:true,follow:true},alternates:{canonical},openGraph:{title:config.ogTitle||`${name} | ${site.name}`,description:config.ogDescription||desc,url:canonical,images:[{url:config.ogImage||'/images/yumone-official-logo.png',alt:site.name}],siteName:site.englishName,locale:'ko_KR',type:'website'}}}
export function JsonLd({data}:{data:Record<string,unknown>}){return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org',...data}).replace(/</g,'\\u003c')}}/>}
export function BreadSchema({items}:{items:{label:string;href:string}[]}){return <JsonLd data={{'@type':'BreadcrumbList',itemListElement:[{label:'홈',href:'/'},...items].map((x,i)=>({'@type':'ListItem',position:i+1,name:x.label,item:site.url+x.href}))}}/>}

