const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');
const payload={'form-name':'education-main',company:'오류 점검용 테스트',name:'가상 담당자',phone:'00000000000',agree:'동의',request_id:'test-receipt-20261005'};
let upstream,calls=0;
const exportsRoute={};
const env={FORM_ENDPOINT:'https://receiver.invalid/exec'};
const code=ts.transpileModule(fs.readFileSync('app/api/contact/route.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
vm.runInNewContext(code,{exports:exportsRoute,require,Response,Request,URL,URLSearchParams,AbortSignal,Map,Date,process:{env},console:{error(){}},fetch:async(_url,options)=>{calls++;assert.equal(options.body.get('agree'),'동의');return upstream();}});
let seq=0;
async function post(data=payload,origin='https://test.invalid'){
 return exportsRoute.POST(new Request('https://test.invalid/api/contact/',{method:'POST',headers:{origin,'content-type':'application/json','x-forwarded-for':String(++seq)},body:JSON.stringify(data)}));
}
(async()=>{
 for(const data of [{...payload,company:''},{...payload,agree:''},{...payload,phone:'abc'},{...payload,request_id:''},{...payload,'bot-field':'bot'}])assert.equal((await post(data)).status,400);
 assert.equal((await post(payload,'https://other.invalid')).status,403);assert.equal(calls,0);
 delete env.FORM_ENDPOINT;assert.equal((await post()).status,503);env.FORM_ENDPOINT='https://receiver.invalid/exec';
 for(const result of [{ok:true},{ok:true,requestId:'wrong',receiptId:'wrong'},{ok:false,code:'STORAGE_ERROR'}]){upstream=()=>Response.json(result);assert.equal((await post()).status,502);}
 upstream=()=>new Response('<html>login</html>');assert.equal((await post()).status,502);
 upstream=()=>{throw new Error('timeout');};assert.equal((await post()).status,502);
 for(const notification of ['sent','failed']){upstream=()=>Response.json({ok:true,requestId:payload.request_id,receiptId:payload.request_id,notification});const r=await post();assert.equal(r.status,200);assert.equal((await r.json()).notification,notification);}
 // Execute the real Apps Script receiver with an in-memory sheet and failing mail/status services.
 let rows=[],mailFails=false,statusFails=false,mailCount=0;
 const sheet={getLastRow:()=>rows.length+1,appendRow:r=>rows.push(r),getRange:(row,col)=>({createTextFinder:id=>({matchEntireCell:()=>({findNext:()=>{let i=rows.findIndex(r=>r[13]===id);return i<0?null:{getRow:()=>i+2};}})}),getValue:()=>rows[row-2][col-1],setValue:v=>{if(statusFails)throw Error('status');rows[row-2][col-1]=v;},getValues:()=>[rows[row-2].slice(0,13)]})};
 const gas={SpreadsheetApp:{openById:()=>({getSheetByName:()=>sheet}),flush(){}},LockService:{getScriptLock:()=>({tryLock:()=>true,releaseLock(){}})},CacheService:{getScriptCache:()=>({get:()=>null,put(){}})},Utilities:{getUuid:()=>payload.request_id,formatDate:()=> '2026-10-05 00:00:00'},MailApp:{sendEmail(){mailCount++;if(mailFails)throw Error('mail');}},ContentService:{MimeType:{JSON:'json'},createTextOutput:text=>({setMimeType:()=>JSON.parse(text)})}};
 vm.createContext(gas);vm.runInContext(fs.readFileSync('scripts/contact-receiver.gs','utf8'),gas);
 assert.equal(gas.doPost({parameter:payload}).notification,'sent');assert.equal(rows.length,1);
 assert.equal(gas.doPost({parameter:payload}).ok,true);assert.equal(rows.length,1);assert.equal(mailCount,1);
 mailFails=true;statusFails=true;const r=gas.doPost({parameter:{...payload,request_id:'test-receipt-20261005-second'}});assert.equal(r.ok,true);assert.equal(r.notification,'failed');assert.equal(rows.length,2);
 assert.equal(gas.doPost({parameter:{...payload,agree:''}}).code,'INVALID');
 console.log('PASS: required/optional fields, consent, origin, missing endpoint, invalid/HTML/timeout responses, matching receipt, saved-but-mail-failed, duplicate receipt and status-write failure');
})();
