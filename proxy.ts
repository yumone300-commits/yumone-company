import {NextResponse,type NextRequest} from 'next/server';
import {SITE_URL} from '@/lib/site';
export function proxy(request:NextRequest){
 if(process.env.CANONICAL_REDIRECT_ENABLED!=='true')return NextResponse.next();
 const canonical=new URL(SITE_URL),host=request.nextUrl.hostname;
 if(host!==canonical.hostname&&(host==='yumone.co.kr'||host.endsWith('.vercel.app'))){const url=request.nextUrl.clone();url.protocol=canonical.protocol;url.host=canonical.host;return NextResponse.redirect(url,308);}
 return NextResponse.next();
}
export const config={matcher:['/((?!api|_next|favicon).*)']};
