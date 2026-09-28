import 'server-only';
import {timingSafeEqual} from 'node:crypto';
export function authenticated(request:Request){const key=process.env.SUPPORT_ADMIN_PASSWORD;if(!key||key.length<24)return false;const raw=request.headers.get('authorization')||'';if(!raw.startsWith('Basic '))return false;const actual=Buffer.from(Buffer.from(raw.slice(6),'base64').toString()),expected=Buffer.from('editor:'+key);return actual.length===expected.length&&timingSafeEqual(actual,expected);}
export const privateHeaders={'Cache-Control':'private, no-store, max-age=0','X-Robots-Tag':'noindex, nofollow','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'};
export function authRequired(){return new Response('관리자 로그인이 필요합니다.',{status:401,headers:{...privateHeaders,'WWW-Authenticate':'Basic realm="Yumone support administration", charset="UTF-8"'}});}
export const escapeHTML=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
