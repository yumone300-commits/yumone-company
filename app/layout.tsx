import type {Metadata} from 'next';
import './globals.css';
import './typography.css';
import {ContactPaths} from '@/components/contact-paths';
import {Header} from '@/components/header';
import {Footer} from '@/components/footer';
import {site} from '@/data/site';
import {JsonLd} from '@/lib/seo';
import {share} from '@/data/share';
import {Analytics} from '@/components/analytics';
export const metadata:Metadata={metadataBase:new URL(site.url),title:{default:'염원컴퍼니 | 프랜차이즈 성장 파트너',template:'%s | 염원컴퍼니'},description:site.description,
openGraph:{title:share.title,description:share.description,url:site.url,siteName:site.name,locale:'ko_KR',type:'website',images:[{url:share.image,width:share.imageWidth,height:share.imageHeight,alt:share.imageAlt}]},
twitter:{card:'summary_large_image',title:share.title,description:share.description,images:[share.image]},
icons:{icon:[{url:'/favicon-16x16.png',sizes:'16x16',type:'image/png'},{url:'/favicon-32x32.png',sizes:'32x32',type:'image/png'},{url:'/favicon.svg',sizes:'any',type:'image/svg+xml'}],apple:[{url:'/apple-touch-icon.png',sizes:'180x180',type:'image/png'}]}};
// Install once in the persistent root layout, including the static HTML response.
const googleTagManager = "window.dataLayer = window.dataLayer || [];\nwindow.dataLayer.push({ga4_measurement_id: 'G-TRKZX16F7Z'});\n(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\nnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\nj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n})(window,document,'script','dataLayer','GTM-P5W5N2RR');";
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ko"><head><script id="yumone-gtm" dangerouslySetInnerHTML={{__html:googleTagManager}}/></head><body><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P5W5N2RR" height="0" width="0" style={{display:'none',visibility:'hidden'}} title="Google Tag Manager"/></noscript><Analytics/><a href="#main" className="skip-link">본문 바로가기</a><Header/><main id="main">{children}</main><Footer/><ContactPaths/><JsonLd data={{'@type':'WebSite','@id':site.url+'/#website',url:site.url,name:site.name,inLanguage:'ko-KR',publisher:{'@id':site.url+'/#organization'}}}/><JsonLd data={{'@type':'Organization','@id':site.url+'/#organization',name:site.name,alternateName:site.englishName,url:site.url,description:site.description,founder:{'@type':'Person',name:site.ceo},...(site.logo?{logo:site.url+site.logo}:{})}}/></body></html>}
