import {sendInquiry} from '@/lib/contact';
import {educationInquiryMessage,validateEducationInquiry} from '@/lib/education-inquiry';

export function pushDataLayer(payload:Record<string,string>){const w=window as Window&{dataLayer?:Record<string,string>[]};(w.dataLayer??=[]).push(payload);}

// Copies utm_* values from the page URL into the form's hidden fields.
export function fillSourceFields(form:HTMLFormElement){
  const query=new URLSearchParams(location.search);
  for(const key of ['utm_source','utm_medium','utm_campaign']){const input=form.querySelector<HTMLInputElement>(`input[name="${key}"]`);if(input)input.value=(query.get(key)||'').slice(0,100);}
}

// Sends one inquiry form to /api/contact/ and reports progress in `status`.
export function bindInquiryForm(form:HTMLFormElement,status:HTMLElement,signal:AbortSignal,hooks:{attempt?:()=>void;success?:(data:Record<string,unknown>)=>void}={}){
  let pending=false,requestId='';
  form.addEventListener('submit',async e=>{
    e.preventDefault();if(pending)return;
    status.hidden=false;
    const data:Record<string,unknown>=Object.fromEntries(new FormData(form));data.message??='';data.plan??='';
    requestId||=crypto.randomUUID();data.request_id=requestId;
    const invalid=validateEducationInquiry(data);if(invalid){status.textContent=invalid;form.querySelector<HTMLElement>('input:invalid,select:invalid')?.focus();return;}
    pending=true;const button=form.querySelector<HTMLButtonElement>('button[type=submit]');const label=button?.textContent||'상담 신청하기';if(button){button.disabled=true;button.textContent='보내는 중…';}status.textContent='보내는 중…';
    hooks.attempt?.();
    try{
      const payload:Record<string,string>={};for(const key of ['company','name','phone','email','website','sv','plan','agree','request_id','bot-field'])payload[key]=String(data[key]||'');
      payload['form-name']=data['form-name']==='consult-lp'?'education-lp':'education-main';payload.page=location.pathname;payload.service='교육 서비스';payload.message=educationInquiryMessage(data);
      const result=await sendInquiry(payload);status.textContent=result.message;form.reset();requestId='';fillSourceFields(form);hooks.success?.(data);
    }catch(error){status.textContent=error instanceof Error?error.message:'전송에 실패했습니다. 02-6949-6859로 연락 주세요.';}
    finally{pending=false;if(button){button.disabled=false;button.textContent=label;}}

  },{signal});
}
