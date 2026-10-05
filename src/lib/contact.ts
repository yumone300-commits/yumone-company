export type ContactPayload={website?:string;company:string;name:string;phone:string;email?:string;stores?:string;service?:string;concern?:string;budget?:string;timing?:string;consent:boolean;'bot-field'?:string};
export type ContactResult={message:string;requestId:string;receiptId:string;notification:'sent'|'failed'|'unknown'};
export async function sendInquiry(data:Record<string,string>):Promise<ContactResult>{
 const failure=()=>new Error('전송에 실패했습니다. 02-6949-6859로 연락 주세요.');
 const response=await fetch('/api/contact/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),signal:AbortSignal.timeout(65000)}).catch(()=>{throw new Error('접수 확인 응답을 받지 못했습니다. 입력 내용을 유지한 채 다시 시도해 주세요. 같은 접수번호로 중복 저장을 방지합니다.');});
 const result=await response.json().catch(()=>{throw failure();});
 if(!response.ok||result.ok!==true)throw new Error(result.message||'전송에 실패했습니다. 02-6949-6859로 연락 주세요.');
 if(result.requestId!==data.request_id||result.receiptId!==data.request_id)throw failure();
 (window.dataLayer??=[]).push({event:'lead_submit',form_id:data['form-name']});
 return result;
}
export async function submitContact(payload:ContactPayload,requestId=crypto.randomUUID()):Promise<ContactResult>{
 return sendInquiry({'form-name':'contact',page:location.pathname,company:payload.company,name:payload.name,phone:payload.phone,email:payload.email||'',website:payload.website||'',service:payload.service||'',message:[payload.concern||'',payload.stores&&`가맹점 수: ${payload.stores}`,payload.budget&&`예산: ${payload.budget}`,payload.timing&&`희망 시기: ${payload.timing}`].filter(Boolean).join('\n'),agree:payload.consent?'동의':'','bot-field':payload['bot-field']||'',request_id:requestId});
}
