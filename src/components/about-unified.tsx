import Image from 'next/image';
import Link from 'next/link';
import type {ReactNode} from 'react';
import {BreadcrumbTrail, JsonLd} from '@/lib/seo';
import {site} from '@/data/site';
import {overview, differences, greeting, perspectives, services, process, search, checklist, programs, questions} from '@/data/about-unified';
import {ClientsSection} from './clients-section';
import s from './about-unified.module.css';

const inquiry = '/support/inquiry/';
function Section({id, label, title, children, muted=false}: {id?:string;label:string;title:string;children:ReactNode;muted?:boolean}) {
  return <section id={id} className={`${s.section} ${muted?s.muted:''}`}><div className={s.container}><p className={s.eyebrow}>{label}</p><h2>{title}</h2>{children}</div></section>;
}
export function AboutUnified() {
  return <div className={s.page}>
    <JsonLd data={{'@type':'AboutPage','@id':site.url+'/about/#webpage',url:site.url+'/about/',name:'회사소개 | 염원컴퍼니',about:{'@id':site.url+'/#organization'}}}/>
    <section className={s.hero}>
      <div className={s.container}>
        <BreadcrumbTrail className={s.breadcrumb} items={[{label:'회사 소개',href:'/about/'}]}/>
        <p className={s.eyebrow}>ABOUT YUMONE</p>
        <h1>프랜차이즈를 아는 마케팅,<br/>{' '}<em>본사와 가맹점의 성장</em>을 함께합니다.</h1>
        <p className={s.lead}>염원컴퍼니는 프랜차이즈 본사를 위한 마케팅·교육·컨설팅 회사입니다.<br/>{' '}가맹문의부터 가맹점 마케팅, 본사 직원과 점주의 실행 교육까지<br/>{' '}브랜드에 필요한 일을 함께 설계합니다.</p>
        <div className={s.actions}><Link className={s.button} href={inquiry}>우리 브랜드 마케팅 상담하기 <span aria-hidden="true">→</span></Link><a className={s.secondary} href="#ceo">염혜단 대표 소개 보기 <span aria-hidden="true">↓</span></a></div>
      </div>
    </section>
    <nav className={s.anchors} aria-label="회사소개 주요 내용"><div className={s.container}>{[['overview','회사 소개'],['difference','차별점'],['ceo','대표 소개'],['services','서비스'],['process','진행 방식'],['education','교육']].map(([id,title])=><a key={id} href={`#${id}`}>{title}</a>)}</div></nav>
    <Section id="overview" label="OUR COMPANY" title={'광고 운영만이 아니라,\n본사와 가맹점에 필요한 실행을 연결합니다.'}>
      <div className={s.split}><p className={s.prose}>가맹문의를 늘리는 일과 가맹점 고객을 늘리는 일은 다릅니다. 같은 채널을 사용하더라도 대상과 메시지, 확인할 지표가 달라야 합니다. 염원컴퍼니는 본사의 목표와 가맹점의 현장 상황을 함께 살펴 검색·콘텐츠·광고·교육의 역할을 정리합니다.</p><dl className={s.flow}>{overview.map(([title,text])=><div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}</dl></div>
    </Section>
    <Section id="difference" label="OUR DIFFERENCE" title={'채널을 늘리기 전에,\n우리 브랜드에 필요한 일부터 정합니다.'} muted>
      <div className={s.differences}>{differences.map(([title,text],i)=><article key={title}><span className={s.number}>0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </Section>
    <Section id="ceo" label="MESSAGE FROM THE CEO" title={'본사의 고민과 가맹점의 현장을 아는 사람,\n염혜단입니다.'}>
      <div className={s.ceo}><figure className={s.portrait}><Image src="/images/pdf-reference/founder-portrait.jpg" alt="염원컴퍼니 대표 염혜단" width={1200} height={1800} sizes="(max-width: 700px) 280px, 360px"/><figcaption><strong>염혜단 <span>| 염원컴퍼니 대표</span></strong><p>외식 프랜차이즈 본사 약 20년 실무 경험</p><p>프랜차이즈 마케팅 · 슈퍼바이저 교육 · AI 마케팅 교육</p></figcaption></figure><div className={s.prose}>{greeting.map(text=><p key={text}>{text}</p>)}<blockquote>좋은 계획이 현장의 실행으로 이어지도록 돕겠습니다.</blockquote><ul className={s.experience}><li>본사·SV·가맹점주 교육 경험</li><li>자영업자 컨설팅 경험</li><li>AI 기반 프랜차이즈 마케팅 연구 및 교육</li></ul></div></div>
    </Section>
    <Section label="SIX PERSPECTIVES" title={'우리 브랜드의 마케팅,\n이 여섯 가지를 함께 봅니다.'} muted>
      <dl className={s.perspectives}>{perspectives.map(([title,text],i)=><div key={title}><dt><span>0{i+1}</span>{title}</dt><dd>{text}</dd></div>)}</dl>
    </Section>
    <Section id="services" label="WHAT WE DO" title={'브랜드의 과제에 맞춰,\n마케팅과 교육을 연결합니다.'}>
      <div className={s.services}>{services.map(([title,text,href])=><Link key={href} href={href}><h3>{title}<span aria-hidden="true">↗</span></h3><p>{text}</p><span className={s.textLink}>서비스 살펴보기 →</span></Link>)}</div>
    </Section>
    <Section id="process" label="HOW WE WORK" title={'현재 상황을 확인하고,\n필요한 일부터 실행합니다.'} muted>
      <ol className={s.steps}>{process.map(([title,text],i)=><li key={title}><span className={s.number}>0{i+1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
      <figure className={s.consulting}><Image src="/images/pdf-reference/consulting-session.jpg" alt="자료를 함께 검토하며 진행하는 컨설팅 현장" width={306} height={194} sizes="(max-width:600px) 90vw, 306px"/><figcaption>브랜드의 과제를 함께 살펴보는 상담 현장</figcaption></figure>
    </Section>
    <Section label="SEARCH & AI" title={'검색에서도, AI 답변에서도\n브랜드 정보가 정확하게 전달되도록.'}>
      <div className={s.split}><div><p className={s.prose}>염원컴퍼니는 검색과 AI 답변 환경을 고려해 브랜드의 공식 정보와 콘텐츠를 정리합니다. 회사 소개·서비스·FAQ·공식 채널의 설명이 서로 일치하는지, 고객의 질문에 필요한 정보가 담겨 있는지 함께 점검합니다.</p><Link className={s.textLink} href="/ai-search/">AI 검색 마케팅 서비스 살펴보기 →</Link></div><dl className={s.flow}>{search.map(([title,text])=><div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}</dl></div>
    </Section>
    <Section label="WHO WE WORK WITH" title="이런 고민이 있는 프랜차이즈 본사와 함께합니다." muted>
      <ul className={s.checklist}>{checklist.map(text=><li key={text}><span aria-hidden="true">✓</span>{text}</li>)}</ul>
    </Section>
    <Section id="education" label="PRACTICAL EDUCATION" title={'이해하는 교육에서,\n현장에 적용하는 교육으로.'}>
      <p className={s.intro}>본사 직원·슈퍼바이저·가맹점주가 맡은 역할에 맞춰 교육 내용을 구성하고 실무에 적용할 방법을 함께 다룹니다.</p>
      <div className={s.programs}>{programs.map(p=><article key={p.title}><h3>{p.title}</h3><dl>{[['대상',p.target],['내용',p.content],['적용',p.application]].map(([label,text])=><div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}</dl></article>)}</div>
      <figure className={s.training}><Image src="/images/supervisor-marketing-training.jpg" alt="노트북으로 실습하며 참여하는 슈퍼바이저 마케팅 교육 현장" width={960} height={720} sizes="(max-width:700px) 90vw, 720px"/><figcaption>슈퍼바이저 마케팅 교육 현장</figcaption></figure>
      <div className={s.educationAction}><p>교육 대상과 목표에 맞춰 범위를 협의합니다.</p><Link className={s.button} href={inquiry}>우리 본사 교육 프로그램 문의하기 →</Link></div>
    </Section>
    <ClientsSection withCTA={false}/>
    <Section label="START WITH A QUESTION" title={'무엇을 더 할지보다,\n어디에서 막히는지 먼저 봅니다.'} muted>
      <dl className={s.questions}>{questions.map(([title,text])=><div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}</dl>
    </Section>
    <section id="contact" className={s.final}><div className={s.container}><p className={s.eyebrow}>LET’S TALK</p><h2>우리 브랜드,<br/>{' '}무엇부터 바꾸면 좋을까요?</h2><p className={s.lead}>가맹문의, 가맹점 마케팅, 본사 교육 중 현재 고민을 남겨주세요.<br/>{' '}브랜드에 필요한 실행 방향을 함께 검토하겠습니다.</p><Link className={s.button} href={inquiry}>우리 브랜드 마케팅 상담하기 →</Link><dl className={s.companyInfo}><div><dt>회사</dt><dd>{site.name} · {site.englishName}</dd></div><div><dt>대표</dt><dd>{site.ceo}</dd></div><div><dt>주소</dt><dd>{site.address}</dd></div><div><dt>연락처</dt><dd><a href={`tel:${site.phone.replace(/-/g,'')}`}>{site.phone}</a><a href={`mailto:${site.email}`}>{site.email}</a></dd></div></dl></div></section>
  </div>;
}
