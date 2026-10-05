import {inquiryPlans} from '@/data/education-products';
export const groupSizes=['1~3명','4~10명','11~30명','30명 이상','미정'];
export const educationPlans=inquiryPlans;
// Education formats offered on the SV academy ad landing page (/lp/sv-academy/).
export const lpFormats=['A. 반일 특강 (3시간)','B. 1일 실무 과정 (6시간, 역할극 포함)','C. 연간 교육 파트너십 (분기 1회)','미정'];
export const sourcePages=['education','sv-academy'];
const trackingKeys=['utm_source','utm_medium','utm_campaign'] as const;
export function validateEducationInquiry(data:Record<string,unknown>):string|null {
  for(const key of ['company','name'])if(typeof data[key]!=='string'||!(data[key] as string).trim()||(data[key] as string).length>100)return '본사명과 담당자 성함을 확인해 주세요.';
  if(typeof data.phone!=='string'||!/^[\d+() -]{8,20}$/.test(data.phone)||data.phone.replace(/\D/g,'').length<8)return '연락처를 확인해 주세요.';
  if(data.sv&&!groupSizes.includes(String(data.sv)))return '교육 인원을 선택해 주세요.';
  if(data['form-name']==='consult-main'&&data.target&&!['SV','가맹점주','함께'].includes(String(data.target)))return '교육 대상을 선택해 주세요.';
  if(data['form-name']==='consult-lp'&&data.format&&!lpFormats.includes(String(data.format)))return '원하는 교육 형태를 선택해 주세요.';
  if(data.delivery&&!['오프라인 강의','온라인 실시간','상담 후 결정'].includes(String(data.delivery)))return '진행 방식을 확인해 주세요.';
  if(data.plan&&!educationPlans.includes(String(data.plan)))return '관심 있는 교육 방식을 확인해 주세요.';
  if(data.agree!=='동의')return '개인정보 수집·이용에 동의해 주세요.';
  if(typeof data.message!=='string'||data.message.length>3000)return '문의 내용은 3,000자 이내로 입력해 주세요.';
  if(!['consult-main','consult-lp'].includes(String(data['form-name'])))return '신청 양식을 확인해 주세요.';
  if(!sourcePages.includes(String(data.source_page)))return '신청 양식을 확인해 주세요.';
  for(const key of trackingKeys)if(data[key]!==undefined&&(typeof data[key]!=='string'||(data[key] as string).length>100))return '신청 양식을 확인해 주세요.';
  if(typeof data.request_id!=='string'||!/^[a-zA-Z0-9-]{16,80}$/.test(data.request_id))return '신청 식별자를 확인해 주세요.';
  return null;
}
// Preserve the receiver's existing field contract; include new choices in its message field.
export function educationInquiryMessage(data:Record<string,unknown>):string {
  const utm=trackingKeys.map(key=>data[key]?`${key}=${data[key]}`:'').filter(Boolean).join(', ');
  return [`유입 페이지: ${data.source_page}`,utm?`UTM: ${utm}`:'',data.format?`원하는 교육 형태: ${data.format}`:'',data.target?`교육 대상: ${data.target}`:'',data.delivery?`진행 방식: ${data.delivery}`:'',String(data.message||'')].filter(Boolean).join('\n');
}
// HTTP 200, an opaque response, or a GET health check is not proof of receipt.
export function confirmedReceipt(data:unknown,requestId:string):data is {ok:true;receiptId:string;requestId:string} {
  if(!data||typeof data!=='object')return false;
  const r=data as Record<string,unknown>;
  return r.ok===true&&r.requestId===requestId&&typeof r.receiptId==='string'&&r.receiptId.length>0&&r.receiptId.length<160;
}
