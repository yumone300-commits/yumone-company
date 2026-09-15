import {navigation} from './navigation';
import {servicePages} from './service-pages';

export type HeroCopy = {eyebrow:string;before:string;emphasis:string;after:string;description:string;audience:string;cta:string;secondary:string;basedOn:string};
const experience = '20년+ 프랜차이즈 현장 경험';
type Copy = Omit<HeroCopy,'basedOn'>;
const categories:Record<string,Copy> = {
  about:{eyebrow:'ABOUT YUMONE COMPANY',before:'프랜차이즈 현장을 이해하고,',emphasis:'마케팅과 교육으로',after:' 성장을 설계합니다.',description:'본사의 브랜드 전략부터 가맹점의 현장 실행까지, 염원컴퍼니가 마케팅·교육·컨설팅으로 연결합니다.',audience:'브랜드 성장과 가맹점 실행력을 함께 높이고 싶은 프랜차이즈 본사',cta:'우리 브랜드 성장 상담하기',secondary:'염원컴퍼니 알아보기'},
  franchise:{eyebrow:'FRANCHISE MARKETING',before:'브랜드를 알리는 것부터',emphasis:'가맹 상담으로 이어지는 흐름',after:'까지 설계합니다.',description:'브랜드의 차별점을 정리하고, 콘텐츠·광고·홈페이지를 연결해 예비 창업자의 관심이 상담으로 이어지도록 돕습니다.',audience:'브랜드 인지도와 가맹점 모집을 함께 강화하려는 프랜차이즈 본사',cta:'가맹모집 마케팅 상담하기',secondary:'제공 서비스 보기'},
  'ai-search':{eyebrow:'AI SEARCH MARKETING',before:'검색과 AI가 이해하도록',emphasis:'브랜드의 공식 정보',after:'를 정비합니다.',description:'SEO·AEO·GEO를 연결해 공식 자료의 정확성과 발견 가능성을 강화합니다.',audience:'네이버·구글 검색과 AI 답변 속 브랜드 정보를 개선하려는 기업',cta:'우리 브랜드 AI 노출 진단받기',secondary:'제공 서비스 보기'},
  content:{eyebrow:'CONTENT PRODUCTION',before:'브랜드의 강점을',emphasis:'고객이 선택할 이유',after:'로 만듭니다.',description:'영상·숏폼·블로그·상세페이지에 브랜드의 차별점을 담아, 고객의 이해와 문의를 돕는 콘텐츠를 제작합니다.',audience:'브랜드의 차별점을 고객에게 전달할 콘텐츠가 필요한 기업과 매장',cta:'콘텐츠 제작 상담하기',secondary:'제작 서비스 보기'},
  education:{eyebrow:'MARKETING EDUCATION',before:'배우는 데서 끝나지 않고,',emphasis:'현장에서 실행하는 마케팅',after:'을 교육합니다.',description:'프랜차이즈 본사·슈퍼바이저·가맹점주·소상공인을 대상으로, AI와 온라인 마케팅을 업무에 적용하는 실습 중심 교육을 제공합니다.',audience:'마케팅 실무와 AI 활용 역량을 높이고 싶은 본사 직원·SV·점주·소상공인',cta:'맞춤 교육 문의하기',secondary:'교육 프로그램 보기'},
  project:{eyebrow:'OUR PROJECTS',before:'브랜드의 과제를',emphasis:'어떻게 실행했는지',after:' 보여드립니다.',description:'마케팅·콘텐츠·교육 프로젝트의 목표와 접근 방법, 실제 수행 내용을 확인해 보세요.',audience:'염원컴퍼니의 수행 경험과 협업 방식을 확인하고 싶은 기업 담당자',cta:'우리 프로젝트 상담하기',secondary:'프로젝트 살펴보기'},
  insight:{eyebrow:'YUMONE INSIGHTS',before:'변화하는 마케팅,',emphasis:'우리 브랜드의 실행 전략',after:'으로 읽습니다.',description:'프랜차이즈·온라인 마케팅·AI 활용에 관한 실무 관점과 현장에서 적용할 아이디어를 전합니다.',audience:'브랜드 운영과 마케팅에 활용할 실무 정보를 찾는 본사 담당자와 사업자',cta:'우리 브랜드 적용 상담하기',secondary:'인사이트 읽어보기'},
};
// Service pages retain their existing, page-specific copy. Other subpages use their actual scope below.
const details:Record<string,{eyebrow:string;before:string;emphasis:string;after:string;audience:string;cta:string;secondary:string}> = {
 '/about/company':{eyebrow:'COMPANY OVERVIEW',before:'본사와 가맹점의 성장을',emphasis:'하나의 실행 구조',after:'로 연결합니다.',audience:'브랜드 전략과 가맹점 실행을 함께 설계할 파트너를 찾는 본사',cta:'브랜드 성장 방향 상담하기',secondary:'회사 소개 보기'},
 '/about/founder':{eyebrow:'MEET THE FOUNDER',before:'염혜단 대표의 현장 경험을',emphasis:'마케팅과 교육의 실행',after:'으로 연결합니다.',audience:'프랜차이즈 실무 경험과 교육·컨설팅 전문성을 확인하려는 담당자',cta:'대표 전문 분야 상담하기',secondary:'대표 경력 보기'},
 '/about/difference':{eyebrow:'WHY YUMONE COMPANY',before:'광고와 콘텐츠, 현장 교육을',emphasis:'하나의 성장 방향',after:'으로 설계합니다.',audience:'마케팅 채널과 현장 교육의 우선순위를 함께 정리하려는 본사',cta:'우리 브랜드 실행 방향 상담하기',secondary:'차별점 살펴보기'},
 '/about/news':{eyebrow:'COMPANY NEWS',before:'염원컴퍼니의 활동을',emphasis:'공식 소식',after:'으로 만나보세요.',audience:'염원컴퍼니의 회사 활동과 교육·콘텐츠 발행 소식을 확인하려는 담당자',cta:'회사 활동 관련 문의하기',secondary:'공식 소식 확인하기'},
 '/franchise/recruit':{eyebrow:'FRANCHISE RECRUITING',before:'예비 창업자의 질문을',emphasis:'가맹 상담',after:'으로 연결합니다.',audience:'가맹모집 메시지와 광고·상담 동선을 개선하려는 프랜차이즈 본사',cta:'가맹모집 마케팅 상담하기',secondary:'실행 업무 범위 보기'},
 '/insight/column':{eyebrow:'FRANCHISE MARKETING COLUMN',before:'가맹모집과 브랜드 성장,',emphasis:'실무의 핵심 질문',after:'부터 살펴봅니다.',audience:'브랜드 선택 이유와 가맹 상담 흐름을 점검하려는 본사 마케팅 담당자',cta:'브랜드 마케팅 적용 상담하기',secondary:'마케팅 칼럼 읽기'},
 '/insight/ai-search':{eyebrow:'AI SEARCH RESOURCES',before:'검색과 AI의 변화를',emphasis:'공식 정보의 점검 기준',after:'으로 읽습니다.',audience:'SEO·AEO·GEO와 브랜드 정보 정비의 실무 자료를 찾는 담당자',cta:'AI 검색 정보 정비 상담하기',secondary:'AI 검색 자료 읽기'},
 '/insight/tips':{eyebrow:'STORE MARKETING TIPS',before:'우리 매장에서 시작할',emphasis:'작은 개선 과제',after:'를 찾습니다.',audience:'지역 고객과 매장 상황에 맞는 마케팅 실행 방법을 찾는 점주와 SV',cta:'매장 마케팅 적용 상담하기',secondary:'현장 적용 팁 읽기'},
 '/insight/youtube':{eyebrow:'FRANCHISE SISTER YOUTUBE',before:'프랜차이즈 현장의 이야기를',emphasis:'영상으로',after:' 만나보세요.',audience:'프랜차이즈 마케팅과 교육의 실무 관점을 영상으로 확인하려는 본사 담당자와 점주',cta:'영상 주제 관련 상담하기',secondary:'공식 채널 안내 보기'},
};
const foundations:Record<string,string> = {about:experience,franchise:experience,'ai-search':experience,content:'브랜드 메시지와 고객 행동을 연결하는 콘텐츠 기획',education:'역할별 현장 과제와 실습 중심 교육 설계',project:'수행 범위와 현장 자료의 공개 기준',insight:'프랜차이즈·마케팅·교육의 실무 점검 기준'};
export function getHeroCopy(href:string):HeroCopy {
 const group=navigation.find(g=>g.href===href||g.children.some(c=>c.href===href));
 if(!group)throw new Error(`Unknown hero route: ${href}`);
 const basedOn=foundations[group.key];
 if(href===group.href)return {...categories[group.key],basedOn};
 const item=group.children.find(c=>c.href===href)!;
 const service=servicePages[href];
 if(service)return {...service,secondary:group.key==='education'?'교육 프로그램 보기':group.key==='content'?'제작 서비스 보기':group.key==='project'?'확인할 내용 보기':'제공 서비스 보기',basedOn};
 const copy=details[href];
 if(!copy)throw new Error(`Missing hero copy: ${href}`);
 return {...copy,description:item.description,basedOn};
}
