import {companyContact,serviceOptions} from '@/data/navigation';
export type ContactPayload={company:string;concern:string;consent:boolean;name?:string;phone?:string;email?:string;service?:string;website?:string;timing?:string;budget?:string};
export type ContactDraft={mode:'draft';subject:string;body:string;mailto:string};
// Pure draft preparation. No network, storage, notification or claim of receipt.
export function prepareContactDraft(payload:ContactPayload):ContactDraft{
 const company=payload.company.trim(),concern=payload.concern.trim();
 if(!company||company.length>100)throw new Error('회사명 또는 브랜드명을 100자 이내로 입력해 주세요.');
 if(concern.length<5||concern.length>1500)throw new Error('문의 내용을 5~1,500자 이내로 입력해 주세요.');
 if(!payload.consent)throw new Error('이메일 전달 안내를 확인해 주세요.');
 if(payload.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim()))throw new Error('회신 이메일 형식을 확인해 주세요.');
 const service=serviceOptions.find(x=>x.value===payload.service)?.label||'서비스 미정 / 종합 상담';
 const subject=`[염원컴퍼니 상담] ${company.replace(/[\r\n]/g,' ')} · ${service}`;
 const body=[`회사·브랜드: ${company}`,`관심 서비스: ${service}`,...[['담당자',payload.name],['전화',payload.phone],['회신 이메일',payload.email],['홈페이지·채널',payload.website],['희망 일정',payload.timing]].filter(([,value])=>value?.trim()).map(([label,value])=>`${label}: ${value!.trim()}`),'', '문의 내용',concern].join('\n');
 return {mode:'draft',subject,body,mailto:`mailto:${companyContact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`};
}
