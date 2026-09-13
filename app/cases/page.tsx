import {Container,PageHero,FinalCTA} from '@/components/ui';
import {CaseGrid} from '@/components/case-grid';
import {metadata as makeMetadata} from '@/lib/seo';
export const metadata=makeMetadata('성공사례','프랜차이즈, 마케팅, 교육, 컨설팅, AI 검색 분야의 사례를 살펴보세요. 실제 프로젝트 자료는 확인 후 공개합니다.','/cases');
export default function Cases(){return <><PageHero eyebrow="SUCCESS STORY" title="결과로 증명하는 염원컴퍼니" description="브랜드의 문제를 어떻게 바라보고, 어떤 전략과 실행으로 연결하는지 살펴보세요."/><section className="section"><Container><CaseGrid/></Container></section><FinalCTA/></>}
