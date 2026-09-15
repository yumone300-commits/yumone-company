import {type NavigationGroup,type NavigationItem} from '@/data/navigation';
import s from './sitemap-page.module.css';

export function NumberedGrid({items}:{items:{title:string;description:string}[]}){return <div className={s.numberedGrid}>{items.map((item,i)=><div key={item.title}><span>{String(i+1).padStart(2,'0')}</span><h3>{item.title}</h3><p>{item.description}</p></div>)}</div>}

export function RecruitChallenges({group,detail}:{group:NavigationGroup;detail:NavigationItem}){const titles=['노출에서 멈춥니다.','문의 흐름을 점검합니다.','상담으로 이어져야 합니다.','본사와 현장을 연결합니다.'];return <section className={s.section}><div className={s.container}><p className={s.eyebrow}>WHY IT STALLS</p><h2>가맹 상담이 멈추는 지점부터<br/>확인합니다.</h2><NumberedGrid items={[detail.problem!,...group.problems].map((description,i)=>({title:titles[i]||'실행 과제를 확인합니다.',description}))}/><p className={s.closingNote}>브랜드의 현재 상황을 확인하고, 문의에서 상담까지 필요한 실행 범위를 정합니다.</p></div></section>}
