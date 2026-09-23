import Image from 'next/image';
import photo from './recruit-photo-card.module.css';
import {ServiceHeroPhoto} from './service-hero-photo';
import Link from 'next/link';
import {navigation, contactHref, companyContact} from '@/data/navigation';
import {guideFAQs, processByGroup, serviceGuides, type ServiceGuide} from '@/data/service-guide';
import {BreadcrumbTrail, JsonLd} from '@/lib/seo';
import {site} from '@/data/site';
import s from './service-guide.module.css';
import {serviceMedia} from '@/data/service-media';
import {ServiceMediaSections} from './service-media';
import {DecisionPath, WorkVisual, serviceStory} from './service-visual';

function Button({p}: {p: ServiceGuide}) {
  return <Link className={s.button} href={contactHref(p.group)}>{p.cta}<span aria-hidden="true">→</span></Link>;
}

function NextStep({p, title, text}: {p:ServiceGuide; title:string; text:string}) {return <aside className={s.nextStep}><div><strong>{title}</strong><p>{text}</p></div><Button p={p}/></aside>;}
function Paper({p, compact = false}: {p: ServiceGuide; compact?: boolean}) {
  return <div className={`${s.paper} ${compact ? s.compact : ''}`}>
    <div className={s.paperTop}><span>YUMONE COMPANY</span><span>구성 예시</span></div>
    <h3>{p.example.title}</h3>
    <dl>{p.example.rows.slice(0, compact ? 3 : 4).map(([label, text]) => <div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}</dl>
    <p className={s.paperNote}>업무 설명용 기획 예시 · 실제 고객 실적이나 검색 결과가 아닙니다.</p>
  </div>;
}

const recruitSituations = [
  {title:'광고를 봐도 문의하지 않습니다.', check:'누구에게 어떤 메시지를 보여주는가', work:'광고 타깃과 소재 점검', image:'/images/recruit-examples/advertising.webp', caption:'창업자의 관심을 끄는 광고', keywords:'타깃 설정 · 브랜드 선택 이유 · 창업 조건', alt:'매장과 메뉴 사진이 있는 가맹모집 광고를 스마트폰으로 살펴보는 손'},
  {title:'홈페이지를 봐도 판단하기 어렵습니다.', check:'비용·운영 조건·본사 지원이 충분한가', work:'가맹모집 페이지와 FAQ 보강', image:'/images/recruit-examples/website.webp', caption:'창업 판단에 필요한 정보를 한눈에', keywords:'창업비용 · 운영 조건 · 본사 지원', alt:'매장 사진과 창업 정보 구획이 표시된 가맹모집 홈페이지 예시를 연 노트북'},
  {title:'문의 후 상담이 이어지지 않습니다.', check:'신청 이후 안내와 응대가 준비되어 있는가', work:'상담 안내와 응대 자료 정리', image:'/images/recruit-examples/consultation.webp', caption:'문의가 다음 상담으로 이어지도록', keywords:'신청 후 안내 · 상담 준비 · 후속 응대', alt:'밝은 상담 공간에서 담당자와 예비 창업자가 체크리스트를 함께 검토하는 장면'},
];

export function ServiceGuidePage({href}: {href:string}) {
  const p = serviceGuides[href];
  const group = navigation.find(g => g.key === p.group)!;
  const hub = href === group.href;
  const faqs = guideFAQs(p);
  const education = p.group === 'education';
  const story=serviceStory(p);
  const mediaSections=serviceMedia[href];
  const ai = p.group === 'ai-search';
  return <div className={s.page} data-service-guide={href}>
    <JsonLd data={{'@type':'Service',name:p.title,description:p.description,url:site.url+href+'/',provider:{'@id':site.url+'/#organization'}}}/>
    
    <section className={s.hero} aria-labelledby="service-title">
      <div className={s.container}>
        <BreadcrumbTrail className={s.breadcrumb} items={[...(!hub?[{label:group.title,href:group.href}]:[]),{label:p.title,href}]}/>
        <div className={s.heroGrid}>
          <div className={s.heroCopy}><p className={s.serviceName}>{p.title}</p><h1 id="service-title">{p.headline}</h1><p className={s.intro}>{p.description}</p><p className={s.heroBenefit}>→ {story[1]}</p><p className={s.audience}><span>이런 분께</span>{p.audience}</p><div className={s.actions}><Button p={p}/><a className={s.secondary} href="#service-work">업무·결과물 보기 <span aria-hidden="true">↓</span></a></div></div>
          <div className={s.heroVisual}><ServiceHeroPhoto href={href}/></div>
        </div>
      </div>
    </section>
    <nav className={s.subnav} aria-label={`${group.title} 하위 메뉴`}><div className={s.container}><Link href={group.href} aria-current={hub ? 'page' : undefined}>전체 서비스</Link>{group.children.map(item => <Link key={item.href} href={item.href} aria-current={href === item.href ? 'page' : undefined}>{item.title}</Link>)}</div></nav>

    {hub && <section className={s.section}><div className={s.container}><p className={s.eyebrow}>서비스 선택</p><h2>{education ? '맡고 있는 업무에 맞는 교육을 선택하세요.' : '지금 필요한 업무부터 살펴보세요.'}</h2><div className={s.serviceLinks}>{group.children.map((item,index) => <Link href={item.href} key={item.href}><span className={s.index}>0{index+1}</span><div><h3>{item.title}</h3><p>{serviceGuides[item.href].headline.replace('\n',' ')}</p></div><span className={s.arrow} aria-hidden="true">↗</span></Link>)}</div></div></section>}

    {mediaSections ? <div id="service-work"><ServiceMediaSections sections={mediaSections}/></div> : <>
    <section className={`${s.section} ${s.soft}`}><div className={s.container}><p className={s.eyebrow}>우리 상황에서 시작합니다</p><DecisionPath p={p}/>
      {href === '/franchise/recruit' ? <><h2>광고는 하고 있는데,<br/>가맹 문의가 부족한가요?</h2><p className={s.sectionLead}>광고 타깃, 창업 정보, 상담 신청 과정을 함께 살펴보고 필요한 작업을 정리합니다.</p><div className={s.situations}>{recruitSituations.map((item,index) => <article key={item.title}><div className={s.situationCopy}><span className={s.index}>0{index+1}</span><h3>{item.title}</h3><dl><div><dt>확인할 내용</dt><dd>{item.check}</dd></div><div><dt>연결할 작업</dt><dd>{item.work}</dd></div></dl></div><figure className={photo.card}><div className={photo.image}><Image src={item.image} alt={item.alt} width={960} height={600} sizes="(max-width: 760px) calc(100vw - 40px), 464px"/><span>구성 예시</span></div><figcaption><strong>{item.caption}</strong><p>{item.keywords}</p></figcaption></figure></article>)}</div></> : <><h2>{education ? '교육에서 함께 풀어볼 업무입니다.' : '현재 이런 업무가 필요하신가요?'}</h2><ol className={s.needs}>{p.needs.map((need,index) => <li key={need}><span>0{index+1}</span><p>{need}</p></li>)}</ol></>}
      {p.group === 'franchise' && <p className={s.context}>가맹모집은 예비 창업자의 상담, 매장 홍보는 기존 가맹점의 고객 방문이 목적입니다. 대상과 필요한 자료를 나누어 진행합니다.</p>}
      <NextStep p={p} title="지금 필요한 일부터 좁혀보세요." text={story[2]}/>
    </div></section>

    <section id="service-work" className={s.section}><div className={s.container}><div className={s.sectionHeading}><div><p className={s.eyebrow}>{education ? '교육 주제와 실습' : '실제로 진행하는 업무'}</p><h2>{education ? '교육이 끝난 뒤에도,\n내 업무에 사용할 수 있도록.' : '의뢰할 업무와 받을 결과물,\n한눈에 확인하세요.'}</h2></div><p>전체를 한 번에 맡기지 않아도 됩니다.<br/>지금 필요한 작업과 결과물부터 정합니다.</p></div>
      <WorkVisual p={p}/>
      {ai && <aside className={s.context}><strong>SEO·AEO·GEO는 함께 정비하는 부분이 있습니다.</strong><p>페이지 설명, FAQ와 공식 정보는 서로 연결됩니다. 겹치는 업무는 범위를 나누어 진행하며 검색 순위·AI 추천·인용을 보장하지 않습니다.</p></aside>}
    </div></section>

    <section className={`${s.section} ${s.soft}`}><div className={`${s.container} ${s.exampleGrid}`}><div><p className={s.eyebrow}>{education ? '실습 자료 미리보기' : '작업 자료 미리보기'}</p><h2>{p.example.title}</h2><p className={s.sectionLead}>{education ? '실제 업무에 가져갈 자료의 항목을 먼저 확인하세요. 참여자의 수준과 사용 자료에 맞춰 실습 내용을 조정합니다.' : '어떤 정보를 정리하는지 보여주는 기획 예시입니다. 브랜드의 실제 자료를 확인한 뒤 항목과 내용을 구성합니다.'}</p><div className={s.takeaway}><h3>검토할 때 확인할 것</h3><ul><li>{p.jobs[0][0]}에 필요한 공식 자료가 있는가</li><li>자료 검토자와 사용자가 정해져 있는가</li><li>추가 제작과 기존 자료 활용 범위가 구분되어 있는가</li></ul></div>{!education && <p className={s.exampleDisclaimer}>예시의 항목·문구는 서비스 이해를 돕기 위한 것으로, 실제 고객 사례나 확인된 검색·AI 답변이 아닙니다.</p>}</div><Paper p={p}/><div className={s.exampleCta}><NextStep p={p} title="우리 브랜드에는 어떤 자료가 필요할까요?" text="기존 자료를 활용할 부분과 새로 만들 부분을 함께 구분합니다."/></div></div></section>

    </>}
    <section className={s.section}><div className={s.container}><p className={s.eyebrow}>진행 절차와 견적</p><h2>{education ? '교육을 준비하고 활용 자료를 정리하기까지.' : '자료를 확인하고 결과물을 전달하기까지.'}</h2><ol className={s.process}>{processByGroup[p.group].map(([title,text],index) => <li key={title}><span className={s.stepNumber}>0{index+1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol><div className={s.quote}><h3>견적을 정할 때 확인합니다</h3><p>{p.quote}. 필요한 업무와 자료를 확인한 뒤 비용·일정·수정 범위를 안내합니다.</p></div></div></section>

    <section className={`${s.section} ${s.soft}`}><div className={`${s.container} ${s.faqLayout}`}><div><p className={s.eyebrow}>자주 묻는 질문</p><h2>문의 전에<br/>확인해 주세요.</h2><p className={s.sectionLead}>{p.title}의 의뢰 범위와 준비 자료를 안내합니다.</p></div><div className={s.faqs}>{faqs.map(([q,a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></div></section>

    <section className={s.final} data-service-inquiry><div className={s.container}><div><p className={s.eyebrow}>상담의 시작은 현재 상황 하나면 충분합니다</p><h2>{education ? '우리 팀에 필요한 실습,' : '우리 브랜드에 필요한 다음 작업,'}<br/>함께 구체화해 볼까요?</h2><p>{p.prepare} 중 준비된 내용을 알려주세요. 상담에서는 필요한 업무, 맡길 범위, 비용과 일정을 정할 조건을 함께 확인합니다.</p></div><div className={s.contactActions}><Button p={p}/><p>실제 문의는 전화·이메일로 가능합니다.</p><a href={`tel:${companyContact.tel}`}>전화 {companyContact.phone}</a><a href={`mailto:${companyContact.email}`}>{companyContact.email}</a></div></div></section>
    <JsonLd data={{'@type':'FAQPage',mainEntity:faqs.map(([q,a]) => ({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))}}/>
  </div>;
}

