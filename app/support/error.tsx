'use client';
import Link from 'next/link';
export default function ErrorPage({reset}:{reset:()=>void}){return <section role="alert" style={{padding:'64px 24px',textAlign:'center'}}><h1>공지 정보를 불러올 수 없습니다.</h1><p>잠시 후 다시 시도해 주세요.</p><button onClick={reset} style={{padding:16,border:'1px solid #ddd',margin:16}}>다시 시도</button><Link href="/support/notices/">공지사항 목록으로</Link></section>}
