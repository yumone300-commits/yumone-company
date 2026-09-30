export type EducationProduct = {
  id:string; audience:string; target:'SV'|'가맹점주'|'함께'; mode:'offline'|'live'|'vod'|'ebook';
  title:string; benefit:string; description:string; contents:string[]; cta:string;
  status:'inquiry'|'draft'|'coming-soon'|'available'; publicApproved:boolean;
  schedule:string|null; price:number|null; currency:'KRW'; billing:string|null;
  access:string|null; duration:string|null; purchaseUrl:string|null; sampleUrl:string|null;
  contentConfirmed:boolean; deliveryConfirmed:boolean; salesVerified:boolean;
  includedMaterials:string[]; planning?:string;
};
export const educationModes={offline:'오프라인 강의',live:'온라인 실시간',vod:'VOD 강의',ebook:'전자책'} as const;
const pending={price:null,currency:'KRW' as const,billing:null,access:null,duration:null,purchaseUrl:null,sampleUrl:null,contentConfirmed:false,deliveryConfirmed:false,salesVerified:false,includedMaterials:[]};
// Inquiry offerings describe a scope to discuss, not a completed digital product or fixed package.
export const educationProducts:EducationProduct[]=[
  {...pending,id:'offline-sv',audience:'SV·본사 운영팀',target:'SV',mode:'offline',title:'점주에게 신뢰받는 SV 실무 교육',benefit:'점검 내용을 전달하는 데서 끝나지 않고, 점주와 해결 방법을 찾는 SV로.',description:'SV의 역할과 마인드, 점주 소통, 불만 상황 대응을 사례와 역할극으로 연습합니다.',contents:['SV 역할과 가맹점 지원 마인드','점주 상담·경청·불만 대응','방문 후 실행 과제 정리'],cta:'SV 교육 의뢰하기',status:'inquiry',publicApproved:true,schedule:'시간·인원 협의'},
  {...pending,id:'offline-owner',audience:'가맹점주·매장 책임자',target:'가맹점주',mode:'offline',title:'가맹점주 운영·마케팅 실무 교육',benefit:'점주에게 필요한 운영 기준과 우리 매장 홍보 방법을, 현장에 맞게.',description:'가맹점 운영·고객응대 또는 우리 매장 AI 마케팅 중 필요한 주제를 선택해 진행합니다.',contents:['운영·소통: 점주 마인드, 본사와의 협력, 고객응대','마케팅: 매장 온라인 정보 점검, 콘텐츠 기획, AI 홍보물 실습'],cta:'가맹점주 교육 의뢰하기',status:'inquiry',publicApproved:true,schedule:'시간·인원 협의'},
  {...pending,id:'live-sv',audience:'SV·본사 운영팀',target:'SV',mode:'live',title:'SV 점주 소통 실시간 워크숍',benefit:'각 지역의 SV가 함께 접속해, 같은 상황에 어떻게 응대할지 연습합니다.',description:'점주 상담 사례를 함께 살펴보고 역할별 응대와 공통 대응 방식을 토의합니다.',contents:['점주 상담 사례','역할별 응대 연습','공통 대응 방식 토의'],cta:'온라인 SV 교육 상담하기',status:'inquiry',publicApproved:true,schedule:'일정·회차 협의'},
  {...pending,id:'live-owner',audience:'가맹점주·매장 책임자',target:'가맹점주',mode:'live',title:'가맹점주 AI 마케팅 실시간 실습',benefit:'우리 매장을 예시로, 홍보 주제와 콘텐츠 초안을 함께 만들어봅니다.',description:'정해진 시간에 함께 접속해 설명을 듣고 질문하며 실습합니다.',contents:['홍보 주제 선택','AI 문안 작성','콘텐츠 적용 계획'],cta:'온라인 점주 교육 상담하기',status:'inquiry',publicApproved:true,schedule:'일정·회차 협의'},
  // Internal proposals only: never rendered as purchasable or upcoming products without public approval.
  {...pending,id:'vod-sv',audience:'신입 SV·본사 직원',target:'SV',mode:'vod',title:'신입 SV 현장 실무 입문',benefit:'첫 가맹점 방문 전, 무엇을 묻고 어떻게 대화할지부터.',description:'',contents:['SV 역할과 첫 방문 준비','점주에게 먼저 확인할 질문','불만 상황별 대화 예시','방문 내용과 실행 과제 정리'],cta:'강의 구성·가격 보기',status:'draft',publicApproved:false,schedule:null,planning:'8~10개 내외, 90~120분 / VOD와 동일 주제 전자책·워크북 / 1인 90일: 모두 미확정'},
  {...pending,id:'vod-owner',audience:'가맹점주·매장 책임자',target:'가맹점주',mode:'vod',title:'점주를 위한 AI 매장 홍보 실습',benefit:'“오늘 뭘 올리지?”에서 멈추지 않도록, 우리 매장 홍보를 한 단계씩.',description:'',contents:['매장 소개와 홍보 주제 정리','블로그·SNS 홍보 문안 실습','이미지·짧은 영상 기획','일주일 콘텐츠 실행 계획'],cta:'강의 구성·가격 보기',status:'draft',publicApproved:false,schedule:null,planning:'10개 내외, 120분 안팎 / VOD와 동일 주제 전자책·워크북 / 1인 90일: 모두 미확정'},
  {...pending,id:'ebook-sv',audience:'SV·본사 직원',target:'SV',mode:'ebook',title:'점주 상담이 막힐 때 꺼내 보는 SV 대화법',benefit:'점주 상담이 막힐 때, 바로 참고할 질문과 대화 예시.',description:'',contents:['상황별 질문','대화 예시','방문 체크리스트'],cta:'목차·가격 보기',status:'draft',publicApproved:false,schedule:null},
  {...pending,id:'ebook-owner',audience:'가맹점주·매장 책임자',target:'가맹점주',mode:'ebook',title:'우리 매장 AI 홍보문 작성 가이드',benefit:'메뉴와 매장 특징을 넣어, 우리 가게 홍보문을 만드는 가이드.',description:'',contents:['매장 소개문·행사 안내·SNS 문안 예시','AI 입력문','게시 전 체크리스트'],cta:'목차·가격 보기',status:'draft',publicApproved:false,schedule:null},
];
export const groupEducationPlan='본사 단체 교육';
export const inquiryProducts=educationProducts.filter(p=>p.status==='inquiry'&&p.publicApproved);
export const productPlan=(p:EducationProduct)=>`${p.title} · ${educationModes[p.mode]}`;
export function verifiedHttpsUrl(value:string|null):boolean {
  if(!value)return false;
  try{const url=new URL(value);return url.protocol==='https:'&&!url.username&&!url.password;}catch{return false;}
}
export function canPurchase(p:EducationProduct):boolean {
  return (p.mode==='vod'||p.mode==='ebook')&&p.status==='available'&&p.publicApproved&&p.contentConfirmed&&p.deliveryConfirmed&&p.salesVerified&&p.price!==null&&Number.isFinite(p.price)&&p.price>=0&&!!p.billing?.trim()&&!!p.access?.trim()&&!!p.contents.length&&verifiedHttpsUrl(p.purchaseUrl)&&(p.mode!=='vod'||!!p.duration?.trim());
}
