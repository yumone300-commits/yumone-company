import type {Metadata} from 'next';
import {educationHTML} from '@/components/education-academy/content';
import {EducationBehavior} from '@/components/education-academy/behavior';
import {withEducationCatalog} from '@/components/education-academy/catalog';
import {metadata as makeMetadata} from '@/lib/seo';
import {pageSEO} from '@/data/page-seo';
import '@/components/education-academy/landing.css';
import '@/components/education-academy/integration.css';
import '@/components/education-academy/catalog.css';
const base=makeMetadata('교육 서비스','염원 SV 아카데미의 프랜차이즈 실무 교육','/education');
// Document title matches og:title exactly, without the site-wide "| 염원컴퍼니" template.
export const metadata:Metadata={...base,title:{absolute:pageSEO['/education'].ogTitle!}};
export default function Page(){return <><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gothic+A1:wght@500;700;800;900&family=IBM+Plex+Sans+KR:wght@400;500;600;700&display=swap"/><div id="education-landing" data-theme="light" dangerouslySetInnerHTML={{__html:withEducationCatalog(educationHTML)}}/><EducationBehavior/></>}
