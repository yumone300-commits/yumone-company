'use client';
import {useEffect} from 'react';
import {validateEducationInquiry} from '@/lib/education-inquiry';
export function EducationBehavior(){
  useEffect(()=>{
    const root=document.getElementById('education-landing');if(!root)return;
    const bar=root.querySelector<HTMLElement>('#qbar')!;
    const toggle=root.querySelector<HTMLButtonElement>('#qbar-tab')!;
    const mobile=matchMedia('(max-width:860px)');
    const pending=new Set<HTMLFormElement>(),finished=new Set<HTMLFormElement>();
    const requestIds=new WeakMap<HTMLFormElement,string>();
    const controller=new AbortController();const signal=controller.signal;
    const originalPadding=document.body.style.paddingBottom;
    function reserve(){document.body.style.paddingBottom=(bar.classList.contains('is-focus-hidden')?0:bar.classList.contains('is-closed')?36:bar.getBoundingClientRect().height+36)+'px';}
    const resize=new ResizeObserver(reserve);resize.observe(bar);
    function resetSize(){bar.classList.remove('is-expanded','is-closed');toggle.setAttribute('aria-expanded',String(!mobile.matches));reserve();}
    resetSize();mobile.addEventListener('change',resetSize,{signal});
    toggle.addEventListener('click',()=>{if(mobile.matches){bar.classList.toggle('is-expanded');toggle.setAttribute('aria-expanded',String(bar.classList.contains('is-expanded')));}else{bar.classList.toggle('is-closed');toggle.setAttribute('aria-expanded',String(!bar.classList.contains('is-closed')));}reserve();},{signal});
    const terms=root.querySelector<HTMLButtonElement>('#q-terms-btn')!;
    terms.addEventListener('click',()=>{const panel=root.querySelector<HTMLElement>('#q-terms')!;panel.hidden=!panel.hidden;terms.setAttribute('aria-expanded',String(!panel.hidden));},{signal});
    root.addEventListener('focusin',e=>{if(mobile.matches&&e.target instanceof HTMLElement&&e.target.closest('#lead-form')){bar.classList.add('is-focus-hidden');reserve();}},{signal});
    root.addEventListener('focusout',()=>{queueMicrotask(()=>{if(!root.querySelector('#lead-form')?.contains(document.activeElement)){bar.classList.remove('is-focus-hidden');reserve();}});},{signal});
    function event(name:string,formId:string){const w=window as Window&{dataLayer?:Record<string,string>[]};(w.dataLayer??=[]).push({event:name,form_id:formId});}
    root.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{const value=root.querySelector('#'+button.dataset.copy)?.textContent||'';try{await navigator.clipboard.writeText(value);button.textContent='복사됨';}catch{button.textContent='복사 실패 — 직접 선택해 주세요';}},{signal}));
    root.querySelectorAll<HTMLElement>('[data-cta]').forEach(link=>link.addEventListener('click',()=>{if(link instanceof HTMLButtonElement&&link.type==='submit')return;event('education_cta_click',link.dataset.cta||'education');},{signal}));
    root.querySelectorAll<HTMLFormElement>('form').forEach(form=>form.addEventListener('submit',async e=>{
      e.preventDefault();if(pending.size||finished.has(form))return;
      const status=root.querySelector<HTMLElement>(form.id==='lead-form'?'#done':'#q-msg')!;status.hidden=false;
      const data:Record<string,unknown>=Object.fromEntries(new FormData(form));data.message??='';data.plan??='';
      if(!requestIds.has(form))requestIds.set(form,crypto.randomUUID());data.request_id=requestIds.get(form)!;
      const invalid=validateEducationInquiry(data);if(invalid){status.textContent=invalid;form.querySelector<HTMLInputElement>('input:invalid,select:invalid')?.focus();return;}
      pending.add(form);const buttons=root.querySelectorAll<HTMLButtonElement>('button[type=submit]');buttons.forEach(b=>b.disabled=true);status.textContent='수신 확인 중입니다…';
      const formId=form.id==='lead-form'?'education_main':'education_bar';event('education_submit_attempt',formId);
      try{const response=await fetch('/api/education/inquiry/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),signal:AbortSignal.timeout(25000)});const result=await response.json();status.textContent=result.message||'접수 여부를 확인하지 못했습니다. 전화로 문의해 주세요.';
        if(response.ok&&result.ok===true&&typeof result.receiptId==='string'){finished.add(form);form.reset();event('education_lead_success',formId);}
        else if(response.status===502){finished.add(form);}
      }catch{finished.add(form);status.textContent='수신 여부를 확인하지 못했습니다. 중복 신청하지 마시고 전화 또는 이메일로 확인해 주세요.';}
      finally{pending.delete(form);buttons.forEach(b=>b.disabled=finished.has(b.form!));}
    },{signal}));
    return()=>{controller.abort();resize.disconnect();document.body.style.paddingBottom=originalPadding;};
  },[]);
  return null;
}
