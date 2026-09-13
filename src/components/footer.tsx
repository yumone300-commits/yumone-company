import styles from './footer.module.css';
import Link from 'next/link';
import {Logo} from './header';
import {Container} from './ui';
import {site,nav} from '@/data/site';
export function Footer(){return <footer className={`footer ${styles.footer}`}><Container><div className="footer-top"><div><Logo official/><p>사람과 브랜드의 성장을 잇는<br/>프랜차이즈 성장 파트너</p></div><nav aria-label="하단 메뉴">{nav.map(n=><Link key={n.href} href={n.href}>{n.label}</Link>)}<Link href="/contact">상담문의</Link></nav></div><div className="footer-info"><span>회사명 {site.name}</span><span>대표 {site.ceo}</span>{site.address&&<span>{site.address}</span>}{site.phone&&<span>{site.phone}</span>}{site.email&&<span>{site.email}</span>}{site.businessNumber&&<span>사업자등록번호 {site.businessNumber}</span>}</div><div className="footer-bottom"><small>© {new Date().getFullYear()} YUMONE COMPANY. All rights reserved.</small><div><Link href="/privacy">개인정보처리방침</Link><Link href="/terms">이용약관</Link></div></div></Container></footer>}
