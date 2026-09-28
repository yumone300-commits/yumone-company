import s from '@/components/support/support.module.css';
import {fixtureEnabled} from '@/lib/support/notion';
export default function SupportLayout({children}:{children:React.ReactNode}){return <div className={s.page}>{fixtureEnabled()&&<aside className={s.note} role="status">기능 검수용 테스트 데이터입니다. 실제 공지·자료 또는 운영 접수가 아닙니다.</aside>}{children}</div>}
