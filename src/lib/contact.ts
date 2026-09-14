export type ContactPayload={website?:string;company:string;name:string;role:string;phone:string;email:string;brand:string;stores:string;service:string;concern:string;budget:string;timing:string;consent:boolean};
export type ContactResult={mode:'mock';message:string};
// TODO: 실제 접수 전 서버 API, 유효성 검사, 스팸 방어, 개인정보 정책 확정.
// 이 모의 어댑터는 데이터를 저장하거나 네트워크로 전송하지 않습니다.
export async function submitContact(payload:ContactPayload):Promise<ContactResult>{
 if(!payload.company.trim()||!payload.name.trim()||!payload.phone.trim()||!payload.email.trim()||!payload.service||!payload.concern.trim()||!payload.consent)throw new Error('필수 항목과 개인정보 동의를 확인해 주세요.');
 return {mode:'mock',message:'입력 형식을 확인했습니다. 입력하신 내용은 저장·전송되지 않았으며 실제 상담 접수는 이루어지지 않았습니다.'};
}
