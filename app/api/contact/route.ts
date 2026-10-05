import {createHash} from 'node:crypto';
export const runtime='nodejs';
export const maxDuration=30;
const success='상담 신청이 접수되었습니다. 1영업일 안에 연락드리겠습니다.';
const failure='전송에 실패했습니다. 02-6949-6859로 연락 주세요.';
// Per-instance guard. The receiver also enforces a shared limit.
const attempts=new Map<string,{count:number;until:number}>();
const reply=(status:number,message:string)=>Response.json({ok:status===200,message},{status,headers:{'Cache-Control':'no-store'}});
export async function POST(request:Request){
 const url=new URL(request.url);const publicOrigin=`${url.protocol}//${request.headers.get('host')||url.host}`;
 if(request.headers.get('origin')!==publicOrigin)return reply(403,'허용되지 않은 요청입니다.');
 if(!request.headers.get('content-type')?.includes('application/json'))return reply(415,'신청 양식을 확인해 주세요.');
 let data:Record<string,unknown>;
 try{const raw=await request.text();if(raw.length>48000)return reply(413,'입력 내용이 너무 깁니다.');data=JSON.parse(raw);if(!data||typeof data!=='object'||Array.isArray(data))throw new Error();}catch{return reply(400,'신청 양식을 확인해 주세요.');}
 if(data['bot-field'])return reply(200,success);
 if(Object.values(data).some(v=>typeof v!=='string'||v.length>3000))return reply(400,'각 항목은 3,000자 이내로 입력해 주세요.');
 const value=(key:string)=>String(data[key]||'').trim();
 if(!value('company')||!value('name')||!value('phone')||value('agree')!=='동의')return reply(400,'회사명, 담당자명, 연락처와 개인정보 동의를 확인해 주세요.');
 if(!/^[+\d()\s-]{8,20}$/.test(value('phone'))||value('phone').replace(/\D/g,'').length<8)return reply(400,'연락처 형식을 확인해 주세요.');
 if(value('email')&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value('email')))return reply(400,'이메일 형식을 확인해 주세요.');
 const endpoint=process.env.FORM_ENDPOINT;if(!endpoint)return reply(503,failure);
 const now=Date.now();for(const [key,item] of attempts)if(item.until<=now)attempts.delete(key);
 const ip=request.headers.get('x-vercel-forwarded-for')||request.headers.get('x-forwarded-for')||'local';
 const key=createHash('sha256').update(ip.split(',')[0].trim()).digest('hex');
 const item=attempts.get(key)||{count:0,until:now+60000};
 if(item.count>=3)return reply(429,'잠시 후 다시 시도해 주세요. 1분에 최대 3회 신청할 수 있습니다.');
 item.count++;attempts.set(key,item);
 const body=new URLSearchParams();for(const field of ['form-name','page','company','name','phone','email','website','service','sv','plan','message','agree','request_id'])body.set(field,value(field));body.set('rate_key',key);
 try{const upstream=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body,redirect:'follow',cache:'no-store',signal:AbortSignal.timeout(20000)});const result=await upstream.json();if(result?.code==='RATE_LIMIT')return reply(429,'잠시 후 다시 시도해 주세요.');if(!upstream.ok||result?.ok!==true)return reply(502,failure);return reply(200,success);}catch{return reply(502,failure);}
}
