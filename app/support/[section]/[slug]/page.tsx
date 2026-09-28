import Link from 'next/link';
import {notFound} from 'next/navigation';
import {metadata as makeMetadata} from '@/lib/seo';
import {getSupportEntry} from '@/lib/support/notion';
import {publishable,safeBack} from '@/lib/support/core';
import {loadAttachment} from '@/lib/support/files';
import {SupportNavigation} from '@/components/support/navigation';
import s from '@/components/support/support.module.css';
export const dynamic='force-dynamic';
type Props={params:Promise<{section:string;slug:string}>;searchParams:Promise<Record<string,string|undefined>>};
async function entry(params:Props['params']){const {section,slug}=await params;if(!['notices','resources'].includes(section))notFound();const e=await getSupportEntry(slug);if(!e||e.kind!==section||!publishable(e))notFound();return e;}
export async function generateMetadata({params,searchParams}:Props){const e=await entry(params),q=await searchParams;return {...makeMetadata(e.title,e.summary||e.body.slice(0,150),`/support/${e.kind}/${e.slug}`),...(q.q||q.category||q.page?{robots:{index:false,follow:true}}:{})};}
export default async function Detail({params,searchParams}:Props){const e=await entry(params);const query=await searchParams;const files=await Promise.all(e.files.map(async(f,index)=>{try{const data=await loadAttachment(f);return {name:f.name,index,size:data.size};}catch{return null;}}));if(e.kind==='resources'&&files.some(f=>!f))notFound();return <div className={s.container}><SupportNavigation/><article className={s.article}><Link href="/support/" className={s.footerLink}>고객지원</Link><h1>{e.title}</h1><div className={s.meta}><span>발행 <time dateTime={e.publishedAt}>{e.publishedAt.slice(0,10)}</time></span>{e.modifiedAt&&e.modifiedAt.slice(0,10)!==e.publishedAt.slice(0,10)&&<span>수정 <time dateTime={e.modifiedAt}>{e.modifiedAt.slice(0,10)}</time></span>}</div>{e.audience&&<p className={s.note}>활용 대상: {e.audience}</p>}<div className={s.body}>{e.body}</div>{files.length>0&&<section><h2>첨부파일</h2><ul className={s.files}>{files.filter(f=>f!==null).map(f=><li key={f.index}><p>{f.name} · {(f.size/1024).toFixed(1)} KB</p><a href={`/api/support/files/${e.slug}/${f.index}/`} download>다운로드 →</a></li>)}</ul></section>}<div className={s.contact}><Link href={safeBack(e.kind,query)} className={s.footerLink}>← 목록으로</Link><Link href="/support/inquiry/" className={s.footerLink}>관련 문의하기 →</Link></div></article></div>}
