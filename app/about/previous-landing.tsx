import Link from 'next/link';
import {Building2, Target, GraduationCap, ScanSearch, ArrowRight} from 'lucide-react';
import {Container, PageHero, SectionTitle, Photo, Button} from '@/components/ui';
import {Portrait} from '@/components/portrait';
import {site} from '@/data/site';
import {about} from '@/data/about';
import {metadata as makeMetadata, JsonLd} from '@/lib/seo';
import styles from './about.module.css';

export const metadata = makeMetadata('회사소개', '20년 이상 프랜차이즈 현장을 이해하는 성장 파트너 염원컴퍼니. 염혜단 대표의 경험과 마케팅·교육·컨설팅·AI를 연결하는 철학을 소개합니다.', '/about');
const valueIcons = [Building2, Target, GraduationCap, ScanSearch];

export default function About() {
  return <div className={styles.page}>
    <div className={styles.hero}>
      <PageHero {...about.hero} image="building" />
    </div>
    <nav className="subnav" aria-label="회사소개 항목">
      <Link href="#intro">회사소개</Link>
      <Link href="#why">WHY YUMONE</Link>
      <Link href="#ceo">대표소개</Link>
      <Link href="#experience">주요 경험</Link>
      <Link href="#philosophy">성장 철학</Link>
    </nav>

    <section id="intro" className="section">
      <Container className={styles.company}>
        <div>
          <p className="eyebrow">WHO WE ARE</p>
          <h2>{about.company.title}</h2>
          {about.company.paragraphs.map(text => <p className="muted" key={text}>{text}</p>)}
          <div className={styles.connections} aria-label="성장을 연결하는 과정">
            {about.company.connections.map((text, index) => <span key={text}>{text}{index < 3 && <ArrowRight size={15} aria-hidden="true" />}</span>)}
          </div>
        </div>
        <figure className={styles.companyPhoto}>
          <Photo name="education" alt="참여자들이 함께 배우는 비즈니스 교육 현장 참고 사진" />
          <figcaption>전략을 현장의 실행으로 연결합니다.<small>교육 현장을 표현한 참고 이미지</small></figcaption>
        </figure>
      </Container>
    </section>

    <section id="why" className="section soft">
      <Container>
        <SectionTitle eyebrow="WHY YUMONE" title={'마케팅만 아는 회사와\n프랜차이즈를 아는 마케팅 회사는 다릅니다.'} />
        <div id="values" className={styles.values}>
          {about.values.map((value, index) => {
            const Icon = valueIcons[index];
            return <div className={`detail-card ${styles.value}`} key={value.title}>
              <div className={styles.valueTop}><span>0{index + 1}</span><Icon size={30} strokeWidth={1.4} aria-hidden="true" /></div>
              <h3>{value.title}</h3><p>{value.description}</p>
            </div>;
          })}
        </div>
      </Container>
    </section>

    <section id="ceo" className="section">
      <Container className={styles.ceo}>
        <div className={styles.portrait}>
          <span className="eyebrow">YUMONE COMPANY</span>
          <Portrait />
          <div className={styles.portraitCaption}><span>사람과 브랜드의 성장을 함께</span><strong>염혜단</strong></div>
        </div>
        <div>
          <p className="eyebrow">CEO</p><h2>{about.ceo.title}</h2>
          <p className={styles.ceoName}>염원컴퍼니 대표 <strong>{site.ceo}</strong></p>
          <p className="muted">{about.ceo.description}</p>
          <h3 className={styles.careerTitle}>주요 경험과 전문 분야</h3>
          <ul className="check-list">{about.ceo.careers.map(career => <li key={career}>{career}</li>)}</ul>
        </div>
      </Container>
    </section>

    <section id="experience" className={`section soft ${styles.experience}`}>
      <Container>
        <SectionTitle eyebrow="EXPERIENCE" title="현장에서 쌓아온 경험, 성장의 기반이 됩니다." />
        <div className={styles.numbers}>{about.experience.map(item => <div key={item.label}>
          <p><strong>{item.value}</strong><span>{item.unit}</span></p><h3>{item.label}</h3>
        </div>)}</div>
      </Container>
    </section>

    <section id="philosophy" className={`section ${styles.philosophy}`}>
      <Container>
        <div className={styles.philosophyIntro}><div><p className="eyebrow">OUR PHILOSOPHY</p><h2>{about.philosophy.title}</h2></div><p>{about.philosophy.description}</p></div>
        <div className={styles.principles}>{about.philosophy.principles.map((item, index) => <div key={item.title}>
          <span>0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p>
        </div>)}</div>
      </Container>
    </section>

    <section className={`section ${styles.cta}`}>
      <Container><p className="eyebrow">LET’S GROW TOGETHER</p><h2>우리 브랜드의 다음 성장을<br />염원컴퍼니와 함께 설계해 보세요.</h2>
        <div className="button-row"><Button href="/contact?service=ai">우리 브랜드 진단받기</Button><Button secondary href="/contact">프로젝트 상담하기</Button></div>
      </Container>
    </section>
    <JsonLd data={{'@type':'Person', name:site.ceo, jobTitle:'대표', worksFor:{'@id':site.url+'/#organization'}, url:site.url+'/about'}} />
  </div>;
}
