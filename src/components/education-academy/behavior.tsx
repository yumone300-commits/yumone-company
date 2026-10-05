'use client';
import {useEffect} from 'react';
import {bindInquiryForm,fillSourceFields,pushDataLayer} from '@/components/education-academy/inquiry-submit';
export function EducationBehavior(){
  useEffect(()=>{
    const root=document.getElementById('education-landing');if(!root)return;
    const controller=new AbortController();const signal=controller.signal;
    const event=(name:string,formId:string)=>pushDataLayer({event:name,form_id:formId});
    root.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{const value=root.querySelector('#'+button.dataset.copy)?.textContent||'';try{await navigator.clipboard.writeText(value);button.textContent='복사됨';}catch{button.textContent='복사 실패 — 직접 선택해 주세요';}},{signal}));
    root.querySelectorAll<HTMLElement>('[data-cta]').forEach(link=>link.addEventListener('click',()=>{if(link instanceof HTMLButtonElement&&link.type==='submit')return;event('education_cta_click',link.dataset.cta||'education');},{signal}));
    root.querySelectorAll<HTMLAnchorElement>('[data-education-plan]').forEach(link=>link.addEventListener('click',()=>{
      const selections:Record<string,string|undefined>={'#f-plan':link.dataset.educationPlan,'#f-target':link.dataset.educationTarget,'#f-delivery':link.dataset.educationMode};
      for(const [selector,value] of Object.entries(selections)){const select=root.querySelector<HTMLSelectElement>(selector);if(select&&value){select.value=value;select.dispatchEvent(new Event('change',{bubbles:true}));}}
      root.querySelector<HTMLSelectElement>('#f-plan')?.focus({preventScroll:true});
    },{signal}));
    const form=root.querySelector<HTMLFormElement>('#lead-form'),status=root.querySelector<HTMLElement>('#done');
    if(form&&status){fillSourceFields(form);bindInquiryForm(form,status,signal,{attempt:()=>event('education_submit_attempt','education_main'),success:()=>event('education_lead_success','education_main')});}
    return()=>controller.abort();
  },[]);
  return null;
}
