// Shared blocks for /education/ and ad landing pages built from the same reviewed static HTML.

export const followupHTML=`<aside class="followup" aria-labelledby="followup-title"><h3 id="followup-title">교육 후에도 현장이 바뀌는지, 함께 확인합니다.</h3><p>교육을 진행한 본사에는 수료 후 SV 운영 무료 30분 진단을 드립니다.</p></aside>`;

// Hidden fields that let one receiver tell which page a request came from.
export const sourceFieldsHTML=(page:string)=>`<input type="hidden" name="source_page" value="${page}"><input type="hidden" name="utm_source" value=""><input type="hidden" name="utm_medium" value=""><input type="hidden" name="utm_campaign" value="">`;

/** Returns the complete element that starts with `opening`, balancing nested tags of the same name. */
export function fragment(source:string,opening:string):string {
 const start=source.indexOf(opening);
 if(start<0)throw new Error('Education fragment not found: '+opening);
 const tag=/^<([a-z0-9]+)/i.exec(opening)?.[1];
 if(!tag)throw new Error('Education fragment needs an opening tag: '+opening);
 const pattern=new RegExp(`<(/?)${tag}\\b[^>]*>`,'gi');
 pattern.lastIndex=start;
 let depth=0;
 for(let match=pattern.exec(source);match;match=pattern.exec(source)){
  depth+=match[1]?-1:1;
  if(depth===0)return source.slice(start,match.index+match[0].length);
 }
 throw new Error('Education fragment is not closed: '+opening);
}
