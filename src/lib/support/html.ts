import sanitize from 'sanitize-html';

// CMS HTML is untrusted, even when edited by an administrator.
export function noticeHTML(html:string){return sanitize(html,{
  allowedTags:['p','br','div','span','strong','b','em','i','u','a','img','ul','ol','li','blockquote','h2','h3','h4','table','thead','tbody','tr','th','td','hr'],
  allowedAttributes:{a:['href','rel'],img:['src','alt','loading'],td:['colspan','rowspan'],th:['colspan','rowspan']},
  allowedSchemes:['https','http','mailto','tel'],allowProtocolRelative:false,
  transformTags:{a:(_tag,attrs)=>({tagName:'a',attribs:{...attrs,rel:'noopener noreferrer'}})},
});}
