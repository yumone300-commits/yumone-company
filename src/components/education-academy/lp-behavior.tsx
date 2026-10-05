'use client';
import {useEffect} from 'react';
import {bindInquiryForm,fillSourceFields,pushDataLayer} from '@/components/education-academy/inquiry-submit';

// GTM events: lp_cta_click, lp_format_select (A/B/C), lp_form_submit (confirmed receipt only).
export function SvAcademyLpBehavior(){
  useEffect(()=>{
    const root=document.getElementById('education-landing');if(!root)return;
    const controller=new AbortController();const signal=controller.signal;
    const form=root.querySelector<HTMLFormElement>('#lp-form'),status=root.querySelector<HTMLElement>('#lp-done');
    root.querySelectorAll<HTMLElement>('[data-lp-cta]').forEach(link=>link.addEventListener('click',()=>pushDataLayer({event:'lp_cta_click',lp_page:'sv-academy',cta_id:link.dataset.lpCta||''}),{signal}));
    root.querySelectorAll<HTMLButtonElement>('[data-format]').forEach(card=>card.addEventListener('click',()=>{
      const radio=[...root.querySelectorAll<HTMLInputElement>('input[name="format"]')].find(r=>r.value===card.dataset.formatValue);
      if(radio)radio.checked=true;
      pushDataLayer({event:'lp_format_select',lp_page:'sv-academy',format:card.dataset.format||''});
      root.querySelector('#lp-apply')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
      root.querySelector<HTMLInputElement>('#lp-company')?.focus({preventScroll:true});
    },{signal}));
    // Mobile sticky button: hidden while the hero button or the form is on screen.
    const sticky=root.querySelector<HTMLElement>('.lp-sticky');
    const watched=[root.querySelector('.lp-hero .btn'),root.querySelector('#lp-apply')].filter((e):e is Element=>!!e);
    const visible=new Map<Element,boolean>();
    const observer=new IntersectionObserver(entries=>{entries.forEach(e=>visible.set(e.target,e.isIntersecting));if(sticky)sticky.hidden=[...visible.values()].some(Boolean);},{threshold:0});
    watched.forEach(e=>observer.observe(e));
    if(form&&status){
      fillSourceFields(form);
      bindInquiryForm(form,status,signal,{success:data=>{const key=String(data.format||'').charAt(0);pushDataLayer({event:'lp_form_submit',lp_page:'sv-academy',format:['A','B','C'].includes(key)?key:'미정'});}});
    }
    return()=>{controller.abort();observer.disconnect();};
  },[]);
  return null;
}
