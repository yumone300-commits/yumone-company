import {confirmedReceipt,validateEducationInquiry,educationInquiryMessage} from '@/lib/education-inquiry';
const endpoint='https://script.google.com/macros/s/AKfycbxrg9_BgWgYN5vYiQ92LXaB16icSR2tOCeOmSCRrfp7VUmQQ_uSQFF2a7-mcLOUY_gXsw/exec';
export const runtime='nodejs';
export const maxDuration=30;
const reply=(status:number,message:string,receiptId?:string)=>Response.json({ok:status===200,message,...(receiptId?{receiptId}:{})},{status,headers:{'Cache-Control':'no-store'}});
export async function POST(request:Request){
  if(request.headers.get('origin')!==new URL(request.url).origin)return reply(403,'허용되지 않은 요청입니다.');
  if(!request.headers.get('content-type')?.includes('application/json'))return reply(415,'신청 양식을 확인해 주세요.');
  if(Number(request.headers.get('content-length')||0)>16000)return reply(413,'입력 내용이 너무 깁니다.');
  let data:Record<string,unknown>;
  try{const raw=await request.text();if(raw.length>12000)return reply(413,'입력 내용이 너무 깁니다.');data=JSON.parse(raw);if(!data||typeof data!=='object'||Array.isArray(data))throw new Error();}catch{return reply(400,'신청 양식을 확인해 주세요.');}
  if(data['bot-field'])return reply(400,'신청 양식을 확인해 주세요.');
  const invalid=validateEducationInquiry(data);if(invalid)return reply(400,invalid);
  // The supplied receiver currently fails to open its sheet. Enable only after
  // correcting it and verifying durable storage + receiptId/requestId response.
  if(process.env.EDUCATION_RECEIVER_VERIFIED!=='true')return reply(503,'현재 온라인 접수가 연결되지 않았습니다. 입력 내용은 전송되지 않았습니다. 02-6949-6859 또는 yumone300@gmail.com으로 문의해 주세요.');
  const body=new URLSearchParams();for(const key of ['form-name','company','name','phone','sv','plan','message','agree','request_id'])body.set(key,String(data[key]||''));
  body.set('message',educationInquiryMessage(data));
  try{
    const response=await fetch(endpoint,{method:'POST',body,signal:AbortSignal.timeout(20000),cache:'no-store'});
    const result:unknown=await response.json();
    if(!response.ok||!confirmedReceipt(result,String(data.request_id)))return reply(502,'수신 확인을 받지 못했습니다. 중복 신청하지 마시고 전화 또는 이메일로 접수 여부를 확인해 주세요.');
    return reply(200,'교육 상담 신청이 접수되었습니다.',result.receiptId);
  }catch{return reply(502,'수신 여부를 확인하지 못했습니다. 입력 내용을 유지했습니다. 전화 또는 이메일로 접수 여부를 확인해 주세요.');}
}
