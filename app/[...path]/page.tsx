import {notFound} from 'next/navigation';
import {allNavigationPages} from '@/data/navigation';
import {insights,cases} from '@/data/content';
import {SitemapPage,ExistingArticle,ExistingCase} from '@/components/sitemap-page';
import {metadata as makeMetadata} from '@/lib/seo';
export const dynamicParams=false;
const paths=[...allNavigationPages.filter(p=>!['/about','/education'].includes(p.href)&&!p.href.startsWith('/education/')).map(p=>p.href),...insights.map(i=>`/insight/column/${i.slug}`),...cases.map(i=>`/project/marketing/${i.slug}`)];
export function generateStaticParams(){return paths.map(href=>({path:href.slice(1).split('/')}))}
export async function generateMetadata({params}:{params:Promise<{path:string[]}>}){const{path}=await params;const href='/'+path.join('/');const page=allNavigationPages.find(x=>x.href===href);const item=path[0]==='insight'?insights.find(i=>i.slug===path[2]):cases.find(i=>i.slug===path[2]);return makeMetadata(page?.title||item?.title||'염원컴퍼니',page?.description||'프랜차이즈 성장의 과제와 실행 방향을 확인하세요.',href)}
export default async function Page({params}:{params:Promise<{path:string[]}>}){const{path}=await params;const href='/'+path.join('/');if(!paths.includes(href))notFound();if(path.length===3&&path[0]==='insight')return <ExistingArticle slug={path[2]}/>;if(path.length===3&&path[0]==='project')return <ExistingCase slug={path[2]}/>;return <SitemapPage href={href}/>}
