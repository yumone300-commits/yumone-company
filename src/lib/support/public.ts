import 'server-only';
import {getSupportEntries} from './notion';
import {publishable,type SupportKind} from './core';
import {loadAttachment} from './files';
export async function publicSupport(kind?:SupportKind){const result=await getSupportEntries();const entries=result.entries.filter(e=>publishable(e));const checked=await Promise.all(entries.map(async e=>{if(e.kind!=='resources')return e;try{if(!e.files.length)return null;for(const f of e.files)await loadAttachment(f);return e;}catch{return null;}}));return {source:result.state==='unconfigured'?'snapshot':'notion',state:result.state==='unconfigured'&&kind==='notices'?'ready':result.state,entries:checked.filter(e=>e!==null)};}
