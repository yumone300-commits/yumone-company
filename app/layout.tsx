import type {Metadata} from 'next';
import './globals.css';
import './typography.css';
import './quality.css';
import {ContactPaths} from '@/components/contact-paths';
import {Header} from '@/components/header';
import {Footer} from '@/components/footer';
import {site} from '@/data/site';
import {JsonLd} from '@/lib/seo';
export const metadata:Metadata={metadataBase:new URL(site.url),title:{default:'염원컴퍼니 | 프랜차이즈 마케팅·교육',template:'%s | 염원컴퍼니'},description:site.description,openGraph:{siteName:site.englishName,locale:'ko_KR',type:'website'},icons:{icon:'/icon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ko"><body><a href="#main" className="skip-link">본문 바로가기</a><Header/><main id="main">{children}</main><Footer/><ContactPaths/><JsonLd data={{'@type':'WebSite','@id':site.url+'/#website',url:site.url,name:site.name,inLanguage:'ko-KR',publisher:{'@id':site.url+'/#organization'}}}/><JsonLd data={{'@type':'Organization','@id':site.url+'/#organization',name:site.name,alternateName:site.englishName,url:site.url,description:site.description,founder:{'@type':'Person',name:site.ceo},...(site.logo?{logo:site.url+site.logo}:{})}}/></body></html>}

