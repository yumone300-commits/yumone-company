'use client';
import {useState} from 'react';
import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import s from './home-redesign.module.css';

export function HomeInquiry(){
 const [checked,setChecked]=useState(false);
 return <form className={s.form} onSubmit={e=>{e.preventDefault();setChecked(true)}}>
  <p className={s.formNotice}>상담 접수 연결 준비 중입니다. 현재 폼은 입력 검증만 제공하며 정보를 저장하거나 전송하지 않습니다.</p>
  <div className={s.formFields}>
   {[
    {name:'company',label:'회사명 또는 브랜드명',type:'text',auto:'organization',full:true},
    {name:'name',label:'담당자명',type:'text',auto:'name'},
    {name:'phone',label:'연락처',type:'tel',auto:'tel'},
    {name:'email',label:'이메일',type:'email',auto:'email'},
    {name:'website',label:'홈페이지 URL',type:'url',auto:'url',optional:true}
   ].map(f=><label className={f.full?s.full:undefined} key={f.name} htmlFor={`home-${f.name}`}>{f.label}{!f.optional&&<span aria-hidden="true"> *</span>}<input id={`home-${f.name}`} name={f.name} type={f.type} autoComplete={f.auto} required={!f.optional} maxLength={254} pattern={f.name==='phone'?'[0-9+ \\-]{8,20}':undefined} placeholder={f.type==='url'?'https://':undefined}/></label>)}
   <label className={s.full} htmlFor="home-service">관심 서비스 *<select id="home-service" name="service" required defaultValue=""><option value="" disabled>관심 서비스를 선택해 주세요</option>{['프랜차이즈 성장 전략','가맹모집 마케팅','AI 검색 최적화','가맹점 매출 활성화','콘텐츠·홈페이지','교육 프로그램','성장 컨설팅'].map(x=><option key={x}>{x}</option>)}</select></label>
   <label className={s.full} htmlFor="home-message">문의 내용 *<textarea id="home-message" name="message" required minLength={5} maxLength={3000} rows={4} placeholder="브랜드의 현황과 해결하고 싶은 과제를 알려주세요."/></label>
  </div>
  <div className={s.consent}><label><input type="checkbox" required name="consent"/> 개인정보 수집·이용 동의</label><Link href="/privacy">내용 보기</Link></div>
  <button type="submit" className={s.primary}>맞춤 성장 전략 상담받기 <ArrowRight size={18}/></button>
  {checked&&<p role="status" className={s.formNotice}>입력 형식을 확인했습니다. 실제 상담 접수는 이루어지지 않았습니다. 접수 기능 연결 후 이용해 주세요.</p>}
 </form>
}
