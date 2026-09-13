import type {MetadataRoute} from 'next';
import {site} from '@/data/site';
import {services} from '@/data/services';
import {education} from '@/data/education';
import {insights} from '@/data/content';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{return ['','/about','/services','/education','/cases','/insights','/contact',...services.map(s=>`/services/${s.slug}`),...education.map(s=>`/education/${s.slug}`),...insights.map(s=>`/insights/${s.slug}`)].map(path=>({url:site.url+path+'/',changeFrequency:'monthly',priority:path?0.7:1}))}
