import type {MetadataRoute} from 'next';
import {site} from '@/data/site';
import {allNavigationPages} from '@/data/navigation';
import {insights,cases} from '@/data/content';
import {pageSEO} from '@/data/page-seo';
import {publicPosts} from '@/lib/blog';
import {contentRevisions} from '@/data/content-revisions';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap {
 const posts=publicPosts();
 const paths=[...new Set(['/',...allNavigationPages.map(p=>p.href),'/contact','/site-map',...insights.map(i=>'/insight/column/'+i.slug),...posts.map(i=>'/insight/column/'+i.slug),...cases.map(i=>'/project/marketing/'+i.slug)])];
 return paths.filter(path=>{const robots=pageSEO[path]?.robots;return typeof robots==='string'?!robots.includes('noindex'):robots?.index!==false}).map(path=>{
  const post=posts.find(p=>path==='/insight/column/'+p.slug);
  const revision=post?{lastModified:post.modifiedAt||post.publishedAt}:contentRevisions[path];
  if(!revision) throw new Error('Content modification date needs verification: '+path);
  return {url:site.url+(path==='/'?'/':path+'/'),lastModified:revision.lastModified,changeFrequency:'monthly',priority:path==='/'?1:path.split('/').length===2?0.8:0.6};
 });
}
