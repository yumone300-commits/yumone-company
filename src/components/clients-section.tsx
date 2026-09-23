import Image from 'next/image';
import Link from 'next/link';
import {clients} from '@/data/clients';
import s from './clients-section.module.css';

export function ClientsSection({withCTA = true}: {withCTA?: boolean}) {
  return <section id="clients" className={s.section} aria-labelledby="clients-title">
    <div className={s.container}>
      <header className={s.heading}>
        <p className={s.eyebrow}>OUR CLIENTS</p>
        <h2 id="clients-title">함께한 고객사</h2>
        <p className={s.description}>브랜드를 성장시키는 마케팅,<br/>사람을 성장시키는 교육.<br/>염원컴퍼니가 다양한 브랜드와 함께합니다.</p>
      </header>
      <ul className={s.grid} aria-label="함께한 고객사 로고">
        {clients.map(client => <li key={client.src} className={s.logo}>
          <Image src={client.src} alt={client.name} width={client.width} height={client.height} style={{width: client.displayWidth}} sizes="(max-width: 760px) 40vw, 190px" loading="lazy"/>
        </li>)}
      </ul>
      {withCTA && <div className={s.cta}>
        <div><h3>우리 브랜드의 다음 성장,<br/>염원컴퍼니와 함께 시작하세요.</h3><p>마케팅부터 본사·가맹점 교육까지,<br/>브랜드의 현재 상황에 맞는 실행 방향을 함께 찾습니다.</p></div>
        <Link className={s.button} href="/contact/">마케팅·교육 상담하기 <span aria-hidden="true">→</span></Link>
      </div>}
    </div>
  </section>;
}
