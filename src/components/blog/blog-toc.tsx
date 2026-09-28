'use client';
import Link from 'next/link';
import {useEffect,useState,useRef} from 'react';
import {blogCategories,type BlogCategory} from '@/lib/blog-types';
import s from './blog.module.css';
type Item={id:string;text:string;level:2|3};
export function BlogToc({items,category}:{items:Item[];category:BlogCategory}){const [active,setActive]=useState('');const mobile=useRef<HTMLDetailsElement>(null);
 useEffect(()=>{if(!items.length)return;let pending=false;const update=()=>{pending=false;let id=items[0].id;for(const item of items){const heading=document.getElementById(item.id);if(!heading)continue;const top=heading.getBoundingClientRect().top;const offset=(parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop)||0)+(parseFloat(getComputedStyle(heading).scrollMarginTop)||0)+20;if(top<=offset)id=item.id}setActive(id)};const scroll=()=>{if(!pending){pending=true;requestAnimationFrame(update)}};update();window.addEventListener('scroll',scroll,{passive:true});return()=>window.removeEventListener('scroll',scroll)},[items]);
 function navigate(e:React.MouseEvent<HTMLAnchorElement>,id:string){e.preventDefault();if(mobile.current)mobile.current.open=false;const heading=document.getElementById(id);if(!heading)return;history.replaceState(null,'','#'+id);setActive(id);heading.focus({preventScroll:true});heading.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'})}
 const list=<ol>{items.map(item=><li key={item.id}><a href={'#'+item.id} className={item.level===3?s.sub:undefined} aria-current={active===item.id?'location':undefined} onClick={e=>navigate(e,item.id)}>{item.text}</a></li>)}</ol>;
 return <><aside className={s.sidebar} aria-label="블로그 탐색"><Link className={s.back} href="/insight/">← 블로그 목록</Link><nav className={s.sideCategories} aria-label="카테고리">{blogCategories.map(cat=><Link href={'/insight/?category='+encodeURIComponent(cat)} key={cat} aria-current={category===cat?'true':undefined}>{cat}</Link>)}</nav>{items.length>0&&<nav className={s.toc} aria-label="이 글의 목차"><h2>이 글의 목차</h2>{list}</nav>}</aside>{items.length>0&&<details className={s.mobileToc} ref={mobile}><summary>이 글의 목차</summary><nav aria-label="모바일 목차">{list}</nav></details>}</>;
}
