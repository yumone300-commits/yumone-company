'use client';
import {SupportLink as Link} from './link';
import {usePathname} from 'next/navigation';
import s from './support.module.css';
export function SupportNavigation(){const path=usePathname();return <nav aria-label="고객지원 메뉴" className={s.tabs}>{[['공지사항','notices'],['자주 묻는 질문','faq'],['무료 자료실','resources'],['1:1 문의','inquiry']].map(([name,key])=><Link key={key} href={`/support/${key}/`} aria-current={path.startsWith('/support/'+key)?'page':undefined}>{name}</Link>)}</nav>}
