// Export the existing CMS, never create or overwrite Notion pages.
// Run after editing Notion when the deployment uses the checked-in snapshot.
import {writeFile,rename} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const token=process.env.NOTION_TOKEN;
if(!token)throw Error('Set NOTION_TOKEN in the server environment. Never commit it.');
const database=process.env.NOTION_SUPPORT_DATA_SOURCE_ID||'77cacbeb-74fe-4dee-a4e5-206c2f7c9b5e';
const text=p=>(p?.title||p?.rich_text||[]).map(x=>x.plain_text??x.text?.content??'').join('');
let cursor;const entries=[],ids=new Set();
do{const r=await fetch(`https://api.notion.com/v1/data_sources/${database}/query`,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Notion-Version':'2025-09-03','Content-Type':'application/json'},body:JSON.stringify({page_size:100,...(cursor?{start_cursor:cursor}:{})})});if(!r.ok)throw Error('CMS query failed: '+r.status);const data=await r.json();for(const page of data.results){const p=page.properties;if(p['유형']?.select?.name!=='공지사항'||page.archived||page.in_trash)continue;const sourceId=text(p['원본ID']);const key=sourceId||page.id;if(ids.has(key))throw Error('Duplicate source ID: '+key);ids.add(key);entries.push({id:page.id,slug:sourceId?'notice-'+sourceId:page.id.replaceAll('-',''),kind:'notices',title:text(p['제목']),summary:text(p['요약']),body:text(p['본문']),bodyHtml:text(p['본문HTML']),author:text(p['작성자']),sourceId,sourceUrl:p['원본URL']?.url||'',thumbnail:(p['대표이미지']?.url||'').replace('https://yumone-company.vercel.app/images/notices/','/images/notices/'),category:'',audience:'',status:p['공개상태']?.select?.name||'초안',approved:p['공개검수']?.checkbox===true,pinned:p['상단고정']?.checkbox===true,order:p['표시순서']?.number||0,publishedAt:p['발행일']?.date?.start||'',modifiedAt:'',files:(p['첨부파일']?.files||[]).map(f=>({name:f.name,type:f.type,url:f.file?.url||f.external?.url||''}))});}cursor=data.has_more?data.next_cursor:undefined;}while(cursor);
// Expiring Notion file URLs must never be published as a durable snapshot.
if(entries.some(e=>e.files.length))throw Error('Download new attachments to durable storage before exporting. Snapshot left unchanged.');
const file=fileURLToPath(new URL('../../src/data/notice-migration.json',import.meta.url));
await writeFile(file+'.tmp',JSON.stringify(entries,null,2)+'\n');await rename(file+'.tmp',file);
console.log(`Exported ${entries.length} notices; review and deploy the snapshot.`);
