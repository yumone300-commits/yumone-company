import {QualityLegal} from '@/components/site-pages';
import {metadata as makeMetadata} from '@/lib/seo';
export const metadata={...makeMetadata('홈페이지 이용 안내','서비스 제공 범위, 업무 구성 예시와 문의 이용 방법을 안내합니다.','/terms'),robots:{index:false,follow:true}};
export default function Page(){return <QualityLegal privacy={false}/>}
