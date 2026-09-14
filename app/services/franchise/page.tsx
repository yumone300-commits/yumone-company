import Link from 'next/link';
import {ArrowRight, Check} from 'lucide-react';
import {Container,PageHero,SectionTitle,Photo,Breadcrumb,Button} from '@/components/ui';
import {franchise} from '@/data/franchise';
import {cases} from '@/data/content';
import {site} from '@/data/site';
import {metadata as makeMetadata,JsonLd,BreadSchema} from '@/lib/seo';
import styles from './franchise.module.css';

export const metadata=makeMetadata('프랜차이즈 성장 시스템','10~100개 가맹점을 운영하는 본사를 위한 프랜차이즈 성장 시스템. 브랜드 진단, 가맹 모집, 본사 마케팅, 운영·교육 체계를 연결합니다.','/services/franchise');
const crumbs=[{label:'사업분야',href:'/franchise'},{label:'프랜차이즈 성장 시스템',href:'/franchise'}];
const relatedCases=cases.filter(item=>franchise.relatedCaseSlugs.includes(item.slug));
export default function Franchise(){return <div className={styles.page}>
  <div className={styles.hero}><PageHero {...franchise.hero}/></div>
  <Breadcrumb items={crumbs}/>
  <section className="section" id="audience"><Container>
    <SectionTitle eyebrow="01 / IS THIS YOUR CHALLENGE?" title="이런 브랜드에 필요합니다" description="가맹점 10~100개를 운영하는 대표·임원부터 가맹사업 확장을 준비하는 브랜드까지, 현재 단계에서 출발합니다."/>
    <div className={styles.audience}>{franchise.audience.map((item,index)=><div className="detail-card" key={item.title}><span>0{index+1}</span><h3>{item.title}</h3><p>{item.description}</p></div>)}</div>
  </Container></section>
  <section className="section soft" id="scope"><Container>
    <SectionTitle eyebrow="02 / WHAT WE DO" title={'성장의 방향부터 현장 실행까지,\n주요 서비스를 연결합니다.'}/>
    <div className={styles.services}>{franchise.services.map((item,index)=><div key={item.title} className={styles.service}><span>0{index+1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div><p className={styles.output}><Check size={17} aria-hidden="true"/>{item.output}</p></div>)}</div>
    <p className="content-note">세부 범위와 산출물은 브랜드 현황과 상담 결과에 따라 조정합니다.</p>
  </Container></section>
  <section className="section" id="process"><Container>
    <SectionTitle eyebrow="03 / OUR PROCESS" title="진단부터 개선까지, 성장의 기준을 만듭니다."/>
    <ol className={styles.process}>{franchise.process.map((item,index)=><li key={item.title}><div><span>STEP 0{index+1}</span>{index<5&&<ArrowRight size={20} aria-hidden="true"/>}</div><h3>{item.title}</h3><p>{item.description}</p></li>)}</ol>
  </Container></section>
  <section className={`section ${styles.why}`} id="why"><Container className={styles.whyGrid}>
    <div><p className="eyebrow">04 / WHY YUMONE</p><h2>프랜차이즈를 아는 전략,<br/>현장에서 작동하는 시스템.</h2><p className={styles.whyIntro}>가맹점이 늘어나는 속도만큼 본사의 지원 체계도 성장해야 합니다. 염원컴퍼니는 현장을 이해하는 경험으로 브랜드의 다음 단계를 함께 설계합니다.</p><Button secondary href="/about">염원컴퍼니 알아보기</Button></div>
    <div className={styles.reasons}>{franchise.why.map((item,index)=><div key={item.title}><span>0{index+1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></div>)}</div>
  </Container></section>
  <section className="section" id="cases"><Container>
    <SectionTitle eyebrow="05 / RELATED CASES" title="관련 성공사례" href="/project" linkText="사례 전체보기"/>
    <p className={styles.caseNotice}>현재 등록된 사례는 구성 예시입니다. 실제 고객사와 성과는 확인 후 공개합니다.</p>
    <div className={styles.cases}>{relatedCases.map(item=><Link className="case-card" href={`/project/marketing/${item.slug}`} key={item.slug}><Photo name={item.image} alt={`${item.category} 분야 참고 이미지`}/><div className="card-content"><span className="sample-badge">구성 예시 · 실제 사례 아님</span><h3>{item.title}</h3><p>{item.service}</p><div className="tags">{item.tags.map(tag=><span key={tag}>{tag}</span>)}</div><span className="red-link">사례 구성 보기 <ArrowRight size={16} aria-hidden="true"/></span></div></Link>)}</div>
  </Container></section>
  <section className="section soft" id="faq"><Container><SectionTitle eyebrow="06 / FAQ" title="자주 묻는 질문"/><div className={`faq ${styles.faq}`}>{franchise.faq.map(item=><details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></Container></section>
  <section className={`section ${styles.cta}`}><Container><p className="eyebrow">YOUR NEXT GROWTH</p><h2>우리 브랜드는 지금<br/>어느 성장 단계에 있을까요?</h2><p>현재의 과제를 확인하고, 다음 성장에 필요한 구조부터 살펴보세요.</p><div className="button-row"><Button href="/contact?service=franchise">프랜차이즈 성장 진단받기</Button></div></Container></section>
  <BreadSchema items={crumbs}/><JsonLd data={{'@type':'Service',name:'프랜차이즈 성장 시스템',description:franchise.hero.description,url:site.url+'/services/franchise',provider:{'@id':site.url+'/#organization'}}}/><JsonLd data={{'@type':'FAQPage',mainEntity:franchise.faq.map(item=>({'@type':'Question',name:item.q,acceptedAnswer:{'@type':'Answer',text:item.a}}))}}/>
</div>}
