import {SubpageHero} from '@/components/subpage-hero';
import {Container,FinalCTA} from '@/components/ui';
import {CaseGrid} from '@/components/case-grid';
import {metadata as makeMetadata} from '@/lib/seo';
export const metadata=makeMetadata('성공사례','프랜차이즈, 마케팅, 교육, 컨설팅, AI 검색 분야의 사례를 살펴보세요. 실제 프로젝트 자료는 확인 후 공개합니다.','/cases');
export default function Cases(){return <><SubpageHero href="/project" sectionId="listing-body"/><section id="listing-body" className="section"><Container><CaseGrid/></Container></section><FinalCTA/></>}
