import {Network,MessagesSquare,Presentation,Laptop,ScanSearch,Store,ClipboardCheck,BookOpen} from 'lucide-react';
import styles from './home-visual.module.css';

export function HomeVisual({kind,index,label}:{kind:'case'|'education'|'insight';index:number;label:string}){
  const Icon=(kind==='education'?[MessagesSquare,Presentation,Laptop,ScanSearch]:kind==='case'?[Network,Store,BookOpen,ScanSearch]:[Network,ScanSearch,BookOpen,ClipboardCheck])[index%4];
  return <div className={`${styles.visual} ${styles[kind]}`} data-variant={index%4}>
    <span className={styles.number}>0{index+1}</span><Icon aria-hidden="true" strokeWidth={1.2}/><strong>{label}</strong>
    {kind!=='insight'&&<small>{kind==='case'?'실제 프로젝트 이미지 준비 중':'실제 교육 현장 사진 준비 중'}</small>}
  </div>;
}
