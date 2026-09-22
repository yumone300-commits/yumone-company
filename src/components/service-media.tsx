'use client';
import Image from 'next/image';
import Link from 'next/link';
import {useEffect,useRef,useState,useSyncExternalStore} from 'react';
import {ArrowRight,Plus,X,ExternalLink,Check} from 'lucide-react';
import {contactHref} from '@/data/navigation';
import {publishableAssets,type MediaSection,type ServiceAsset} from '@/data/service-media';
import s from './service-media.module.css';
const subscribe=()=>()=>{};
const isLocal=()=>['localhost','127.0.0.1','[::1]'].includes(window.location.hostname);

function Asset({asset}:{asset:ServiceAsset}) {
 const dialog=useRef<HTMLDialogElement>(null);const trigger=useRef<HTMLButtonElement>(null);
 const [failed,setFailed]=useState(false);const [zoom,setZoom]=useState(false);const [open,setOpen]=useState(false);
 useEffect(()=>{if(!open)return;const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=previous}},[open]);
 function close(){dialog.current?.close();setOpen(false);setZoom(false);trigger.current?.focus()}
 if(failed)return null;
 return <figure className={s.asset}>
  <span className={s.classification}>{asset.classification}</span>
  {asset.kind==='video'?<video controls playsInline preload="none" poster={asset.poster} width={asset.width} height={asset.height} aria-label={asset.alt} onError={()=>setFailed(true)}><source src={asset.src}/><p>이 브라우저에서는 영상을 재생할 수 없습니다.</p></video>:asset.kind==='external'?<a href={asset.href} target="_blank" rel="noopener noreferrer" className={s.external}><Image src={asset.src} width={asset.width} height={asset.height} alt={asset.alt} loading="lazy" sizes="(max-width:760px) 90vw, 640px" onError={()=>setFailed(true)}/><span>{asset.linkLabel||'원본 콘텐츠 보기'} <ExternalLink size={17}/></span></a>:<button ref={trigger} type="button" className={s.imageButton} aria-label={`${asset.caption} 확대`} onClick={()=>{dialog.current?.showModal();setOpen(true)}}><Image src={asset.src} width={asset.width} height={asset.height} alt={asset.alt} loading="lazy" sizes="(max-width:760px) 90vw, 640px" onError={()=>setFailed(true)}/><span><Plus size={16}/> 화면 확대</span></button>}
  <figcaption>{asset.caption}<small>출처: {asset.source}</small>{asset.href&&asset.kind!=='external'&&<a href={asset.href} target="_blank" rel="noopener noreferrer">원본 게시물 보기 ↗</a>}</figcaption>
  {asset.kind==='image'&&<dialog ref={dialog} className={s.dialog} aria-label={`${asset.caption} 확대 보기`} onCancel={e=>{e.preventDefault();close()}} onClick={e=>{if(e.target===e.currentTarget)close()}}><div className={s.dialogPanel}><div className={s.dialogHeader}><p>{asset.caption}</p><button type="button" onClick={()=>setZoom(!zoom)}>{zoom?'화면에 맞추기':'원본 크기로 보기'}</button><button type="button" aria-label="확대 화면 닫기" onClick={close}><X size={24}/></button></div><div className={`${s.zoomArea} ${zoom?s.zoomed:''}`}><Image src={asset.original||asset.src} alt={asset.alt} width={asset.width} height={asset.height} unoptimized/></div></div></dialog>}
 </figure>;
}

export function ServiceMediaSections({sections}:{sections:MediaSection[]}){
 const local=useSyncExternalStore(subscribe,isLocal,()=>false);
 return <div className={s.sections}>{sections.map(section=>{const assets=publishableAssets(section).slice(0,2);return <section key={section.id} id={section.id} className={`${s.section} ${assets.length||local?'':s.textOnly}`} aria-labelledby={`${section.id}-title`}>
 <div className={s.inner}>
  <div className={s.copy}><p className={s.eyebrow}>{section.label}</p><h2 id={`${section.id}-title`}>{section.title}</h2><p className={s.description}>{section.description}</p></div>
  {(assets.length>0||local)&&<div className={`${s.media} ${s[section.format]}`}>{assets.length?assets.map(asset=><Asset asset={asset} key={asset.id}/>):<aside className={s.gap}><span>로컬 검토 전용 · 공개 화면에는 표시되지 않습니다</span><strong>이 위치에 연결할 실제 자료</strong><ul>{section.captureList.map(item=><li key={item}>{item}</li>)}</ul><p>원본 화면·공개 동의·수행 주체 확인 후 등록합니다. 가상 플랫폼 화면으로 대체하지 않습니다.</p></aside>}</div>}
  <div className={s.actions}>{section.channel&&<a className={s.channelLink} href={section.channel.href} target="_blank" rel="noopener noreferrer">{section.channel.label} <ExternalLink size={16}/></a>}<ul>{section.tasks.map(task=><li key={task}><Check size={18}/>{task}</li>)}</ul><Link className={s.cta} href={contactHref('content')}>{section.cta}<ArrowRight size={18}/></Link><p>현재 계정 주소와 필요한 업무부터 알려주세요.</p></div>
 </div></section>})}</div>
}

