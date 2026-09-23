import {ClientsSection} from './clients-section';
import Image from 'next/image';
import Link from 'next/link';
import type {ReactNode} from 'react';
import {about} from '@/data/about';
import {companyPage, founderPage} from '@/data/about-pages';
import {navigation} from '@/data/navigation';
import {site} from '@/data/site';
import {BreadSchema} from '@/lib/seo';
import {SubpageHero} from './subpage-hero';

import s from './about-pages.module.css';

function Section({id, label, title, children, muted = false}: {id?: string; label: string; title: string; children: ReactNode; muted?: boolean}) {
  return <section id={id} className={`${s.section} ${muted ? s.muted : ''}`}><div className={s.container}><p className={s.eyebrow}>{label}</p><h2>{title}</h2>{children}</div></section>;
}

function AboutNav({href}: {href: string}) {
  const group = navigation.find(item => item.key === 'about')!;
  return <nav className={s.subnav} aria-label="염원컴퍼니 하위 메뉴"><div className={s.container}><Link href="/about/">전체 소개</Link>{group.children.map(item => <Link key={item.href} href={`${item.href}/`} aria-current={href === item.href ? 'page' : undefined}>{item.title}</Link>)}</div></nav>;
}

function CompanyContent() {
  return <>
    <Section id="company-story" label="OUR STORY · 회사 소개" title={'브랜드의 가능성을\n현장의 변화로 잇습니다.'}>
      <div className={s.storyGrid}><div className={s.prose}>{companyPage.introduction.map(text => <p key={text}>{text}</p>)}</div><figure className={s.storyPhoto}><Image src="/images/pdf-reference/consulting-session.jpg" alt="자료를 함께 검토하며 진행하는 컨설팅 현장" width={306} height={194} sizes="(max-width: 760px) 90vw, 480px"/><figcaption>브랜드의 과제를 함께 살펴보는 상담 현장</figcaption></figure></div>
    </Section>
    <section className={s.statement}><div className={s.container}><p className={s.eyebrow}>OUR BELIEF · 우리가 믿는 성장</p><h2>본사의 성장이<br/><em>가맹점의 성장으로 이어지도록.</em></h2><p>마케팅이 만든 약속을 현장의 경험으로 완성합니다.<br/>염원컴퍼니는 전략과 실행 사이를 연결하는 파트너입니다.</p></div></section>
    <Section label="OUR VALUES · 핵심 가치" title="함께 일할 때 지키는 네 가지 기준">
      <div className={s.grid}>{companyPage.values.map((item, index) => <article key={item.title}><span className={s.number}>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    </Section>
    <Section label="WHAT WE DO · 사업 분야" title={'고객에게 발견되는 순간부터\n현장에서 실행하는 순간까지.'} muted>
      <div className={s.services}>{companyPage.services.map(item => <Link href={item.href} key={item.href}><h3>{item.title}<span aria-hidden="true">↗</span></h3><p>{item.text}</p><span className={s.linkLabel}>서비스 자세히 보기 <span aria-hidden="true">→</span></span></Link>)}</div>
    </Section>
    <Section label="HOW WE WORK · 협업 방식" title="지금 필요한 일부터, 함께 풀어갑니다.">
      <ol className={s.steps}>{companyPage.process.map((item, index) => <li key={item.title}><span className={s.number}>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></li>)}</ol>
    </Section>
    <Section label="PEOPLE · 염원컴퍼니의 사람" title="현장을 이해하는 사람이 함께합니다." muted>
      <div className={s.founderLink}><div><h3>염혜단 대표</h3><p>20년+ 프랜차이즈 실무 경험을 바탕으로<br/>본사·SV·가맹점주 교육과 자영업자 컨설팅을 연결합니다.</p><Link className={s.textLink} href="/about/founder/">대표의 경험과 철학 살펴보기 <span aria-hidden="true">→</span></Link></div><Image src="/images/pdf-reference/founder-portrait.jpg" alt="염원컴퍼니 염혜단 대표" width={306} height={408} sizes="200px"/></div>
    </Section>
  </>;
}

function FounderContent() {
  return <>
    <Section id="founder-story" label="MESSAGE · 대표 인사말" title={'성장의 답은\n현장과 사람에게 있습니다.'}>
      <div className={s.founderGrid}><figure className={s.portrait}><Image src="/images/pdf-reference/founder-portrait.jpg" alt="염원컴퍼니 대표 염혜단" width={306} height={408} sizes="(max-width: 760px) 80vw, 350px"/><figcaption><strong>{site.ceo}</strong><span>염원컴퍼니 대표 · YUMONE COMPANY</span></figcaption></figure><div className={s.prose}>{founderPage.greeting.map(text => <p key={text}>{text}</p>)}<p className={s.signature}>염원컴퍼니 대표 <strong>{site.ceo}</strong></p></div></div>
    </Section>
    <Section id="founder-experience" label="EXPERIENCE · 주요 경험" title="프랜차이즈 실무에서 교육과 컨설팅까지" muted>
      <div className={s.experienceGrid}><div className={s.experienceLead}><strong>20<span>년+</span></strong><h3>프랜차이즈 실무 경험</h3><p>본사의 전략과 가맹점의 실행을<br/>함께 바라보는 경험입니다.</p></div><ul className={s.careers}>{about.ceo.careers.map((career, index) => <li key={career}><span>0{index + 1}</span>{career}</li>)}</ul></div>
    </Section>
    <Section label="EXPERTISE · 전문 분야" title="이런 과제를 함께 고민합니다.">
      <div className={s.grid}>{founderPage.expertise.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    </Section>
    <section className={s.statement}><div className={s.container}><p className={s.eyebrow}>MY APPROACH · 교육과 컨설팅의 방향</p><h2>좋은 배움은<br/><em>다음 행동을 바꿉니다.</em></h2><p>알게 되는 것에서 한 걸음 더 나아가,<br/>내 업무와 내 매장에서 적용할 수 있도록 돕겠습니다.</p></div></section>
    <Section label="PRINCIPLES · 함께하는 방식" title="듣고, 연결하고, 실행할 수 있도록.">
      <div className={s.principles}>{founderPage.principles.map((item, index) => <article key={item.title}><span className={s.number}>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      <figure className={s.fieldPhoto}><Image src="/images/supervisor-marketing-training.jpg" alt="노트북으로 실습하며 참여하는 슈퍼바이저 마케팅 교육 현장" width={960} height={720} sizes="(max-width: 760px) 90vw, 900px" loading="lazy"/><figcaption>슈퍼바이저 마케팅 교육 현장</figcaption></figure>
      <div className={s.related}><Link className={s.textLink} href="/education/">대상별 교육 프로그램 보기 <span aria-hidden="true">→</span></Link><Link className={s.textLink} href="/insight/youtube/">프차언니 영상 콘텐츠 보기 <span aria-hidden="true">→</span></Link></div>
    </Section>
  </>;
}

export function AboutPage({kind}: {kind: 'company' | 'founder'}) {
  const isCompany = kind === 'company';
  const href = `/about/${kind}`;
  const copy = isCompany ? companyPage : founderPage;
  return <div className={s.page}>
    <BreadSchema items={[{label: '염원컴퍼니', href: '/about'}, {label: isCompany ? '회사 소개' : '대표 소개', href}]}/>
    <SubpageHero href={href} sectionId={`${kind}-story`} copy={{before: isCompany ? '본사와 가맹점이 함께 성장하는 길,' : '현장을 이해하는 경험,', emphasis: isCompany ? '염원컴퍼니가' : '함께 성장하는', after: isCompany ? ' 연결합니다.' : ' 마케팅으로.', description: copy.description, secondary: isCompany ? '회사 이야기 보기' : '대표 인사말 보기'}}/>
    <AboutNav href={href}/>
    {isCompany ? <><CompanyContent/><ClientsSection withCTA={false}/></> : <FounderContent/>}
    <section className={s.final}><div className={s.container}><div><h2>필요한 업무가 아직 정리되지 않았어도 괜찮습니다.</h2><p>현재 운영 상황과 가장 해결하고 싶은 문제를 알려주세요.<br/>검토할 자료와 진행 범위를 함께 정리하겠습니다.</p></div><Link className={s.button} href="/contact/">우리 회사 상황 상담하기 <span aria-hidden="true">→</span></Link></div></section>
  </div>;
}
