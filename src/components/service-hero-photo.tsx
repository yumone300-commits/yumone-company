import Image from 'next/image';
import type {CSSProperties} from 'react';
import {serviceHeroPhotos} from '@/data/service-hero-photos';
import s from './service-hero-photo.module.css';

export function ServiceHeroPhoto({href}: {href:string}) {
  const photo=serviceHeroPhotos[href];
  if(!photo) return null;
  return <figure className={s.figure} data-service-hero-photo style={{'--focus':photo.focus,'--mobile-focus':photo.mobileFocus} as CSSProperties}>
    <div className={s.frame}>
      <Image src={photo.src} alt={photo.alt} width={1200} height={800} sizes="(max-width:760px) 100vw, (max-width:1100px) 50vw, 660px" priority className={s.image}/>
    </div>
    <figcaption className={s.caption}>서비스 이해를 위한 AI 생성 이미지</figcaption>
  </figure>;
}
