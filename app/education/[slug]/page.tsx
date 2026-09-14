import {notFound} from 'next/navigation';
import {navigation,legacyRoutes} from '@/data/navigation';
import {SitemapPage} from '@/components/sitemap-page';
import {metadata as makeMetadata} from '@/lib/seo';
const group=navigation.find(g=>g.key==='education')!;
export const dynamicParams=false;
export function generateStaticParams(){return [...group.children.map(c=>c.href.split('/')[2]),'sv','franchisee','headquarters','ai-marketing'].map(slug=>({slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const href=legacyRoutes['/education/'+slug]||'/education/'+slug;const item=group.children.find(c=>c.href===href);return makeMetadata(item?.title||'교육',item?.description||group.description,href)}
export default async function Page({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const href=legacyRoutes['/education/'+slug]||'/education/'+slug;if(!group.children.some(c=>c.href===href))notFound();return <SitemapPage href={href}/>}
