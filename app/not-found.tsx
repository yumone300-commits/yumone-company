import {Container,Button} from '@/components/ui';
export default function NotFound(){return <Container><section className="section"><p className="eyebrow">404 / PAGE NOT FOUND</p><h1>페이지를 찾을 수 없습니다.</h1><p className="muted">주소를 확인하거나 홈페이지에서 필요한 정보를 찾아보세요.</p><div className="button-row"><Button href="/">홈으로</Button><Button secondary href="/contact">상담 문의</Button></div></section></Container>}
