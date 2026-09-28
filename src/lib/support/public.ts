import 'server-only';
import {getSupportEntries} from './notion';
import {publishable} from './core';
import {loadAttachment} from './files';
export async function publicSupport(){const result=await getSupportEntries();const entries=result.entries.filter(e=>publishable(e));const checked=await Promise.all(entries.map(async e=>{if(e.kind!=='resources')return e;try{if(!e.files.length)return null;for(const f of e.files)await loadAttachment(f);return e;}catch{return null;}}));return {state:result.state,entries:checked.filter(e=>e!==null)};}
