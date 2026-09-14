import {navigation,companyContact} from './navigation';
export const site = {
  name: '염원컴퍼니', englishName: 'YUMONE COMPANY', ceo: '염혜단',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yumone-company-db74.vercel.app',
  description: '20년 프랜차이즈 현장 경험을 바탕으로 마케팅, 본사·SV·가맹점주 교육, AI 검색을 연결하는 성장 파트너 염원컴퍼니입니다.',
  // TODO: 실제 운영 정보 확인 후 입력. 비어 있는 정보는 화면 및 구조화 데이터에서 제외합니다.
  phone: companyContact.phone, email: companyContact.email, address: companyContact.address, businessNumber: '', logo: '', ceoPhoto: '/images/yeom-hyedan.jpg',
  privacyOfficer: '', retentionPeriod: '', careers: [] as string[], achievements: [] as string[],
};
export const nav = navigation.map(g=>({label:g.title,href:g.href}));
// 아래 수치는 사용자 제공 브리프 기준. 공개 전 증빙 확인 필요.
export const stats = [{value:'20년+',label:'프랜차이즈 실무 경험'},{value:'200+',label:'자영업자 컨설팅'},{value:'900+',label:'가맹점주 교육 경험'},{value:'다수',label:'프랜차이즈 본사·기관 교육'}];
export const problems = ['광고비가 늘어도 가맹 문의가 정체되어 있습니다.','문의는 들어오지만 실제 계약으로 이어지지 않습니다.','ChatGPT에서 경쟁 브랜드만 추천됩니다.','홈페이지는 있지만 브랜드의 강점이 보이지 않습니다.','본사와 가맹점의 마케팅이 따로 움직입니다.','마케팅 성과를 무엇으로 측정해야 할지 모르겠습니다.'];
export const values = ['20년+ 프랜차이즈 실무','검증된 마케팅 전략','현장 중심 교육','AI 시대의 성장 전략'];
export const images = {strategy:'/images/service-strategy.jpg',consulting:'/images/service-consulting.jpg',building:'/images/building.webp',marketing:'/images/marketing.webp',education:'/images/education.webp'};
