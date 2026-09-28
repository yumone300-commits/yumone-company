import {aboutRedirects} from '@/lib/about-routes';
import type {MetadataRoute} from 'next';
import {site} from '@/data/site';
import {allNavigationPages} from '@/data/navigation';
import {insights,cases} from '@/data/content';
import {pageSEO} from '@/data/page-seo';
import {publicSupport} from '@/lib/support/public';
import {entryHref} from '@/lib/support/core';
import {publicPosts} from '@/lib/blog';
import {contentRevisions} from '@/data/content-revisions';
export const dynamic='force-dynamic';
export default async function sitemap():Promise<MetadataRoute.Sitemap> {
 const posts=publicPosts();
 const support=await publicSupport();
 const paths=[...new Set(['/',...allNavigationPages.map(p=>p.href),'/contact','/site-map',...insights.map(i=>'/insight/column/'+i.slug),...posts.map(i=>'/insight/column/'+i.slug),...cases.map(i=>'/project/marketing/'+i.slug)])];
 const original:MetadataRoute.Sitemap=paths.filter(path=>{if(aboutRedirects[path])return false;const robots=pageSEO[path]?.robots;return typeof robots==='string'?!robots.includes('noindex'):robots?.index!==false}).map(path=>{
  const post=posts.find(p=>path==='/insight/column/'+p.slug);
  const revision=post?{lastModified:post.modifiedAt||post.publishedAt}:contentRevisions[path];
  if(!revision) throw new Error('Content modification date needs verification: '+path);
  return {url:site.url+(path==='/'?'/':path+'/'),lastModified:revision.lastModified,changeFrequency:'monthly',priority:path==='/'?1:path.split('/').length===2?0.8:0.6};
 });
 return [...original,...['','/notices','/faq','/resources'].map(p=>({url:site.url+'/support'+p+'/',lastModified:'2026-09-28',changeFrequency:'weekly' as const,priority:0.6})),...support.entries.filter(e=>e.kind!=='faq').map(e=>({url:site.url+entryHref(e),lastModified:e.modifiedAt||e.publishedAt,changeFrequency:'monthly' as const,priority:0.5}))];
}
