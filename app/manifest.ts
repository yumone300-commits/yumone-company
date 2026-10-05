import type {MetadataRoute} from 'next';
export default function manifest():MetadataRoute.Manifest{return {name:'염원컴퍼니',short_name:'염원컴퍼니',description:'프랜차이즈 마케팅·교육·컨설팅',start_url:'/',display:'standalone',background_color:'#ffffff',theme_color:'#121212',icons:[{src:'/apple-touch-icon.png',sizes:'180x180',type:'image/png'},{src:'/favicon.svg',sizes:'any',type:'image/svg+xml'}]};}
