import {ServiceExperience} from './service-experience';
import {experienceProfile} from '@/data/service-experience';
import {QualityPage} from './site-pages';
export {QualityArticle as ExistingArticle,QualityCase as ExistingCase} from './site-pages';
export function articleHref(slug:string){return '/insight/column/'+slug}
export function SitemapPage({href}:{href:string}){return experienceProfile(href)?<ServiceExperience href={href}/>:<QualityPage href={href}/>}
