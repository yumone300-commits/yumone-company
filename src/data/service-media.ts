/** Publish only after permission, attribution and privacy checks. Never invent platform screenshots. */
export type ServiceAsset = {
 id:string; kind:'image'|'video'|'external'; src:string; original?:string; poster?:string;
 width:number; height:number; alt:string; caption:string; href?:string; linkLabel?:string;
 classification:'실제 운영·제작 사례'|'참고 화면'|'구성 예시'; source:string;
 approved:boolean; privacyChecked:boolean;
};
export type MediaSection = {
 id:string; label:string; title:string; description:string; tasks:string[]; cta:string;
 format:'portrait'|'wide'|'reel'; captureList:string[]; assets:ServiceAsset[]; channel?:{label:string;href:string};
};
// No verified platform screenshots or playable videos were found in the supplied project.
// Add approved files in public/images/service-cases, then register all metadata here.
export const serviceMedia:Record<string,MediaSection[]> = {
 '/content/naver':[
  {id:'place',label:'NAVER PLACE',title:'플레이스에 들어온 고객,\n방문할 이유를 찾고 있나요?',description:'대표사진과 메뉴, 매장 소식부터 리뷰 답글까지. 고객이 방문 전에 확인하는 정보를 정리하고 꾸준히 관리합니다.',tasks:['대표사진·소개·메뉴 정보 정리','매장 소식 콘텐츠 기획·게시','리뷰 응대 기준과 정보 갱신 관리'],cta:'우리 매장 플레이스 운영 상담하기',format:'portrait',captureList:['플레이스 홈: 대표사진·업체명·소개·영업 정보가 보이는 캡처','메뉴 또는 소식: 실제 게시 내용이 읽히는 캡처','리뷰 답글: 작성자 이름·사진을 가린 캡처 (선택)'],assets:[]},
  {id:'blog',label:'NAVER BLOG',title:'검색해서 들어온 고객에게,\n궁금한 답과 다음 행동을.',description:'메뉴와 서비스 소개를 고객이 궁금해하는 질문으로 풀어냅니다. 글을 읽고 매장 정보나 상담 경로를 확인할 수 있도록 연결합니다.',tasks:['고객 질문·지역 특성에 맞춘 글 기획','본문·사진 구성과 사실 확인','플레이스·상담 연결 및 게시 일정 관리'],cta:'우리 브랜드 블로그 운영 상담하기',format:'wide',captureList:['블로그 홈: 실제 계정과 최근 글이 보이는 화면','게시글: 제목·본문·이미지가 함께 보이는 핵심 구간','글 하단의 실제 매장·상담 연결 구간'],assets:[]}
 ],
 '/content/shortform':[
  {id:'short-video',label:'REELS · SHORTS',title:'짧게 봐도,\n우리 매장의 강점은 선명하게.',description:'첫 장면에서 관심을 끌고, 메뉴와 현장 장면으로 선택 이유를 보여줍니다. 자막·썸네일·마지막 안내까지 게시할 채널에 맞춰 제작합니다.',tasks:['도입 문구·촬영 장면·스크립트 기획','9:16 편집·자막·썸네일 제작','게시 문구와 매장·문의 연결 안내'],cta:'우리 매장 릴스·쇼츠 제작 상담하기',format:'reel',captureList:['공개 가능한 세로 영상 MP4 또는 실제 릴스·쇼츠 게시물 URL','동일 영상의 9:16 썸네일','도입 문구와 자막이 읽히는 실제 영상 장면'],assets:[]},
  {id:'instagram',label:'INSTAGRAM',title:'프로필에서 게시물까지,\n어떤 브랜드인지 바로 알 수 있도록.',description:'계정에 들어온 고객이 브랜드의 강점과 이용 방법을 확인하게 합니다. 프로필·게시물 주제·릴스 활용·문의 경로를 함께 정리합니다.',tasks:['프로필 소개·하이라이트·문의 링크 점검','피드 주제와 게시 일정 구성','릴스 활용과 게시물 문의 안내 정리'],cta:'인스타그램 운영 범위 상담하기',format:'portrait',captureList:['프로필: 소개·문의 링크·하이라이트가 보이는 화면','실제 피드 배열과 게시물 1건','동일 계정의 릴스 탭 (선택)'],assets:[]}
 ]
};
export const publishableAssets=(section:MediaSection)=>section.assets.filter(a=>a.approved&&a.privacyChecked&&a.source&&a.src&&a.alt&&a.caption&&a.width>0&&a.height>0&&(a.kind!=='external'||!!a.href));

// Supplied official accounts, inspected 2026-09-22. These are owned-channel posts, not client results.
serviceMedia['/content/naver'][1].assets=[{
 id:'official-blog-post',kind:'image',src:'/images/service-cases/blog-content.webp',width:915,height:859,
 alt:'염원컴퍼니 공식 블로그에 게시된 프랜차이즈 상세페이지 15가지 점검 콘텐츠 대표 이미지',
 caption:'공식 블로그 게시글의 실제 대표 이미지. 원문에 AI 활용 이미지로 표시되어 있으며, 실제 홈페이지 작업 화면은 아닙니다.',
 href:'https://blog.naver.com/yumone_company/224408603756',classification:'실제 운영·제작 사례',source:'염원컴퍼니 자사 블로그 · 2026.09.11 게시 · 고객사 대행 실적이 아닌 자사 콘텐츠',approved:true,privacyChecked:true
}];
serviceMedia['/content/shortform'][0].assets=[{
 id:'official-reel',linkLabel:'인스타그램에서 릴스 보기',kind:'external',src:'/images/service-cases/reel-cover.webp',width:640,height:1136,
 alt:'프차언니 자영업 생존학교 소개 릴스의 실제 세로 썸네일',caption:'도입 문구와 교육 안내를 담은 실제 릴스 썸네일. 2025년 게시 콘텐츠이며 현재 교육 모집 안내가 아닙니다.',
 href:'https://www.instagram.com/fc_aunni/reel/DKrU1ihPi5U/',classification:'실제 운영·제작 사례',source:'프차언니 @fc_aunni · 자사 채널 콘텐츠 · 2026.09.22 확인',approved:true,privacyChecked:true
}];
serviceMedia['/content/shortform'][1].format='wide';
serviceMedia['/content/shortform'][1].assets=[{
 id:'official-instagram-post',kind:'image',src:'/images/service-cases/instagram-training.webp',width:1400,height:790,
 alt:'프차언니 인스타그램에 게시된 메머드커피 슈퍼바이저 교육 현장 자료',caption:'공식 인스타그램에 게시된 교육 현장 이미지. 프로필 전체 캡처가 아닌 실제 게시물 콘텐츠입니다.',
 href:'https://www.instagram.com/fc_aunni/p/Ddf3eFbkeG6/',classification:'실제 운영·제작 사례',source:'프차언니 @fc_aunni · 2026.09.19 게시 · 자사 채널 콘텐츠',approved:true,privacyChecked:true
}];

serviceMedia['/content/naver'][1].channel={label:'염원컴퍼니 공식 블로그 보기',href:'https://blog.naver.com/yumone_company'};
serviceMedia['/content/shortform'][0].channel={label:'프차언니 유튜브 채널 보기',href:'https://www.youtube.com/channel/UCtKvK32-z-SQ_giQtD_fX3w'};
serviceMedia['/content/shortform'][1].channel={label:'프차언니 프로필·피드 보기',href:'https://www.instagram.com/fc_aunni/'};

