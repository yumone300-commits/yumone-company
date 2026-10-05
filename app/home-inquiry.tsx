'use client';
import {sendInquiry} from '@/lib/contact';
import {useRef,useState} from 'react';
import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import s from './home-v2.module.css';

export function HomeInquiry(){
 const requestId=useRef('');
 const [busy,setBusy]=useState(false);const [message,setMessage]=useState('');const [failed,setFailed]=useState(false);
 return <form className={s.form} onSubmit={async e=>{e.preventDefault();if(busy)return;const form=e.currentTarget;const data=Object.fromEntries(new FormData(form)) as Record<string,string>;setBusy(true);setMessage('');setFailed(false);try{requestId.current||=crypto.randomUUID();const result=await sendInquiry({...data,'form-name':'home',page:location.pathname,agree:data.consent?'동의':'',request_id:requestId.current});setMessage(result.message);requestId.current='';form.reset();}catch(error){setFailed(true);setMessage(error instanceof Error?error.message:'전송에 실패했습니다. 02-6949-6859로 연락 주세요.');}finally{setBusy(false);}}}>
  <input name="bot-field" tabIndex={-1} autoComplete="off" hidden/>
  <div className={s.formFields}>
   {[
    {name:'company',label:'회사명 또는 브랜드명',type:'text',auto:'organization',full:true},
    {name:'name',label:'담당자명',type:'text',auto:'name'},
    {name:'phone',label:'연락처',type:'tel',auto:'tel'},
    {name:'email',label:'이메일',type:'email',auto:'email',optional:true},
    {name:'website',label:'홈페이지 URL',type:'url',auto:'url',optional:true}
   ].map(f=><label className={f.full?s.full:undefined} key={f.name} htmlFor={`home-${f.name}`}>{f.label}{!f.optional&&<span aria-hidden="true"> *</span>}<input id={`home-${f.name}`} name={f.name} type={f.type} autoComplete={f.auto} required={!f.optional} maxLength={254} pattern={f.name==='phone'?'[0-9+ \\-]{8,20}':undefined} placeholder={f.type==='url'?'https://':undefined}/></label>)}
   <label className={s.full} htmlFor="home-service">관심 서비스<select id="home-service" name="service" defaultValue=""><option value="" disabled>관심 서비스를 선택해 주세요</option>{['프랜차이즈 성장 전략','가맹모집 마케팅','AI 검색 최적화','가맹점 매출 활성화','콘텐츠·홈페이지','교육 프로그램','성장 컨설팅','맞춤 마케팅 제안서 요청하기'].map(x=><option key={x}>{x}</option>)}</select></label>
   <label className={s.full} htmlFor="home-message">문의 내용<textarea id="home-message" name="message" maxLength={3000} rows={4} placeholder="브랜드의 현황과 해결하고 싶은 과제를 알려주세요."/></label>
  </div>
  <div className={s.consent}><label><input type="checkbox" required name="consent"/> 개인정보 수집·이용 동의</label><Link href="/privacy">내용 보기</Link></div>
  <button type="submit" disabled={busy} className={s.primary}>{busy?'보내는 중…':'우리 브랜드 무료 진단 받기'} <ArrowRight size={18}/></button>
  {message&&<p role={failed?'alert':'status'} className={s.formNotice}>{message}</p>}
 </form>
}
