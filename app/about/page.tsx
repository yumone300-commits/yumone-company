import {AboutUnified} from '@/components/about-unified';
import {metadata as makeMetadata} from '@/lib/seo';
const title='회사소개 | 염원컴퍼니 — 프랜차이즈 마케팅·교육·컨설팅';
const description='염원컴퍼니는 프랜차이즈 본사를 위한 마케팅·교육·컨설팅 회사입니다. 염혜단 대표의 현장 경험을 바탕으로 가맹모집, 가맹점 마케팅, AI 검색과 실무 교육을 연결합니다.';
const base=makeMetadata('회사소개',description,'/about');
export const metadata={...base,title:{absolute:title},description,openGraph:{...base.openGraph,title,description},twitter:{...base.twitter,title,description}};
export default function Page(){return <AboutUnified/>}
