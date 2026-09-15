import {QualityLegal} from '@/components/site-pages';
import {metadata as makeMetadata} from '@/lib/seo';
export const metadata={...makeMetadata('개인정보처리방침','현재 문의 작성 화면의 정보 처리 방식과 운영 정책 확인 범위를 안내합니다.','/privacy'),robots:{index:false,follow:true}};
export default function Page(){return <QualityLegal privacy/>}
