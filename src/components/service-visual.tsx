import {ArrowRight, Check, Search, MessageCircle, FileCheck, Target, Monitor, Play, MapPin, Users, Sparkles} from 'lucide-react';
import type {ServiceGuide} from '@/data/service-guide';
import s from './service-visual.module.css';

const stories: Record<string, [string,string,string]> = {
 '/franchise':['흩어진 마케팅 업무','모집·매장 홍보의 역할을 나눕니다','본사에 필요한 실행 범위를 정하세요.'],
 '/franchise/diagnosis':['무엇부터 고칠지 모르는 상황','우선순위가 있는 실행 과제로','현재 주소와 자료부터 함께 살펴봅니다.'],
 '/franchise/recruit':['광고를 본 예비 창업자','비용·지원 확인에서 상담 신청까지','우리 브랜드의 모집 페이지를 함께 검토하세요.'],
 '/franchise/sales':['매장을 검색하는 지역 고객','메뉴·위치 확인에서 방문 검토까지','대상 매장과 지역에 맞는 홍보를 정하세요.'],
 '/franchise/ads':['목적이 섞인 광고','타깃·소재·문의 기록을 함께 점검','지금 운영 중인 광고부터 이야기해 주세요.'],
 '/ai-search':['검색과 AI에 흩어진 브랜드 정보','고객의 질문에 답하는 공식 정보로','우리 브랜드에 필요한 검색 개선을 정하세요.'],
 '/ai-search/seo':['주제가 잘 드러나지 않는 페이지','검색 의도에 맞는 제목·본문·링크로','홈페이지 주소로 점검 범위부터 상담하세요.'],
 '/ai-search/aeo':['반복되는 고객 질문','바로 확인할 수 있는 답변 콘텐츠로','상담에서 자주 듣는 질문부터 시작하세요.'],
 '/ai-search/geo':['출처가 흩어진 브랜드 설명','근거를 확인할 수 있는 공식 정보로','브랜드 소개와 보유 자료를 함께 정리하세요.'],
 '/ai-search/diagnosis':['AI가 어떻게 설명하는지 막막하다면','질문·조건·답변을 기록해 개선 과제로','확인하고 싶은 브랜드와 질문을 알려주세요.'],
 '/content':['설명은 많지만 선택 이유가 흐리다면','고객의 판단을 돕는 콘텐츠로','지금 필요한 제작물부터 함께 골라보세요.'],
 '/content/website':['방문자가 궁금한 정보','서비스 이해에서 상담 신청까지','현재 페이지와 필요한 내용을 알려주세요.'],
 '/content/naver':['검색 후 확인하는 브랜드·매장 정보','이용 정보와 콘텐츠를 일관되게','운영 중인 블로그·플레이스부터 확인하세요.'],
 '/content/shortform':['긴 설명 속 핵심 메시지','짧은 영상에서 관심과 다음 행동으로','소재와 채널에 맞는 영상 범위를 정하세요.'],
 '/content/brand-film':['말로만 설명하던 브랜드의 강점','현장과 인터뷰로 보여주는 소개 영상','촬영할 현장과 영상의 쓰임을 알려주세요.'],
 '/education':['배운 내용을 업무에 적용하기 어렵다면','내 업무 자료를 만드는 실습으로','참여자의 역할에 맞는 교육을 설계하세요.'],
 '/education/hq':['담당자마다 다른 마케팅 기준','함께 검토할 기획안과 실행 계획으로','본사에서 해결할 업무를 먼저 알려주세요.'],
 '/education/supervisor':['감각에 의존하는 점주 상담','자료를 보고 개선을 논의하는 상담으로','현장에서 어려운 상담 상황부터 시작하세요.'],
 '/education/owner':['무엇을 올릴지 막막한 매장 홍보','점주가 직접 실행할 게시 계획으로','매장과 참여자의 채널 운영 수준을 알려주세요.'],
 '/education/ai':['AI 답변을 그대로 쓰기 불안하다면','초안 작성부터 검토까지 직접 실습','반복 업무와 사용 도구를 알려주세요.'],
};
export const serviceStory = (p:ServiceGuide) => stories[p.href];

export function ServiceVisual({p}:{p:ServiceGuide}) {
 const isAI=p.group==='ai-search', isContent=p.group==='content';
 const video=p.href==='/content/shortform'||p.href==='/content/brand-film';const local=p.href==='/franchise/sales'||p.href==='/content/naver';
 const icons=isAI?[Search,MessageCircle,FileCheck]:[Target,Monitor,MessageCircle];
 return <div className={s.board} aria-label={`${p.title} 작업 방향 예시`}>
  <div className={s.toolbar}><span className={s.dots}>● ● ●</span><span>YUMONE / {isAI?'SEARCH':isContent?'CONTENT':'FRANCHISE'}</span><span>기획 예시</span></div>
  <div className={s.canvas}>
   <p className={s.label}>{isAI?'질문에 답할 정보가 준비되어 있나요?':isContent?'보여주고, 이해시키고, 행동으로':'고객의 다음 행동을 설계합니다'}</p>
   <div className={s.route}>{(isAI?['고객 질문','공식 정보','근거 확인']:['관심 발견','선택 이유','상담·방문']).map((label,i)=>{const Icon=icons[i];return <div key={label}><span className={s.icon}><Icon size={25}/></span><strong>{label}</strong>{i<2&&<ArrowRight className={s.arrow} size={18}/>}</div>})}</div>
   <div className={s.mockup}><div className={s.browser}><Search size={14}/><span>{isAI?'브랜드 · 서비스 · 고객 질문':'브랜드를 선택하기 전에 확인할 정보'}</span></div><div className={s.preview}>
    {local?<div className={s.map}><MapPin size={42}/><strong>지역 고객이 찾는 우리 매장</strong><span>위치 · 영업시간 · 메뉴 · 이용 정보</span></div>:video?<div className={s.film}><Play size={36} fill="currentColor"/><span>브랜드의 강점이 보이는 콘텐츠</span><div className={s.timeline}><i/><i/><i/><i/><i/></div></div>:<div className={s.searchResult}><span className={s.url}>공식 브랜드 페이지 · 구성 예시</span><strong>{p.example.rows[0][0]}</strong><p>{p.example.rows[0][1]}</p><div className={s.skeleton}/><div className={s.skeleton}/></div>}
    <div className={s.checks}>{p.example.rows.slice(1,3).map(([label])=><span key={label}><Check size={15}/>{label}</span>)}</div><div className={s.mockButton}>{isAI?'답변·근거·출처를 확인':'내 조건에 맞는지 상담하기'}<ArrowRight size={17}/></div>
   </div></div>
   <div className={s.result}><FileCheck size={23}/><div><small>함께 정리할 결과물</small><strong>{p.jobs[1][2]}</strong></div></div>
  </div><p className={s.note}>서비스 이해를 위한 예시입니다. 실제 성과·검색 결과가 아닙니다.</p>
 </div>;
}

export function DecisionPath({p}:{p:ServiceGuide}){const story=serviceStory(p);return <div className={s.decision}><div><span>지금의 고민</span><p>{story[0]}</p></div><ArrowRight size={28}/><div><span>함께 만들 변화</span><p>{story[1]}</p></div><div className={s.decisionOutcome}><FileCheck size={24}/><strong>{p.jobs[3][2]}</strong><small>합의한 범위에 따라 제공</small></div></div>}

export function WorkVisual({p}:{p:ServiceGuide}){const icons=[Target,p.group==='education'?Users:Search,p.group==='content'?Play:MapPin,Sparkles];return <div className={s.workGrid}>{p.jobs.map(([name,work,output],i)=>{const Icon=icons[i];return <article key={name}><div className={s.workTop}><Icon size={30}/><span>0{i+1}</span></div><h3>{name}</h3><p>{work}</p><div className={s.output}><FileCheck size={18}/><div><small>{p.group==='education'?'실습 후 활용':'고객에게 남는 자료'}</small><strong>{output}</strong></div></div></article>})}</div>}

