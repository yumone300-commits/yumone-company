import Link from 'next/link';
import s from './home-service-cards.module.css';

const services = [
  ['프랜차이즈 마케팅 전략', '지금 필요한 실행 순서를 설계합니다.', '/franchise/diagnosis', '전략 살펴보기'],
  ['가맹문의·가맹모집 마케팅', '브랜드 발견을 가맹 상담으로 연결합니다.', '/franchise/recruit', '가맹모집 살펴보기'],
  ['SEO·AEO·GEO 마케팅', '검색과 AI 답변에서 브랜드를 만나게 합니다.', '/ai-search', '검색 마케팅 살펴보기'],
  ['가맹점 매출 활성화', '우리 동네 고객이 찾는 매장을 만듭니다.', '/franchise/sales', '매장 마케팅 살펴보기'],
  ['숏폼·유튜브·홍보영상 제작', '브랜드의 강점을 영상으로 전합니다.', '/content/shortform', '영상 제작 살펴보기'],
  ['프랜차이즈 실무 교육', '배운 내용을 현장 실행으로 옮깁니다.', '/education', '교육 살펴보기'],
  ['홈페이지·랜딩페이지 제작', '서비스 이해부터 상담까지 연결합니다.', '/content/website', '웹 제작 살펴보기'],
  ['본사 시스템 및 업무 자동화', '반복 업무를 연결해 운영을 정리합니다.', '/education/ai', '업무 자동화 살펴보기'],
] as const;

const photos = ['strategy','recruit','search','sales','video','education','website','automation'];

export function HomeServiceCards() {
  return <><div className={s.grid}>{services.map(([title, summary, href, cta], index) =>
    <Link className={s.card} href={href} key={href}>
      <div className={s.top}><span>{String(index + 1).padStart(2, '0')}</span>{[2,7].includes(index) && <span className={s.core}>CORE</span>}</div>
      <div className={s.picture}><img src={`/images/home-services/${photos[index]}.webp`} alt={`${title} 서비스 설명용 AI 생성 이미지`} width="800" height="533" loading="lazy" decoding="async"/></div>
      <h3>{title}</h3><p>{summary}</p>
      <span className={s.cta}>{cta}<span aria-hidden="true">↗</span></span>
    </Link>
  )}</div><p className={s.note}>서비스 이해를 돕기 위한 AI 생성 이미지입니다.</p></>;
}
