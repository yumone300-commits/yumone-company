'use client';
import {useRef,useState} from 'react';
import {useSearchParams} from 'next/navigation';
import Link from 'next/link';
import {companyContact,serviceOptions} from '@/data/navigation';
import {prepareContactDraft,type ContactDraft,type ContactPayload} from '@/lib/contact';
import s from './inquiry.module.css';

export function ContactForm(){
 const query=useSearchParams();const[busy,setBusy]=useState(false);const[draft,setDraft]=useState<ContactDraft|null>(null);const[error,setError]=useState('');const[copied,setCopied]=useState('');const status=useRef<HTMLDivElement>(null);const raw=query.get('service')||'';const selected=({ai:'ai-search',marketing:'franchise',activation:'franchise',consulting:'franchise'} as Record<string,string>)[raw]||raw;
 async function handleSubmit(e:React.SubmitEvent<HTMLFormElement>){e.preventDefault();if(busy)return;setBusy(true);setError('');setCopied('');try{const data=new FormData(e.currentTarget);const payload=Object.fromEntries(data) as unknown as ContactPayload;payload.consent=data.get('consent')==='on';const result=prepareContactDraft(payload);setDraft(result);requestAnimationFrame(()=>status.current?.focus());}catch(error){setError(error instanceof Error?error.message:'입력 내용을 확인하고 다시 시도해 주세요.');}finally{setBusy(false)}}
 async function copy(){try{await navigator.clipboard.writeText(`받는 사람: ${companyContact.email}\n제목: ${draft!.subject}\n\n${draft!.body}`);setCopied('문의 내용을 복사했습니다. 이메일에 붙여넣고 직접 발송해 주세요.');}catch{setCopied('자동 복사가 되지 않았습니다. 아래 내용을 선택해 복사하거나 전화로 문의해 주세요.');}}
 return <form className={s.form} onSubmit={handleSubmit} onChange={()=>{setDraft(null);setCopied('');setError('')}}>
  <h2>이메일 문의 내용 정리하기</h2><p className={s.note}>이 화면에서는 문의를 접수하지 않습니다. 내용을 정리한 뒤 이메일 앱에서 직접 발송해 주세요. 전화 문의도 가능합니다.</p>
  <div className={s.grid}><label htmlFor="company">회사명 또는 브랜드명 <span>(필수)</span><input id="company" name="company" required maxLength={100} autoComplete="organization" placeholder="예: 브랜드명 또는 회사명"/></label><label htmlFor="service">관심 서비스 <span className={s.optional}>(선택)</span><select key={selected} id="service" name="service" defaultValue={serviceOptions.some(o=>o.value===selected)?selected:'other'}><option value="other">미정 / 종합 상담</option>{serviceOptions.map(o=><option value={o.value} key={o.value}>{o.label}</option>)}</select></label><label className={s.full} htmlFor="concern">문의 내용 <span>(필수)</span><textarea id="concern" name="concern" required minLength={5} maxLength={1500} rows={5} placeholder="현재 운영 중인 마케팅, 맡기고 싶은 업무, 가장 해결하고 싶은 문제를 적어주세요."/></label></div>
  <details className={s.disclosure}><summary>연락처·참고 주소·일정 추가하기 (선택)</summary><div className={s.grid}>{[{name:'name',label:'담당자명',type:'text',auto:'name'},{name:'email',label:'회신 이메일',type:'email',auto:'email'},{name:'phone',label:'전화번호',type:'tel',auto:'tel'},{name:'website',label:'홈페이지 또는 채널 주소',type:'url',auto:'url'}].map(f=><label key={f.name} htmlFor={f.name}>{f.label}<input id={f.name} name={f.name} type={f.type} autoComplete={f.auto} maxLength={254}/></label>)}<label className={s.full} htmlFor="timing">희망 일정<input id="timing" name="timing" maxLength={100} placeholder="예: 미정, 일정 협의, 다음 분기"/></label></div></details>
  <label className={s.consent}><input type="checkbox" name="consent" required/><span>입력 내용은 이 화면에 저장되지 않으며, 이메일 앱에서 발송해야 전달되는 점을 확인했습니다. (필수) <Link href="/privacy/">개인정보 안내 확인</Link></span></label>
  {error&&<p role="alert" className={s.error}>{error}</p>}<button className={s.button} type="submit" disabled={busy}>{busy?'내용 정리 중…':'문의 내용 확인하기'}</button>
  {draft&&<div className={s.status} tabIndex={-1} ref={status} role="status"><h3>이메일 초안을 준비했습니다.</h3><p><strong>아직 접수되지 않았습니다.</strong> 받는 사람과 내용을 확인하고 이메일 앱에서 보내기를 눌러 주세요.</p><p>받는 사람: <a href={`mailto:${companyContact.email}`}>{companyContact.email}</a><br/>제목: {draft.subject}</p><pre>{draft.body}</pre><div className={s.actions}><a className={s.button} href={draft.mailto}>이메일 앱에서 발송하기</a><button className={s.secondary} type="button" onClick={copy}>문의 내용 복사</button></div><p className={s.small}>이메일 앱이 열리지 않으면 내용을 복사해 평소 사용하는 이메일 서비스에서 보내주세요. 발송·접수 여부는 이 화면에서 확인할 수 없습니다.</p>{copied&&<p aria-live="polite">{copied}</p>}</div>}
 </form>;
}
