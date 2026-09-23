import Link from 'next/link';
import {navigation} from '@/data/navigation';
import {metadata as makeMetadata,BreadcrumbTrail} from '@/lib/seo';
import s from '@/components/sitemap-page.module.css';
export const metadata=makeMetadata('전체 사이트맵','염원컴퍼니의 서비스, 교육, 회사 소개와 콘텐츠를 확인하세요.','/site-map');
export default function Page(){return <div className={s.page}><section className={s.section}><div className={s.container}><p className={s.eyebrow}>SITEMAP</p><h1>전체 사이트맵</h1><BreadcrumbTrail className="breadcrumbs" items={[{label:'전체 사이트맵',href:'/site-map'}]}/><div className={s.grid}>{navigation.map(g=><section className={s.card} key={g.href}><h2><Link href={g.href}>{g.title}</Link></h2><ul>{g.children.map(c=><li key={c.href}><Link href={c.href}>{c.title}</Link></li>)}</ul></section>)}</div><Link href="/contact">상담 문의하기 →</Link></div></section></div>}
