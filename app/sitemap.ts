import type {MetadataRoute} from 'next';
import {site} from '@/data/site';import {allNavigationPages} from '@/data/navigation';import {insights,cases} from '@/data/content';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{return ['/',...allNavigationPages.map(p=>p.href),'/contact',...insights.map(i=>`/insight/column/${i.slug}`),...cases.map(i=>`/project/marketing/${i.slug}`)].map(path=>({url:site.url+(path==='/'?'/':path+'/'),changeFrequency:'monthly',priority:path==='/'?1:path.split('/').length===2?0.8:0.6}))}
