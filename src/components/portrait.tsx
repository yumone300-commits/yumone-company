import Image from 'next/image';
import {Users} from 'lucide-react';
import {site} from '@/data/site';

export function Portrait({cutout=false,src}:{cutout?:boolean;src?:string}={}){return <div className="portrait-slot" data-cutout={cutout||undefined}>{(src||site.ceoPhoto)?<Image src={src||(cutout?'/images/yeom-hyedan-cutout.png':site.ceoPhoto)} alt="염원컴퍼니 염혜단 대표" fill sizes="(max-width: 600px) 100vw, 500px" style={{objectFit:'contain',objectPosition:'center top'}}/>:<><Users size={56} strokeWidth={1}/><span>대표 사진 준비 중</span></>}</div>}
