import type {MetadataRoute} from 'next';
import {site} from '@/data/site';
export const dynamic='force-static';
// The existing public policy allowed all crawlers. No authentication or WAF changes.
// Keep this shared list in every group if protected paths are added; wildcard rules are not inherited.
const restrictedPaths:string[]=[];
export default function robots():MetadataRoute.Robots {
 return {rules:['*','OAI-SearchBot','Claude-SearchBot','PerplexityBot','GPTBot','ClaudeBot','Google-Extended'].map(userAgent=>({userAgent,allow:'/',...(restrictedPaths.length?{disallow:restrictedPaths}:{})})),sitemap:site.url+'/sitemap.xml'};
}
