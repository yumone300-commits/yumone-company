'use client';
import {useEffect,useRef,useState} from 'react';
import Script from 'next/script';
import {usePathname} from 'next/navigation';
import {createPageTracker} from '@/lib/analytics-tracker';

declare global {interface Window {gtag?:(...args:unknown[])=>void;dataLayer?:unknown[];}}
export function AnalyticsPageView({id,origin,pages}:{id:string;origin:string;pages:Record<string,string>}) {
 const pathname=usePathname();
 const [ready,setReady]=useState(false);
 const initialized=useRef(false);
 const tracker=useRef<ReturnType<typeof createPageTracker>|null>(null);
 function initialize() {
  if(initialized.current||window.location.origin!==origin)return;
  initialized.current=true;
  window.dataLayer=window.dataLayer||[];
  window.gtag=window.gtag||function(){window.dataLayer!.push(arguments)};
  window.gtag('js',new Date());
  window.gtag('config',id,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,page_location:origin+'/',page_referrer:''});
  setReady(true);
 }
 useEffect(()=>{
  if(!ready||!window.gtag||window.location.origin!==origin)return;
  if(!tracker.current)tracker.current=createPageTracker(origin,pages,event=>window.gtag?.('event','page_view',event));
  tracker.current(pathname);
 },[pathname,origin,pages,ready]);
 return <Script id="yumone-ga4-library" strategy="afterInteractive" src={'https://www.googletagmanager.com/gtag/js?id='+id} onReady={initialize}/>;
}
