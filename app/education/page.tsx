import {educationHTML} from '@/components/education-academy/content';
import {EducationBehavior} from '@/components/education-academy/behavior';
import {metadata as makeMetadata} from '@/lib/seo';
import '@/components/education-academy/landing.css';
import '@/components/education-academy/integration.css';
export const metadata=makeMetadata('교육 서비스','염원 SV 아카데미의 프랜차이즈 실무 교육','/education');
export default function Page(){return <><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gothic+A1:wght@500;700;800;900&family=IBM+Plex+Sans+KR:wght@400;500;600;700&display=swap"/><div id="education-landing" data-theme="light" dangerouslySetInnerHTML={{__html:educationHTML}}/><EducationBehavior/></>}
