import type {Metadata} from 'next';
import Link from 'next/link';
import {getSupportEntries} from '@/lib/support/notion';
import {mergeFaq,faqUrl,faqTitle,faqDescription,faqCategories,faqSchema} from '@/lib/support/faq-data';
import {JsonLd,BreadSchema,metadata as makeMetadata} from '@/lib/seo';
import {site} from '@/data/site';
import {SupportHero} from '@/components/support/shared';
import {SupportNavigation} from '@/components/support/navigation';
import {FaqList} from '@/components/support/faq';
import s from '@/components/support/support.module.css';

export const dynamic='force-dynamic';
type Props={searchParams:Promise<Record<string,string|string[]|undefined>>};
export async function generateMetadata({searchParams}:Props):Promise<Metadata>{
  const query=await searchParams;
  const base=makeMetadata('프랜차이즈 마케팅·교육 FAQ',faqDescription,'/support/faq');
  return {...base,title:{absolute:'프랜차이즈 마케팅·교육 FAQ | 염원컴퍼니'},description:faqDescription,
    alternates:{canonical:faqUrl},openGraph:{...base.openGraph,title:'프랜차이즈 마케팅·교육 FAQ | 염원컴퍼니',description:faqDescription,url:faqUrl},
    robots:{index:!(query.q||query.category),follow:true}};
}
export default async function FaqPage({searchParams}:Props){
  const [raw,cms]=await Promise.all([searchParams,getSupportEntries()]);
  const entries=mergeFaq(cms.entries,cms.state==='ready');
  const q=typeof raw.q==='string'?raw.q.slice(0,100).trim():'';
  const category=typeof raw.category==='string'&&faqCategories.includes(raw.category)?raw.category:'전체';
  return <><SupportHero title={faqTitle} description={'본사 마케팅, 슈퍼바이저·가맹점주 교육,\n자료 이용과 상담 절차를 확인하세요.'}/>
    <div className={s.container}><SupportNavigation/><section className={s.section} data-faq-source={cms.state==='ready'?'cms-merged':'approved-file'}>
      <FaqList entries={entries} initialQuery={q} initialCategory={category}/>
    </section><section className={s.cta}><div><h2>우리 브랜드에 필요한 마케팅·교육,<br/>어디서부터 시작할까요?</h2><p>현재 상황과 가장 큰 고민을 남겨주세요.<br/>필요한 업무와 교육 방향을 함께 정리합니다.</p></div><Link className={s.button} href="/contact/">마케팅·교육 문의하기</Link></section></div>
    <JsonLd data={faqSchema(entries,site.url+'/#organization')}/><BreadSchema items={[{label:'고객지원',href:'/support/'},{label:faqTitle,href:'/support/faq/'}]}/>
  </>;
}
