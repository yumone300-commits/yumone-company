import {Container,PageHero,FinalCTA} from '@/components/ui';
import {InsightGrid} from '@/components/insight-grid';
import {metadata as makeMetadata} from '@/lib/seo';
export const metadata=makeMetadata('인사이트','프랜차이즈 마케팅, AI 검색과 실전 교육에 관한 성장 인사이트를 만나보세요.','/insights');
export default function Insights(){return <><PageHero eyebrow="NEWS & INSIGHT" title="프랜차이즈 성장 인사이트" description="브랜드의 다음 성장을 위한 질문과 실행의 힌트를 전합니다." image="marketing"/><section className="section"><Container><InsightGrid/></Container></section><FinalCTA/></>}
