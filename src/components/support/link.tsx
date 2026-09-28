'use client';
import Link, {useLinkStatus} from 'next/link';
import type {ComponentProps} from 'react';
import s from './support.module.css';

function Pending() {
  const {pending}=useLinkStatus();
  return pending?<span className={s.loading} role="status">고객지원 정보를 불러오는 중입니다.</span>:null;
}
export function SupportLink({children,...props}:ComponentProps<typeof Link>) {
  return <Link {...props}>{children}<Pending/></Link>;
}
