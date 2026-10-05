'use client';

import {useEffect, useRef, useState, startTransition} from 'react';
import Link from 'next/link';
import {faqCategories,faqPath,matchesFaq,type Faq} from '@/lib/support/faq-data';
import s from './faq.module.css';

export function FaqList({entries,initialQuery='',initialCategory='전체'}:{entries:Faq[];initialQuery?:string;initialCategory?:string}) {
  const [input,setInput]=useState(initialQuery);
  const [query,setQuery]=useState(initialQuery);
  const [category,setCategory]=useState(initialCategory);
  const [copied,setCopied]=useState('');
  const [copyFallback,setCopyFallback]=useState('');
  const root=useRef<HTMLDivElement>(null);
  const rows=entries.filter(f=>matchesFaq(f,query,category));
  function update(q:string,c:string) {
    setInput(q);setQuery(q.trim());setCategory(c);
    const params=new URLSearchParams();if(q.trim())params.set('q',q.trim());if(c!=='전체')params.set('category',c);
    history.replaceState(null,'',faqPath+(params.size?'?'+params:''));
  }
  useEffect(()=>{
    const sync=()=>{
      const params=new URLSearchParams(location.search);
      let q=params.get('q')?.slice(0,100)||'',c=params.get('category')||'전체';
      if(!faqCategories.includes(c))c='전체';
      let id='';try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}
      const target=entries.find(f=>f.id===id);
      if(target){q='';c='전체';}
      startTransition(()=>{setInput(q);setQuery(q);setCategory(c);});
      if(target)requestAnimationFrame(()=>{
        const detail=root.current?.querySelector<HTMLDetailsElement>(`details[id="${target.id}"]`);
        if(detail){detail.open=true;detail.querySelector('summary')?.focus({preventScroll:true});detail.scrollIntoView({block:'start',behavior:'instant'});}
      });
    };
    sync();window.addEventListener('hashchange',sync);window.addEventListener('popstate',sync);
    return ()=>{window.removeEventListener('hashchange',sync);window.removeEventListener('popstate',sync);};
  },[entries]);
  async function copy(id:string) {
    const url=new URL(faqPath,location.origin);url.hash=id;
    try{await navigator.clipboard.writeText(url.href);setCopied(id);setCopyFallback('');}
    catch{setCopyFallback(url.href);setCopied('');}
  }
  return <div className={s.faq} ref={root}>
    <form action={faqPath} method="get" onSubmit={e=>{e.preventDefault();update(input,category);}} className={s.search}>
      <label htmlFor="faq-search">질문·답변 검색<input id="faq-search" name="q" type="search" value={input} onChange={e=>setInput(e.target.value)} maxLength={100} placeholder="궁금한 내용을 검색해 보세요." aria-describedby="faq-hint"/></label>
      {category!=='전체'&&<input type="hidden" name="category" value={category}/>}
      <button type="submit">검색</button>
    </form>
    <p id="faq-hint" className={s.hint}>예: 마케팅 비용, 슈퍼바이저 교육, AI 교육</p>
    <nav aria-label="FAQ 카테고리" className={s.filters}>{faqCategories.map(c=>{
      const params=new URLSearchParams();if(query)params.set('q',query);if(c!=='전체')params.set('category',c);
      return <a key={c} href={faqPath+(params.size?'?'+params:'')} aria-current={category===c?'page':undefined} onClick={e=>{if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();update(input,c);}}>{c} <span>{entries.filter(f=>c==='전체'||f.category===c).length}</span></a>;
    })}</nav>
    <div className={s.status}><p role="status">{rows.length}개의 질문</p>{(query||category!=='전체')&&<a href={faqPath} onClick={e=>{e.preventDefault();update('','전체');}}>검색 초기화</a>}</div>
    {!rows.length&&<div className={s.empty}><p>{entries.length?'검색 결과가 없습니다.':'등록된 자주 묻는 질문이 없습니다.'}<br/>{entries.length?'다른 검색어를 입력하거나 1:1 문의를 이용해 주세요.':''}</p><Link href="/contact/">1:1 문의하기 →</Link></div>}
    <div className={s.list}>{entries.map((f,i)=><details id={f.id} key={f.id} hidden={!matchesFaq(f,query,category)} open={i===0||undefined}>
      <summary><span className={s.category}>{f.category}</span>{' '}<span>{f.question}</span></summary>
      <div className={s.answer}><p className={s.core}>{f.core}</p>{f.detail&&<p>{f.detail}</p>}
        <div className={s.actions}><Link href={f.href}>{f.linkLabel} →</Link><button type="button" onClick={()=>copy(f.id)} aria-label={`${f.question} 링크 복사`}>질문 링크 복사</button><a href={'#'+f.id} aria-label={`${f.question} 바로가기`}>#</a></div>
        {copied===f.id&&<p role="status" className={s.copyNotice}>질문 링크를 복사했습니다.</p>}
      </div>
    </details>)}</div>
    {copyFallback&&<label className={s.fallback}>자동 복사를 사용할 수 없습니다. 아래 주소를 복사해 주세요.<input readOnly value={copyFallback} onFocus={e=>e.target.select()}/></label>}
  </div>;
}
