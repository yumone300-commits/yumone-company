import Image from 'next/image';
import Link from 'next/link';
import {contactHref} from '@/data/navigation';
import {experienceProfile,photos} from '@/data/service-experience';
import {insights} from '@/data/content';
import {about} from '@/data/about';
import {JsonLd,BreadSchema} from '@/lib/seo';
import {site} from '@/data/site';
import s from './service-experience.module.css';

function Contact({group,children}:{group:string;children:React.ReactNode}) {
 return <Link className={s.primary} href={contactHref(group)}>{children}<span aria-hidden="true">→</span></Link>;
}
function Heading({number,title,text}:{number:string;title:string;text?:string}) {
 return <header className={s.sectionHeading}><p className={s.sectionNumber}>{number}</p><h2>{title}</h2>{text&&<p>{text}</p>}</header>;
}

export function ServiceExperience({href}:{href:string}) {
 const data=experienceProfile(href);
 if(!data)return null;
 const {group,child,detail,profile,copy,scope,outputs}=data;
 const title=child?.title||group.title;
 const description=detail?.description||copy.description;
 const education=group.key==='education';
 const rows=child?[data]:group.children.map(c=>experienceProfile(c.href)!).filter(Boolean);
 const photo=copy.photo?photos[copy.photo]:undefined;
 const related=insights.filter(i=>group.key==='ai-search'?['AI','SEO · AEO'].includes(i.category):education?i.category==='교육':i.category==='프랜차이즈').slice(0,2);
 const faq=[
  {q:education?'교육 내용은 어떻게 정하나요?':'의뢰할 업무가 정해지지 않아도 상담할 수 있나요?',a:education?'교육 대상의 역할과 실무 수준, 교육 후 적용할 업무를 확인합니다. 보유 자료와 실습 환경을 함께 살펴보고 주제와 범위를 정합니다.':'현재 운영 상황과 우선 해결할 과제부터 알려주세요. 기존 자료를 검토하고 내부 담당자가 진행할 일과 외부에 맡길 일을 구분합니다.'},
  {q:education?'한 가지 주제로만 교육을 요청할 수 있나요?':'일부 업무만 의뢰할 수 있나요?',a:education?'필요한 주제부터 협의할 수 있습니다. 참여 대상과 업무 과제, 실습 환경에 따라 내용을 정합니다.':'필요한 업무부터 협의할 수 있습니다. 기존 담당자나 대행사의 역할을 확인한 뒤 의뢰 범위와 자료 전달·검수 방식을 정합니다.'},
  {q:'상담 전에 어떤 자료를 준비하면 되나요?',a:`${copy.prepare}를 준비해 주세요. 준비되지 않은 항목은 상담에서 확인합니다.`},
  {q:'비용은 어떤 기준으로 정해지나요?',a:education?'교육 주제와 참여 인원, 시간, 실습 준비 범위를 확인한 뒤 협의합니다.':'작업 범위, 필요한 제작물, 보유 자료와 검수 일정을 확인한 뒤 협의합니다.'},
  ...(group.key==='ai-search'?[{q:'검색 순위나 AI 노출을 보장하나요?',a:'검색 순위·AI 노출·추천을 보장하지 않습니다. 공식 정보의 정확성과 구조를 정비하고, 실제 답변을 기록해 보완할 항목을 확인합니다.'}]:[]),
 ];
 const allFaq=[...(profile?.faq||[]),...faq].filter((item,index,items)=>items.findIndex(x=>x.q===item.q)===index).slice(0,6);
 const breadcrumbs=child?[{label:group.title,href:group.href},{label:title,href}]:[{label:title,href}];
 return <div className={s.page}>
  <BreadSchema items={breadcrumbs}/><JsonLd data={{'@type':'Service',name:title,description,url:site.url+href+'/',provider:{'@id':site.url+'/#organization'}}}/>
  <section className={s.hero} aria-labelledby="service-title"><div className={s.container}>
   <nav className={s.breadcrumb} aria-label="현재 위치"><Link href="/">홈</Link><span>/</span>{child&&<><Link href={group.href}>{group.title}</Link><span>/</span></>}<span aria-current="page">{title}</span></nav>
   <div className={s.heroGrid}><div><p className={s.eyebrow}>{child?title:copy.label}</p><h1 id="service-title">{detail?.before||copy.before}{' '}<br/>{detail?.emphasis||copy.emphasis}</h1><p className={s.description}>{description}</p><div className={s.actions}><Contact group={group.key}>{child?`${title} 상담하기`:copy.cta}</Contact><a className={s.textLink} href="#service-scope">서비스 범위 확인하기 <span aria-hidden="true">↓</span></a></div></div>
    <dl className={s.facts}><div><dt>대상</dt><dd>{profile?.audience||copy.audience}</dd></div><div><dt>{education?'교육 내용':'주요 업무'}</dt><dd>{detail?detail.checks.join(' · '):copy.work}</dd></div><div><dt>진행 방식</dt><dd>현황 확인 → 범위 협의 → {education?'교육·실습':'실행·검토'}</dd></div></dl>
   </div>
  </div></section>
  <nav className={s.subnav} aria-label={`${group.title} 하위 메뉴`}><div className={s.container}><Link href={group.href} aria-current={!child?'page':undefined}>전체 소개</Link>{group.children.map(c=><Link key={c.href} href={c.href} aria-current={href===c.href?'page':undefined}>{c.title}</Link>)}</div></nav>

  <section className={s.section}><div className={`${s.container} ${s.introGrid}`}><Heading number="01 / 대상과 과제" title={child?'이런 업무를 준비하고 있다면':'이런 상황의 담당자에게 필요합니다.'} text={child?(profile?.audience||copy.audience):undefined}/><div>{child?<p className={s.context}>{profile?.strategy||detail?.description}</p>:<ul className={s.situations}>{copy.situations.map(x=><li key={x}>{x}</li>)}</ul>}<div className={s.questions}><h3>상담 전, 세 가지만 확인해 주세요.</h3><ol>{(child?[`${detail!.checks[0]}와 관련된 현재 자료가 있나요?`,`${detail!.checks[1]}에서 우선 정리할 내용은 무엇인가요?`,`${detail!.checks[2]}를 담당할 내부 인력은 누구인가요?`]:copy.questions).map(q=><li key={q}>{q}</li>)}</ol></div></div></div></section>

  <section id="service-scope" className={`${s.section} ${s.tint}`}><div className={s.container}><Heading number="02 / 업무 범위와 제공 자료" title={education?'교육 내용과 활용할 자료를 함께 확인하세요.':'맡길 업무와 확인할 자료를 함께 보세요.'} text="아래 항목을 바탕으로 필요한 범위를 협의합니다. 실제 제공 항목과 일정은 계약에서 확정합니다."/>
   {child?<div className={s.detailGrid}><div><h3>{education?'교육·실습 범위':'수행하는 업무'}</h3><ol className={s.scopeList}>{scope.map((x,i)=><li key={x}><span>0{i+1}</span>{x}</li>)}</ol></div><div className={s.outputPanel}><h3>확인할 자료·결과물</h3><ul>{outputs.map(x=><li key={x}>{x}</li>)}</ul><p>완료 자료를 함께 검토하고, 보완할 항목과 다음 실행 내용을 정리합니다.</p></div></div>:<table className={s.scopeTable}><caption className={s.srOnly}>{group.title} 서비스별 업무와 제공 자료</caption><thead><tr><th scope="col">서비스</th><th scope="col">{education?'교육·실습 범위':'수행하는 업무'}</th><th scope="col">확인할 자료·결과물</th></tr></thead><tbody>{rows.map(row=><tr key={row.child!.href}><th scope="row"><Link href={row.child!.href}>{row.child!.title}<span className={s.rowLink}>상세 범위 보기 →</span></Link></th><td><ul>{row.scope.map(x=><li key={x}>{x}</li>)}</ul></td><td><span className={s.mobileLabel}>확인할 자료·결과물</span><ul>{row.outputs.map(x=><li key={x}>{x}</li>)}</ul></td></tr>)}</tbody></table>}
   <p className={s.scopeNote}>{education?'참여자 수준과 실습 환경에 따라 교육 내용과 자료를 조정합니다.':'보유 자료, 내부 담당자의 역할, 검수 기준을 확인한 뒤 작업 범위를 정합니다.'}</p>
  </div></section>

  <section className={s.section}><div className={`${s.container} ${s.evidenceGrid}`}><div><Heading number="03 / 경험과 근거" title={copy.evidence} text={copy.basis}/><dl className={s.credentials}><div><dt>담당자의 경험</dt><dd>염혜단 대표 · {about.ceo.careers[0]}</dd></div><div><dt>관련 활동</dt><dd>{group.key==='ai-search'?about.ceo.careers[4]:education?about.ceo.careers[2]:`${about.ceo.careers[1]} · ${about.ceo.careers[3]}`}</dd></div></dl><Link className={s.textLink} href="/about/founder/">대표 경력과 활동 확인하기 <span aria-hidden="true">→</span></Link></div>{photo&&<figure className={s.evidencePhoto}><Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" sizes="(max-width: 760px) 90vw, 340px"/><figcaption>{photo.caption}</figcaption></figure>}</div></section>

  <section className={`${s.section} ${s.divided}`}><div className={s.container}><Heading number="04 / 진행 절차" title={education?'교육 과제 확인부터 현장 적용까지':'현황 확인부터 실행 검토까지'}/><ol className={s.process}>{[
   {title:'현황과 자료 확인',text:education?'참여자의 업무와 수준, 실습에 사용할 자료를 확인합니다.':'운영 중인 채널과 보유 자료, 우선 해결할 과제를 확인합니다.'},
   {title:'업무 범위 협의',text:education?'주제와 실습 범위, 준비 환경과 일정을 협의합니다.':'맡길 업무와 제공 자료, 담당자와 검수 일정을 정합니다.'},
   {title:education?'교육·실습 및 적용 정리':'실행 및 검토',text:education?'합의한 주제로 실습하고 현장에서 적용할 내용을 정리합니다.':'합의한 업무를 진행하고 결과물과 보완할 항목을 함께 검토합니다.'},
  ].map((step,i)=><li key={step.title}><span>0{i+1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol></div></section>

  <section className={`${s.section} ${s.divided}`}><div className={`${s.container} ${s.faqGrid}`}><Heading number="05 / 자주 묻는 질문" title="상담 전에 확인해 주세요."/><div className={s.faq}>{allFaq.map(f=><details key={f.q}><summary>{f.q}<span aria-hidden="true">+</span></summary><p>{f.a}</p></details>)}</div><JsonLd data={{'@type':'FAQPage',mainEntity:allFaq.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}}))}}/></div>
   {related.length>0&&<aside className={`${s.container} ${s.related}`} aria-label="참고할 글"><h3>참고할 글</h3><ul>{related.map(i=><li key={i.slug}><Link href={`/insight/column/${i.slug}/`}>{i.title} <span aria-hidden="true">→</span></Link></li>)}</ul></aside>}
  </section>

  <section className={s.final}><div className={`${s.container} ${s.finalGrid}`}><div><h2>현재 운영 상황과 필요한 업무를 알려주세요.</h2><p>검토할 자료와 진행 범위를 함께 정리하겠습니다.</p></div><Contact group={group.key}>우리 회사 상황 상담하기</Contact></div></section>
 </div>;
}
