import {ClientsSection} from './clients-section';
import {SubpageHero} from './subpage-hero';
import Link from 'next/link';
import {navigation,contactHref} from '@/data/navigation';
import {services} from '@/data/services';
import {cases} from '@/data/content';
import {site} from '@/data/site';
import {type ServiceProfile} from '@/data/service-pages';
import {JsonLd} from '@/lib/seo';
import base from './sitemap-page.module.css';
import s from './service-detail.module.css';

const steps:Record<string,string[]>={franchise:['본사·점포 현황 확인','고객 흐름과 기준 설계','담당자별 실행 연결','지표와 현장 반응 점검'],'ai-search':['질문과 공식 자료 수집','정보·기술 오류 구분','페이지와 근거 정비','검색·답변 변화 기록'],content:['고객과 콘텐츠 목적 정의','원고·제작 구성 합의','제작과 담당자 검수','게시·문의 동선 확인'],education:['참여자 업무와 수준 확인','역할별 커리큘럼 설계','실습과 개별 피드백','업무 적용 계획 정리'],project:['유사 과제 확인','수행 범위 비교','자료와 공개 기준 확인','협업 조건 정리']};
function CTA({p}:{p:ServiceProfile}){return <Link className={base.button} href={contactHref(p.group==='project'?'other':p.group)}>{p.cta}<span aria-hidden="true">→</span></Link>}
export function ServiceDetail({profile:p}:{profile:ServiceProfile}){
 const group=navigation.find(g=>g.key===p.group)!;
 const detail=p.href!==group.href;
 const faqs=[...p.faq,{q:`${p.title} 상담 전에 무엇을 준비하나요?`,a:`${p.audience}의 현재 과제를 알려주세요. ${p.scope[0]}에 활용할 수 있는 자료와 운영 채널을 준비하면 범위를 구체화할 수 있습니다.`},{q:'기간과 비용, 최종 산출물은 어떻게 정하나요?',a:`${p.outputs.join(', ')}를 중심으로 필요한 범위를 협의합니다. 제공 자료와 작업량, 참여자 및 검수 일정을 확인해 제안하며 계약 범위 밖의 작업은 별도로 합의합니다.`}];
 const source=p.href==='/franchise/diagnosis'?services.find(x=>x.slug==='consulting'):p.href==='/franchise/sales'?services.find(x=>x.slug==='marketing'):p.href==='/ai-search/diagnosis'?services.find(x=>x.slug==='ai-search'):p.href==='/content/brand-film'?services.find(x=>x.slug==='franchise'):undefined;
 return <div className={`${base.page} ${base.recruit} ${s.page}`}>
 
 {p.group!=='project'&&<JsonLd data={{'@type':'Service',name:p.title,description:p.description,url:site.url+p.href+'/',provider:{'@id':site.url+'/#organization'}}}/>}
 <SubpageHero href={p.href} sectionId="service-scope"/>
 <section className={base.section}><div className={base.container}><p className={base.eyebrow}>01 / CUSTOMER CHALLENGE</p><h2>{p.title},<br/>이 지점에서 막히고 있나요?</h2><div className={base.numberedGrid}>{p.problems.map((x,i)=><div key={x}><span>0{i+1}</span><h3>{x}</h3></div>)}</div></div></section>
 <section id="service-scope" className={`${base.section} ${base.warm}`}><div className={base.container}><p className={base.eyebrow}>02 / STRATEGY & SCOPE</p><h2>{p.emphasis},<br/>이렇게 구체화합니다.</h2><p className={base.lead}>{p.strategy}</p><div className={`${base.grid} ${p.group==='education'?s.curriculum:p.group==='content'?s.production:''}`}>{p.scope.map((x,i)=><div className={base.card} key={x}><small>0{i+1}</small><h3>{x}</h3></div>)}</div>{!detail&&<div className={s.links}>{group.children.map(c=><Link key={c.href} href={c.href}>{c.title} →</Link>)}</div>}{source&&<div className={s.integrated}><h3>연결되는 기존 전문 업무</h3><p>{source.summary}</p><ul>{source.deliverables.filter(x=>p.href!=='/content/brand-film'||x.includes('매뉴얼')).map(x=><li key={x}>{x}</li>)}</ul></div>}</div></section>
 <section className={base.section}><div className={base.container}><p className={base.eyebrow}>03 / WORKFLOW</p><h2>자료 확인부터<br/>적용 점검까지 이어집니다.</h2><ol className={base.process}>{steps[p.group].map((x,i)=><li key={x}><small>0{i+1}</small><h3>{x}</h3><p>{[`${p.scope[0]}에 필요한 자료와 담당자를 확인합니다.`,`${p.scope[1]}를 중심으로 목표와 적용 범위를 합의합니다.`,`${p.scope[2]}를 진행하고 검수 의견을 반영합니다.`,`${p.scope[3]}를 통해 남은 과제와 후속 실행을 정리합니다.`][i]}</p></li>)}</ol></div></section>
 <section className={`${base.section} ${base.dark}`}><div className={base.container}><p className={base.eyebrow}>04 / EXPECTED DELIVERABLES</p><h2>상담에서 합의할<br/>구체적인 결과물.</h2><div className={s.outputs}>{p.outputs.map((x,i)=><div key={x}><span>0{i+1}</span><h3>{x}</h3></div>)}</div><p className={s.caution}>위 항목은 협의 가능한 산출물입니다. 실제 제공 범위는 계약 시 확정하며 매출·노출·AI 추천 결과를 보장하지 않습니다.</p></div></section>
 <section className={base.section}><div className={`${base.container} ${s.example}`}><figure>{p.href==='/content/website'?<div className={s.siteFlow} aria-label="홈페이지 고객 흐름 예시"><small>WEBSITE FLOW</small>{['방문 · 핵심 서비스 이해','근거 · 제공 범위 확인','문의 · 상담 신청'].map((x,i)=><div key={x}><b>0{i+1}</b><h3>{x}</h3></div>)}</div>:<img src={p.image} alt={p.alt} width="960" height="720" loading="lazy"/>}<figcaption>{p.href==='/content/website'?'고객 정보 탐색 흐름 예시 · 실제 제작 화면은 공개 승인 후 추가':p.alt+' · 기존 현장 자료'}</figcaption></figure><div><p className={base.eyebrow}>05 / APPLICATION EXAMPLE</p><h2>{p.group==='education'?'내 업무로 가져가는 실습.':p.group==='project'?'결과의 맥락까지 확인합니다.':'현장 과제로 연결하는 방법.'}</h2><p>{p.strategy}</p><h3>적용 가능한 업무 예시</h3><p>{p.audience}를 대상으로 {p.scope[0]}부터 확인하고, {p.outputs[0]}에 개선 과제를 정리하는 방식입니다.</p><p className={s.caution}>실제 고객의 성과 사례가 아닌 진행 업무 예시입니다. 사진은 현장 활동을 보여주며 해당 서비스의 검증된 결과를 의미하지 않습니다.</p>{p.group==='project'&&<p>고객사명·로고·후기는 원문과 공개 동의가 확인된 자료만 게시합니다.</p>}</div></div>{p.href==='/project/marketing'&&<div className={`${base.container} ${s.links}`}>{cases.map(c=><Link key={c.slug} href={`/project/marketing/${c.slug}`}>{c.title} · 업무 구성 예시 →</Link>)}</div>}</section>
 <section className={`${base.section} ${base.warm}`}><div className={base.container}><p className={base.eyebrow}>06 / FIT & EXPERTISE</p><h2>현장 경험을<br/>우리 조직의 실행 기준으로.</h2><div className={s.fit}><div><h3>이런 조직에 적합합니다</h3><p>{p.audience}</p><p>{p.problems[0]} 이런 상황이라면 현재 자료로 시작할 수 있는 범위부터 확인합니다.</p></div><div><h3>업무와 결과물을 함께 설계합니다</h3><p>{p.group==='education'?'본사·SV·점주가 실제로 맡는 업무를 기준으로 실습을 구성합니다.':'프랜차이즈 본사와 가맹점의 업무 관계를 고려해 담당자가 실행할 수 있는 과제를 정합니다.'}</p><p>{p.outputs.join(' · ')}의 활용 주체와 점검 시점까지 협의합니다.</p></div></div></div></section>
 <section className={base.section}><div className={base.container}><p className={base.eyebrow}>07 / FAQ</p><h2>{p.title}<br/>상담 전 확인할 내용.</h2>{faqs.map(f=><details key={f.q}><summary>{f.q}<span aria-hidden="true">+</span></summary><p>{f.a}</p></details>)}</div><JsonLd data={{'@type':'FAQPage',mainEntity:faqs.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}}))}}/></section>
 {p.href==='/project/partners'&&<ClientsSection withCTA={false}/>}
 <section className={`${base.section} ${base.dark}`}><div className={base.container}><p className={base.eyebrow}>YOUR NEXT STEP</p><h2>{p.emphasis},<br/>현재 과제부터 함께 정리하세요.</h2><p className={base.lead}>{p.title}의 진행 범위와 필요한 자료를 상담에서 안내합니다.</p><CTA p={p}/></div></section>
 </div>
}
