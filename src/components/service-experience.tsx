import Image from 'next/image';
import Link from 'next/link';
import {contactHref} from '@/data/navigation';
import {detailCopy,experienceProfile,photos,type PhotoKey,type Journey} from '@/data/service-experience';
import {insights} from '@/data/content';
import {JsonLd,BreadSchema} from '@/lib/seo';
import {site} from '@/data/site';
import s from './service-experience.module.css';

function Photo({photo,priority=false,className=''}:{photo:PhotoKey;priority?:boolean;className?:string}){
 const p=photos[photo];
 return <figure className={`${s.photo} ${className}`}><Image src={p.src} alt={p.alt} width={p.width} height={p.height} preload={priority} loading={priority?undefined:'lazy'} sizes="(max-width: 760px) 100vw, 50vw"/><figcaption>{p.caption}</figcaption></figure>;
}
function Contact({group,children}:{group:string;children:React.ReactNode}){return <Link className={s.primary} href={contactHref(group)}>{children}<span aria-hidden="true">↗</span></Link>}
function Heading({label,title,text}:{label:string;title:string;text?:string}){return <header className={s.sectionHeading}><p className={s.eyebrow}>{label}</p><h2>{title}</h2>{text&&<p className={s.intro}>{text}</p>}</header>}

function Sample({item,large=false}:{item:Journey;large?:boolean}){
 return <figure className={`${s.sample} ${large?s.largeSample:''}`} aria-label={`${item.heading} · 업무 이해를 위한 제작 예시`}>
  <div className={s.screen}><div className={s.screenBar}><span aria-hidden="true">● ● ●</span><span>YUMONE / WORK SAMPLE</span></div>
   <div className={`${s.screenBody} ${s[item.kind]}`}>
    <div className={s.sampleEyebrow}>{item.kind==='social'?'CONTENT PREVIEW':item.kind==='report'?'WORKING DOCUMENT':item.kind==='form'?'CONTACT FLOW':'PAGE PREVIEW'}</div>
    {item.photo&&<Image className={s.screenPhoto} src={photos[item.photo].src} alt={photos[item.photo].alt} width={photos[item.photo].width} height={photos[item.photo].height} loading="lazy" sizes="(max-width: 760px) 85vw, 25vw"/>}
    <h3>{item.heading}</h3>
    <div className={s.sampleLines}>{item.lines.map((line,i)=><div key={line}><span>{item.kind==='report'?'□':`0${i+1}`}</span><p>{line}</p></div>)}</div>
    {item.kind==='form'?<><div className={s.formField}>지금 가장 궁금한 점을 남겨주세요.</div><div className={s.sampleAction}>상담 신청 버튼 위치 <span>↗</span></div></>:item.kind==='web'?<div className={s.sampleAction}>다음에 확인할 정보 <span>→</span></div>:item.kind==='social'?<div className={s.socialFooter}>장면 → 설명 → 다음 행동</div>:<div className={s.reportFooter}>확인한 내용 · 보완할 자료 · 다음 실행</div>}
   </div>
  </div><figcaption>업무 이해를 위한 제작 예시</figcaption>
 </figure>;
}

export function ServiceExperience({href}:{href:string}){
 const data=experienceProfile(href);if(!data)return null;
 const {group,child,detail,profile,copy,scope,outputs}=data;
 const title=child?.title||group.title;
 const heroPhoto=detail?.photo||copy.hero;
 const description=detail?.description||copy.description;
 const problems=detail?(profile?.problems||[child!.problem!,...group.problems]):copy.problems;
 const cta=detail?`${title} 상담하기`:copy.cta;
 const related=insights.filter(i=>group.key==='ai-search'?['AI','SEO · AEO'].includes(i.category):group.key==='education'?['교육','AI'].includes(i.category):true).slice(0,3);
 const detailSample:Journey={kind:group.key==='content'?'web':'report',title:title,heading:detail?.sampleTitle||title,lines:scope.slice(0,3),photo:group.key==='content'?detail?.photo:undefined};
 const faq=[
  {q:'아직 무엇이 문제인지 정리가 안 됐는데 상담할 수 있나요?',a:group.key==='education'?'참여 대상과 가장 자주 겪는 업무 상황부터 알려주세요. 수준과 실습 여건을 확인하면서 교육 주제를 함께 좁혀갑니다.':'운영 중인 홈페이지나 채널 주소, 가장 어려운 점 하나부터 알려주세요. 현재 자료를 보며 확인할 항목과 필요한 범위를 함께 정리합니다.'},
  ...(group.key==='franchise'?[{q:'이미 광고대행사가 있어도 상담할 수 있나요?',a:'현재 대행 범위와 담당자의 역할을 먼저 확인합니다. 기존 운영과 겹치지 않도록 점검·제작·실행 중 협의할 부분을 나눕니다.'}]:group.key==='ai-search'?[{q:'AI 답변에 우리 브랜드가 나오도록 보장하나요?',a:'AI 노출이나 추천, 검색 순위를 보장하지 않습니다. 공식 자료의 정확성과 구조를 정비하고 질문별 답변을 관찰해 보완할 항목을 확인합니다.'}]:group.key==='content'?[{q:'촬영 자료가 없어도 제작을 상담할 수 있나요?',a:'가능합니다. 사용할 채널과 보여줄 내용을 먼저 정하고, 보유 자료의 활용과 추가 촬영이 필요한 범위를 함께 확인합니다.'}]:[{q:'실무 수준이 다른 참여자가 함께 들어도 되나요?',a:'참여자의 역할과 도구 활용 수준을 먼저 확인합니다. 공통으로 다룰 내용과 대상별 실습 범위, 준비 환경을 협의합니다.'}]),
  {q:group.key==='education'?'한 가지 주제로만 교육을 요청할 수 있나요?':'한 가지 서비스만 맡길 수 있나요?',a:group.key==='education'?'필요한 주제부터 협의할 수 있습니다. 교육 대상, 업무 과제와 실습 환경을 확인한 뒤 내용을 정합니다.':'현재 필요한 범위부터 협의할 수 있습니다. 진단, 콘텐츠, 광고 중 맡길 업무와 내부에서 진행할 일을 구분합니다.'},
  {q:'상담 전에 어떤 자료를 준비하면 되나요?',a:group.key==='education'?'교육 대상과 인원, 어려운 업무, 사용 가능한 노트북·도구를 알려주세요. 실제 업무 자료가 있다면 실습 구성에 도움이 됩니다.':group.key==='content'?'브랜드 소개, 보유 사진·영상, 활용할 채널과 참고 화면을 준비해 주세요. 자료가 부족한 부분은 상담에서 확인합니다.':group.key==='ai-search'?'홈페이지 주소와 공식 소개 자료, 확인하고 싶은 질문이나 실제 답변 화면이 있으면 좋습니다. 계정 비밀번호는 보내지 않으셔도 됩니다.':'홈페이지와 운영 채널 주소, 기존 광고·콘텐츠 자료와 현재 과제를 준비해 주세요. 개인 연락처 등 민감한 정보는 가리고 공유해 주세요.'},
  {q:'비용은 어떤 기준으로 정해지나요?',a:group.key==='education'?'주제, 참여 인원, 교육 시간과 실습 준비 범위를 확인한 뒤 협의합니다. 확정 전에는 일정이나 비용을 일괄적으로 약속하지 않습니다.':'작업 범위, 필요한 제작물, 제공 자료와 검수 일정을 확인한 뒤 협의합니다. 상담에서 실제로 맡길 업무를 먼저 정합니다.'},
 ];
 const extraFaq=profile?.faq.filter(f=>!faq.some(q=>q.q===f.q))||[];
 const allFaq=detail?[...extraFaq,...faq]:faq;
 const breadcrumbs=child?[{label:group.title,href:group.href},{label:title,href}]:[{label:title,href}];
 return <div className={s.page}>
  <BreadSchema items={breadcrumbs}/><JsonLd data={{'@type':'Service',name:title,description,url:site.url+href+'/',provider:{'@id':site.url+'/#organization'}}}/>
  <section className={s.hero} aria-labelledby="service-title"><div className={s.container}>
   <nav className={s.breadcrumb} aria-label="현재 위치"><Link href="/">홈</Link><span>/</span>{child&&<><Link href={group.href}>{group.title}</Link><span>/</span></>}<span aria-current="page">{title}</span></nav>
   <div className={s.heroGrid}><div className={s.heroCopy}><p className={s.heroLabel}>{child?`${group.title} / ${title}`:copy.label}</p><h1 id="service-title">{detail?.before||copy.before}{' '}<br/><em>{detail?.emphasis||copy.emphasis}</em></h1><p className={s.heroDescription}>{description}</p><div className={s.actions}><Contact group={group.key}>{cta}</Contact><a className={s.secondary} href="#service-scope">{group.key==='education'?'어떤 내용을 배우나요?':'어떤 일을 맡길 수 있나요?'}</a></div><p className={s.heroTrust}>20년 이상 프랜차이즈 현장 경험을 바탕으로</p></div><Photo photo={heroPhoto} priority className={`${s.heroPhoto} ${heroPhoto==='camera'?s.portrait:''}`}/></div>
  </div></section>
  <nav className={s.subnav} aria-label={`${group.title} 하위 메뉴`}><div className={s.container}><Link href={group.href} aria-current={!child?'page':undefined}>전체 소개</Link>{group.children.map(c=><Link key={c.href} href={c.href} aria-current={href===c.href?'page':undefined}>{c.title}</Link>)}</div></nav>

  <section className={s.section}><div className={`${s.container} ${s.empathyGrid}`}><Photo photo={heroPhoto===copy.challenge?'workshop':copy.challenge} className={copy.challenge==='camera'?s.portrait:''}/><div><Heading label="YOUR CHALLENGE" title={detail?'이런 어려움에서 시작합니다.':copy.challengeTitle}/><p className={s.scenario}>실제 후기가 아닌, 고객의 고민을 정리한 상황입니다.</p><ul className={s.quotes}>{problems.map((p,i)=><li key={p}><span>0{i+1}</span><p>{p}</p></li>)}</ul><p className={s.bridge}>{detail?`${detail.checks.join(', ')}부터 확인해 지금 손볼 일을 찾습니다.`:copy.bridge}</p></div></div></section>

  {!detail&&<section className={`${s.section} ${s.warm}`}><div className={s.container}><Heading label="FROM INTEREST TO ACTION" title={copy.journeyTitle} text={copy.journeyDescription}/><div className={s.journey}>{copy.journey.map((item,i)=><div className={s.journeyStep} key={item.title}><p className={s.stage}><span>0{i+1}</span>{item.title}<b aria-hidden="true">→</b></p><Sample item={item}/></div>)}</div><p className={s.caption}>위 화면은 업무를 설명하기 위한 샘플입니다. 실제 고객사 작업물·검색 결과·성과를 나타내지 않습니다.</p></div></section>}

  <section id="service-scope" className={`${s.section} ${detail?s.warm:''}`}><div className={s.container}><Heading label={group.key==='education'?'LEARN & PRACTICE':'WHAT WE DO'} title={detail?'맡길 일과 확인할 결과물을 구체적으로.':copy.scopeTitle} text={detail?description:'전체를 한꺼번에 바꾸지 않아도 됩니다. 현재 자료와 내부에서 할 수 있는 일을 확인하고, 필요한 범위를 함께 정합니다.'}/>
   {detail?<><div className={s.detailScope}><div><ol className={s.scopeList}>{scope.map((x,i)=><li key={x}><span>0{i+1}</span><h3>{x}</h3></li>)}</ol><p className={s.intro}>{profile?.strategy||description}</p><div className={s.actions}><Contact group={group.key}>이 업무 상담하기</Contact></div></div><Sample item={detailSample} large/></div><div className={s.deliverables}><div><p className={s.eyebrow}>TAKEAWAYS</p><h3>함께 정할 결과물</h3></div><ul>{outputs.map(o=><li key={o}>{o}</li>)}</ul><p>실제 제공 항목은 상담과 계약에서 확정합니다.</p></div></>:<div className={s.serviceRows}>{group.children.map((c,i)=>{const d=detailCopy[c.href];const mock=(group.key==='franchise'&&(i===1||i===3))||group.key==='ai-search';return <article className={s.serviceRow} key={c.href}><div className={s.serviceVisual}>{mock?<Sample large item={{kind:i===1?'web':'report',title:c.title,heading:d.sampleTitle,lines:d.checks,photo:i===1?'food':undefined}}/>:<Photo photo={d.photo} className={d.photo==='camera'?s.portrait:''}/>}</div><div className={s.serviceCopy}><p className={s.serviceNumber}>0{i+1} <span>{c.title}</span></p><h3>{d.before} {d.emphasis}</h3><p>{d.description}</p><ul className={s.checks}>{d.checks.map(x=><li key={x}>{x}</li>)}</ul><Link className={s.textLink} href={c.href}>{group.key==='franchise'?['진단 범위 살펴보기','가맹모집 서비스 살펴보기','매장 마케팅 살펴보기','광고 운영 범위 살펴보기'][i]:`${c.title} 살펴보기`}<span aria-hidden="true">↗</span></Link></div></article>})}</div>}
  </div></section>

  {detail&&<section className={s.section}><div className={`${s.container} ${s.detailScope}`}><Photo photo={group.key==='education'?'workshop':group.key==='content'?'shoot':'owner'}/><div><Heading label="APPLY IT TO YOUR WORK" title={group.key==='education'?'내 업무 자료로 실습합니다.':'자료가 실제 실행으로 이어지도록.'} text={`${detail.checks[0]}에 필요한 자료를 확인하고, ${detail.checks[1]}와 ${detail.checks[2]}를 작업 범위에 맞춰 정리합니다.`}/><Sample item={{kind:'report',title:'점검',heading:'담당자와 함께 확인할 항목',lines:outputs.slice(0,3)}}/></div></div></section>}

  <section className={`${s.section} ${s.trust}`}><div className={s.container}><div className={s.trustGrid}><div><Heading label="EXPERIENCE IN THE FIELD" title={copy.trustTitle} text={copy.trustText}/><div className={s.credentials}><strong>20년+</strong><span>프랜차이즈 실무 경험<br/>본사·SV·점주 교육 및 자영업자 컨설팅</span></div><Link className={s.textLink} href="/about/founder/">염혜단 대표의 경험 살펴보기 <span>↗</span></Link></div><Photo photo="ai"/></div><div className={s.fieldStrip}><Photo photo="training"/><Photo photo="mentor"/><Photo photo="shoot"/></div></div></section>

  <section className={s.section}><div className={s.container}><Heading label="HOW WE START" title={group.key==='education'?'교육 상담을 신청하면, 이렇게 시작합니다.':'상담을 신청하면, 이렇게 시작합니다.'}/><ol className={s.process}>{[{title:'현재 상황을 듣습니다.',text:group.key==='education'?'참여자가 맡은 일과 현재 어려움, 교육 이후에 바꾸고 싶은 일을 확인합니다.':'어떤 고객을 만나고 싶은지, 지금 무엇이 가장 어려운지 확인합니다.'},{title:'먼저 해결할 일을 정합니다.',text:group.key==='education'?'실무 수준과 자료를 살펴보고 주제·실습·준비 환경을 함께 정합니다.':'운영 중인 채널과 자료를 살펴보고 필요한 범위를 함께 정합니다.'},{title:'실행하고 점검합니다.',text:group.key==='education'?'합의한 내용으로 실습하고, 현장에서 적용할 계획과 확인 항목을 정리합니다.':'합의한 업무를 진행하고, 결과를 살펴보며 다음 개선 방향을 정합니다.'}].map((step,i)=><li key={step.title}><span>0{i+1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol></div></section>

  <section className={`${s.section} ${s.warm}`}><div className={s.container}><Heading label="BEFORE WE TALK" title="상담 전에, 이런 고민부터 함께 풀어보세요."/><div className={s.related}>{related.map(i=><Link key={i.slug} href={`/insight/column/${i.slug}/`} className={s.reading}><Image src={photos[i.category==='교육'?'training':i.category==='AI'||i.category==='SEO · AEO'?'ai':'owner'].src} alt={i.category==='교육'?'교육 현장 관련 사진':i.category==='프랜차이즈'?'매장 마케팅 상담 관련 사진':'마케팅 정보 강의 관련 사진'} width={480} height={300} loading="lazy" sizes="(max-width: 760px) 100vw, 33vw"/><div><p className={s.eyebrow}>{i.category}</p><h3>{i.title}</h3><p>{i.summary}</p><span className={s.textLink}>글 읽기 ↗</span></div></Link>)}</div></div></section>

  <section className={s.section}><div className={`${s.container} ${s.faqGrid}`}><Heading label="QUESTIONS & ANSWERS" title={"문의 전에 궁금하실\n내용을 모았습니다."}/><div className={s.faq}>{allFaq.map(f=><details key={f.q}><summary>{f.q}<span aria-hidden="true">+</span></summary><p>{f.a}</p></details>)}</div><JsonLd data={{'@type':'FAQPage',mainEntity:allFaq.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}}))}}/></div></section>

  <section className={`${s.section} ${s.final}`}><div className={`${s.container} ${s.finalGrid}`}><div><Heading label="LET’S TALK ABOUT YOUR BRAND" title={detail?`${detail.checks[0]},\n지금 상황부터 이야기해 주세요.`:copy.finalTitle} text={detail?`${title}에 필요한 자료와 맡길 범위를 함께 정리합니다. 준비된 내용부터 편하게 알려주세요.`:copy.finalText}/><Contact group={group.key}>{detail?cta:copy.finalCta}</Contact></div><Photo photo={group.key==='education'?'owner':'mentor'}/></div></section>
 </div>;
}
