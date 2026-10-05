'use client';
import {useRouter} from 'next/navigation';
import {useTransition} from 'react';
import s from './support.module.css';
export function Retry(){const router=useRouter();const [pending,start]=useTransition();return <button type="button" className={s.button} disabled={pending} onClick={()=>start(()=>router.refresh())}>{pending?'다시 불러오는 중…':'다시 시도'}</button>}
