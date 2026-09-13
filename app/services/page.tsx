import Link from 'next/link';
import {ArrowRight, Plus, Building2, Target, GraduationCap, ScanSearch} from 'lucide-react';
import {Container, PageHero, Photo, SectionTitle, Button} from '@/components/ui';
import {serviceHub} from '@/data/service-hub';
import {metadata as makeMetadata} from '@/lib/seo';
import styles from './services.module.css';

export const metadata=makeMetadata('사업분야','가맹 문의, 브랜드 마케팅, 가맹점 활성화, AI 검색과 교육. 프랜차이즈의 과제에 맞는 성장 시스템·마케팅·AI 검색·컨설팅 서비스를 찾아보세요.','/services');
const icons=[Building2,Target,GraduationCap,ScanSearch];
export default function Services(){return <div className={styles.page}>
  <div className={styles.hero}><PageHero {...serviceHub.hero}/></div>
  <section className="section"><Container>
    <SectionTitle eyebrow="START WITH YOUR CHALLENGE" title="지금 어떤 문제를 해결해야 하나요?"/>
    <div className={styles.problems}>{serviceHub.problems.map((problem,index)=><Link href={problem.href} key={problem.title}><span className={styles.number}>0{index+1}</span><h3>{problem.title}</h3><span className={styles.problemLink}>{problem.label}<ArrowRight size={18} aria-hidden="true"/></span></Link>)}</div>
  </Container></section>
  <section className="section soft"><Container>
    <SectionTitle eyebrow="OUR SOLUTIONS" title={'성장에 필요한 해답,\n브랜드의 과제에서 시작합니다.'}/>
    <div className={styles.cards}>{serviceHub.services.map((service,index)=><article id={service.slug} className={styles.card} key={service.slug}>
      <div className={styles.cardPhoto}><Photo name={service.image} alt={`${service.title} 분야를 표현한 참고 이미지`}/><span>0{index+1}</span></div>
      <div className={styles.cardBody}><p className="eyebrow">{service.eyebrow}</p><h2>{service.title}</h2>
        <dl><div><dt>문제</dt><dd>{service.problem}</dd></div><div><dt>해결 방법</dt><dd>{service.solution}</dd></div><div><dt>추천 대상</dt><dd>{service.audience}</dd></div></dl>
        <Button href={`/services/${service.slug}`}>상세보기</Button>
      </div>
    </article>)}</div>
  </Container></section>
  <section className="section"><Container>
    <SectionTitle eyebrow="OUR PROCESS" title="진단부터 개선까지, 함께합니다."/>
    <ol className={styles.process}>{serviceHub.process.map((step,index)=><li key={step.title}><div><span>STEP 0{index+1}</span>{index<4&&<ArrowRight size={22} aria-hidden="true"/>}</div><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
  </Container></section>
  <section className={`section ${styles.why}`}><Container>
    <SectionTitle eyebrow="WHY YUMONE" title={'네 가지 전문성을 하나로,\n프랜차이즈의 성장을 연결합니다.'}/>
    <div className={styles.strengths}>{serviceHub.strengths.map((item,index)=>{const Icon=icons[index];return <div key={item.title}><Icon size={36} strokeWidth={1.3} aria-hidden="true"/><h3>{item.title}</h3><p>{item.description}</p>{index<3&&<Plus className={styles.plus} size={24} aria-hidden="true"/>}</div>})}</div>
    <p className={styles.connection}>본사의 전략과 가맹점의 실행을 함께 보는 <strong>프랜차이즈 성장 파트너</strong></p>
  </Container></section>
  <section className={`section ${styles.cta}`}><Container><p className="eyebrow">LET’S FIND YOUR NEXT STEP</p><h2>어떤 서비스를 선택해야 할지<br/>모르셔도 괜찮습니다.</h2><p>현재 브랜드의 문제부터 진단합니다.</p><div className="button-row"><Button href="/contact">우리 브랜드 진단받기</Button></div></Container></section>
</div>}
