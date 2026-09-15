import Link from 'next/link';
import type {ReactNode} from 'react';
import {navigation,contactHref} from '@/data/navigation';
import {getHeroCopy,type HeroCopy} from '@/data/subpage-hero';
import s from './category-banner.module.css';

type Editorial = {title:string;description:string;label:string;note?:ReactNode};
export function SubpageHero({href,sectionId,editorial,copy:override}:{href:string;sectionId:string;editorial?:Editorial;copy?:Partial<HeroCopy>}) {
 const group=navigation.find(g=>href===g.href||href.startsWith(g.href+'/'))!;
 const child=group.children.find(c=>href===c.href||href.startsWith(c.href+'/'));
 const copy={...getHeroCopy(editorial?group.href:href),...override};
 const current=editorial?.title||child?.title||group.title;
 return <section className={s.banner} aria-labelledby="subpage-title">
  <div className={s.container}>
   <nav className={s.breadcrumb} aria-label="현재 위치"><Link href="/">홈</Link><span aria-hidden="true">/</span>{href!==group.href&&<><Link href={group.href}>{group.title}</Link><span aria-hidden="true">/</span></>}{editorial&&child&&<><Link href={child.href}>{child.title}</Link><span aria-hidden="true">/</span></>}<span aria-current="page">{current}</span></nav>
   <div className={`${s.columns} ${editorial?s.editorial:''}`}>
    <div className={s.copy}>
     <p className={s.label}>{editorial?.label||copy.eyebrow}</p>
     <h1 id="subpage-title" className={s.title}>{editorial?editorial.title:<>{copy.before}{' '}<br/><em>{copy.emphasis}</em>{copy.after}</>}</h1>
     <p className={s.description}>{editorial?.description||copy.description}</p>
     {editorial?.note&&<div className={s.note}>{editorial.note}</div>}
     <div className={s.actions}><Link className={s.primary} href={contactHref(group.key)}>{copy.cta}<span aria-hidden="true">→</span></Link><a className={s.secondary} href={`#${sectionId}`}>{editorial?'본문 읽기':copy.secondary}</a></div>
    </div>
    <dl className={s.facts}>
     <div><dt>WHO IT’S FOR</dt><dd>{copy.audience}</dd></div>
     <div><dt>BASED ON</dt><dd>{copy.basedOn}</dd></div>
     <div><dt>DESIGNED BY</dt><dd>염원컴퍼니 · {child&&!editorial?child.title:group.key==='about'?'마케팅·교육·컨설팅':group.title}</dd></div>
    </dl>
   </div>
  </div>
 </section>;
}
