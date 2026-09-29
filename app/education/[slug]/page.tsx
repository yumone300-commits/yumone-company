import {notFound,permanentRedirect} from 'next/navigation';
import {educationRedirects} from '@/lib/education-routes';
export const dynamicParams=false;
export function generateStaticParams(){return Object.keys(educationRedirects).map(href=>({slug:href.split('/')[2]}));}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const href=educationRedirects['/education/'+slug];if(!href)notFound();permanentRedirect(href);}
