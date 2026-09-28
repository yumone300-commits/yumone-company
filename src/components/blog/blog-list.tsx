'use client';
import {useEffect} from 'react';
import {useSearchParams,useRouter} from 'next/navigation';
import Link from 'next/link';
import {blogCategories,type BlogCard} from '@/lib/blog-types';
import {BlogCardView} from './blog-card';
import s from './blog.module.css';
export function BlogList({posts,failed=false}:{posts:BlogCard[];failed?:boolean}){
 const params=useSearchParams(),router=useRouter();const selected=params.get('category')||'';const category=blogCategories.includes(selected as typeof blogCategories[number])?selected:'';const q=(params.get('q')||'').trim().slice(0,150);
 const filtered=posts.filter(p=>(!category||p.category===category)&&(!q||[p.title,p.summary,...p.tags].join(' ').toLocaleLowerCase('ko').includes(q.toLocaleLowerCase('ko'))));const total=Math.max(1,Math.ceil(filtered.length/9));const page=Math.min(total,Math.max(1,Number.parseInt(params.get('page')||'1',10)||1));
 const href=(cat=category,query=q,p=1)=>{const next=new URLSearchParams();if(cat)next.set('category',cat);if(query)next.set('q',query);if(p>1)next.set('page',String(p));return '/insight/'+(next.size?'?'+next:'')};
 // Parameterized search/filter pages do not create competing indexed copies.
 useEffect(()=>{if(!params.size)return;const originals=new Map<HTMLMetaElement,string>();const update=()=>{document.querySelectorAll<HTMLMetaElement>('meta[name="robots"]').forEach(meta=>{if(!originals.has(meta))originals.set(meta,meta.content);meta.content='noindex, follow'})};update();const observer=new MutationObserver(update);observer.observe(document.head,{childList:true,subtree:true});return()=>{observer.disconnect();originals.forEach((content,meta)=>{if(meta.isConnected)meta.content=content})}},[params]);
 return <><div className={s.controls}><nav className={s.categories} aria-label="블로그 카테고리">{['',...blogCategories].map(cat=><Link key={cat} href={href(cat,q)} aria-current={category===cat?'true':undefined} scroll={false}>{cat||'전체'}</Link>)}</nav><form className={s.search} onSubmit={e=>{e.preventDefault();router.push(href(category,String(new FormData(e.currentTarget).get("q")||"").trim()),{scroll:false})}}><label htmlFor="blog-search"><span>제목·요약·태그 검색</span><input id="blog-search" key={params.toString()} name="q" defaultValue={q} type="search" maxLength={150} placeholder="관심 있는 주제를 검색하세요"/></label><button type="submit">검색</button></form><p className={s.result} role="status">{category||'전체'}{q?` · “${q}”`:''} · {filtered.length}개의 글</p></div>
 {failed?<div className={s.empty} role="alert"><h2>글을 불러오지 못했습니다.</h2><p>잠시 후 다시 확인해 주세요.</p><button onClick={()=>location.reload()}>다시 시도</button></div>:!posts.length?<div className={s.empty}><h2>아직 등록된 글이 없습니다.</h2><p>공개된 글이 이곳에 표시됩니다.</p></div>:!filtered.length?<div className={s.empty}><h2>검색 결과가 없습니다.</h2><p>다른 검색어나 카테고리를 선택해 주세요.</p><Link href="/insight/">전체 글 보기</Link></div>:<div className={s.grid}>{filtered.slice((page-1)*9,page*9).map(post=><BlogCardView key={post.id} post={post}/>)}</div>}
 {!failed&&filtered.length>9&&<nav className={s.pagination} aria-label="글 목록 페이지">{page>1&&<Link href={href(category,q,page-1)}>이전</Link>}{Array.from({length:total},(_,i)=>i+1).filter(n=>n===1||n===total||Math.abs(n-page)<=2).map((n,i,arr)=><span key={n}>{i>0&&n-arr[i-1]>1&&<span aria-hidden="true"> … </span>}<Link href={href(category,q,n)} aria-current={n===page?'page':undefined} aria-label={`${n}페이지`}>{n}</Link></span>)}{page<total&&<Link href={href(category,q,page+1)}>다음</Link>}</nav>}
 </>;
}
