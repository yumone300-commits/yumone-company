import type {Metadata} from 'next';
import {svAcademyLpHTML} from '@/components/education-academy/sv-academy-lp';
import {SvAcademyLpBehavior} from '@/components/education-academy/lp-behavior';
import {site} from '@/data/site';
import '@/components/education-academy/landing.css';
import '@/components/education-academy/integration.css';
import '@/components/education-academy/lp.css';

// Ad/SMS landing page: kept out of search and the sitemap; follows links to the main site.
const title='SV 교육 보냈는데, 현장은 그대로인가요? | 염원 SV 아카데미';
const description='듣고 끝나는 SV 교육 말고, 역할극과 실행 자료로 현장이 바뀌는 SV 실무 교육. 누적 수강생 500명+, 강사 전문성 5.0.';
const url=new URL('/lp/sv-academy/',site.url).href;
const image=new URL('/images/education-academy/original-01.jpg',site.url).href;
export const metadata:Metadata={
  title:{absolute:title},description,robots:{index:false,follow:true},alternates:{canonical:url},
  openGraph:{title,description,url,siteName:site.name,locale:'ko_KR',type:'website',images:[{url:image,width:1508,height:864,alt:'슈퍼바이저들에게 강의하는 염혜단 대표'}]},
  twitter:{card:'summary_large_image',title,description,images:[image]},
};
export default function Page(){return <><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gothic+A1:wght@500;700;800;900&family=IBM+Plex+Sans+KR:wght@400;500;600;700&display=swap"/><div className="lp-shell"><div id="education-landing" className="lp-sv" data-theme="light" dangerouslySetInnerHTML={{__html:svAcademyLpHTML}}/></div><SvAcademyLpBehavior/></>}
