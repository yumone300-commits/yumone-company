// Deploy as the existing web app. Set SPREADSHEET_ID to the private inquiry sheet.
const SPREADSHEET_ID = '1UoeLQ4MIzhZowJcbsWTViTUgnwKiYJGQc2DmdSEI7XQ';
const SHEET_NAME = '상담신청_통합';
const NOTIFY_EMAIL = 'yumone300@gmail.com';
const HEADERS = ['접수일시','신청 위치','페이지','회사·브랜드명','담당자','연락처','이메일','홈페이지','관심 서비스','SV 인원','관심 방식','문의 내용','개인정보 동의','접수 ID','메일 발송 상태'];
function doPost(e) {
 const p=(e&&e.parameter)||{};
 if(p['bot-field'])return json_({ok:true});
 if(!p.company||!p.name||!p.phone||p.agree!=='동의')return json_({ok:false,code:'INVALID'});
 if(Object.keys(p).some(k=>String(p[k]).length>3000))return json_({ok:false,code:'INVALID'});
 const lock=LockService.getScriptLock();lock.waitLock(10000);
 try {
  const sh=SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  if(!sh)throw new Error('상담 시트가 없습니다.');
  const id=/^[a-zA-Z0-9-]{16,80}$/.test(p.request_id||'')?p.request_id:Utilities.getUuid();
  let rowIndex=0;
  if(sh.getLastRow()>1){const match=sh.getRange(2,14,sh.getLastRow()-1,1).createTextFinder(id).matchEntireCell(true).findNext();if(match)rowIndex=match.getRow();}
  if(!rowIndex){
   const cache=CacheService.getScriptCache();const key='rate:'+String(p.rate_key||'direct').slice(0,100);const now=Date.now();
   let rate=JSON.parse(cache.get(key)||'null');if(!rate||rate.until<=now)rate={count:0,until:now+60000};
   if(rate.count>=3)return json_({ok:false,code:'RATE_LIMIT'});rate.count++;cache.put(key,JSON.stringify(rate),60);
   sh.appendRow([Utilities.formatDate(new Date(),'Asia/Seoul','yyyy-MM-dd HH:mm:ss'),safe_(p['form-name']),safe_(p.page),safe_(p.company),safe_(p.name),"'"+String(p.phone),safe_(p.email),safe_(p.website),safe_(p.service),safe_(p.sv),safe_(p.plan),safe_(p.message),safe_(p.agree),id,'대기']);rowIndex=sh.getLastRow();SpreadsheetApp.flush();
  }
  if(sh.getRange(rowIndex,15).getValue()!=='완료'){
   try {const row=sh.getRange(rowIndex,1,1,13).getValues()[0];MailApp.sendEmail(NOTIFY_EMAIL,'[염원컴퍼니] 새 상담 신청 - '+String(p.company).replace(/[\r\n]/g,' '),HEADERS.slice(0,13).map((h,i)=>h+': '+row[i]).join('\n'));sh.getRange(rowIndex,15).setValue('완료');}
   catch(error){sh.getRange(rowIndex,15).setValue('실패: 수동 확인');}
  }
  return json_({ok:true,requestId:id,receiptId:id});
 } catch(error){return json_({ok:false,code:'STORAGE_ERROR'});} finally {lock.releaseLock();}
}
function doGet(){return json_({ok:true,service:'yumone-contact-v3'});}
function safe_(v){v=String(v||'').slice(0,3000);return /^[=+\-@]/.test(v)?"'"+v:v;}
function json_(o){return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);}
