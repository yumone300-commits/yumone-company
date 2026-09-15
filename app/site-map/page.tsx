import {QualitySitemap} from '@/components/site-pages';
import {metadata as makeMetadata} from '@/lib/seo';
export const metadata=makeMetadata('전체 사이트맵','회사 소개, 서비스 상세와 콘텐츠를 한곳에서 확인하세요.','/site-map');
export default function Page(){return <QualitySitemap/>}
