import {Suspense} from 'react';
import {QualityHero} from '@/components/site-pages';
import {ContactForm} from '@/components/contact-form';
import {companyContact} from '@/data/navigation';
import {metadata as makeMetadata} from '@/lib/seo';
import s from '@/components/site-quality.module.css';
import f from '@/components/inquiry.module.css';
export const metadata=makeMetadata('마케팅·교육 상담 안내','필요한 마케팅·교육 업무를 전화 또는 이메일로 문의하세요. 서비스별 문의 내용을 정리할 수 있습니다.','/contact');
export default function Contact(){return <div className={s.page} data-quality="site-v2"><QualityHero href="/contact" label="상담 안내"/><section className={s.section}><div className={`${s.container} ${f.layout}`}><aside className={f.aside}><h2>전화 또는 이메일로 문의하세요.</h2><p><a className={f.plainLink} href={`tel:${companyContact.tel}`}>전화 {companyContact.phone}</a><br/><a className={f.plainLink} href={`mailto:${companyContact.email}`}>{companyContact.email}</a></p><h3>문의 후 확인할 내용</h3><ol className={f.steps}><li>현재 운영 상황과 우선 해결할 과제</li><li>검토할 자료와 내부 담당자의 역할</li><li>의뢰할 범위와 진행 일정</li></ol><p>예산이나 일정이 미정이어도 괜찮습니다. 준비된 내용부터 알려주세요.</p></aside><Suspense fallback={<p>문의 작성 화면을 준비하고 있습니다.</p>}><ContactForm/></Suspense></div></section></div>}
