'use client';
import {useState} from 'react';
import Link from 'next/link';
import {insights} from '@/data/content';
import {Photo} from './ui';
export function InsightGrid(){const[filter,setFilter]=useState('전체');const rows=insights.filter(x=>filter==='전체'||x.category===filter);return <><div className="filters" role="group" aria-label="인사이트 분야">{['전체','프랜차이즈','마케팅','AI','SEO','AEO','GEO','교육'].map(c=><button key={c} aria-pressed={filter===c} className={filter===c?'active':''} onClick={()=>setFilter(c)}>{c}</button>)}</div><div className="insight-grid" aria-live="polite">{rows.length?rows.map(a=><Link className="insight-card" href={`/insight/column/${a.slug}`} key={a.slug}><Photo name={a.image} alt={`${a.category} 참고 이미지`}/><div className="card-content"><div className="article-meta"><span>{a.category}</span><time dateTime={a.date}>{a.date}</time></div><h3>{a.title}</h3><p>{a.summary}</p><span className="red-link">읽어보기 →</span></div></Link>):<div className="empty-state">이 분야의 콘텐츠는 준비 중입니다.</div>}</div></>}
