import {navigation} from './navigation';
import {servicePages} from './service-pages';

export type PhotoKey = 'consult'|'workshop'|'shoot'|'ai'|'training'|'owner'|'food'|'camera'|'mentor';
export const photos:Record<PhotoKey,{src:string;alt:string;caption:string;width:number;height:number}>={
 consult:{src:'/images/pdf-reference/consulting-session.jpg',alt:'노트북과 발표 자료를 함께 검토하는 상담 장면',caption:'제공된 상담 현장 자료',width:306,height:194},
 workshop:{src:'/images/pdf-reference/how-work-sales.webp',alt:'참여자들이 자료를 펼쳐 놓고 논의하는 실무 워크숍',caption:'제공된 실무 워크숍 자료',width:422,height:317},
 shoot:{src:'/images/pdf-reference/how-work-video.webp',alt:'조명과 카메라를 설치하고 인터뷰를 촬영하는 장면',caption:'제공된 콘텐츠 촬영 현장 자료',width:422,height:317},
 ai:{src:'/images/pdf-reference/how-work-ai.webp',alt:'염혜단 대표가 본사 온라인 마케팅 활용을 설명하는 강의',caption:'염혜단 대표 · 온라인 마케팅 강의 자료',width:422,height:254},
 training:{src:'/images/supervisor-marketing-training.jpg',alt:'강사와 수강생이 함께하며 노트북으로 자료를 확인하는 교육 현장',caption:'제공된 슈퍼바이저 마케팅 교육 사진',width:960,height:720},
 owner:{src:'/images/small-business-marketing-training.jpg',alt:'매장에서 노트북을 함께 보며 마케팅을 상담하는 두 사람',caption:'제공된 소상공인 마케팅 상담·교육 사진',width:960,height:540},
 food:{src:'/images/pdf-reference/journey-blog.webp',alt:'고기와 곁들임 메뉴를 함께 담은 음식 콘텐츠 사진',caption:'제공된 메뉴 콘텐츠 이미지 · 작업 설명용',width:296,height:222},
 camera:{src:'/images/pdf-reference/journey-content-shoot.webp',alt:'인물 인터뷰 촬영 화면을 확인하는 카메라 모니터',caption:'제공된 촬영 모니터 자료',width:167,height:296},
 mentor:{src:'/images/pdf-reference/how-work-mentoring.webp',alt:'현장 과제를 함께 살펴보는 멘토링 장면',caption:'제공된 멘토링 활동 자료',width:422,height:317},
};
type GroupCopy={label:string;before:string;emphasis:string;description:string;cta:string;audience:string;work:string;situations:string[];questions:string[];prepare:string;evidence:string;basis:string;photo?:PhotoKey};
type DetailCopy={before:string;emphasis:string;description:string;photo:PhotoKey;checks:string[];sampleTitle:string};
export const serviceGroups:Record<string,GroupCopy>={
  "franchise": {
    "label": "프랜차이즈 본사를 위한 마케팅",
    "before": "가맹모집부터 브랜드 운영까지,",
    "emphasis": "본사에 필요한 마케팅을 함께 실행합니다.",
    "description": "해야 할 일은 많은데, 내부 인력만으로 진행하기 어려우신가요? 현재 운영 상황을 살펴보고 콘텐츠 제작, 가맹모집 페이지, 광고 운영 중 필요한 업무와 우선순위를 정합니다.",
    "cta": "마케팅 상담하기",
    "audience": "마케팅 실행과 가맹점 지원을 함께 관리하는 프랜차이즈 본사",
    "work": "현황 진단 · 가맹모집 · 매장 마케팅 · 광고 운영",
    "situations": [
      "내부 담당자와 외부 실행사의 업무 범위를 정해야 하는 본사",
      "가맹모집 콘텐츠와 상담 동선을 함께 정비하려는 본사",
      "본사 기준과 점포별 마케팅 실행을 연결하려는 본사"
    ],
    "questions": [
      "현재 운영하는 채널과 담당자는 누구인가요?",
      "우선 정비할 업무는 가맹모집인가요, 매장 지원인가요?",
      "내부에서 진행할 일과 외부에 맡길 일은 무엇인가요?"
    ],
    "prepare": "홈페이지·운영 채널 주소, 기존 광고·콘텐츠 자료, 우선 해결할 과제",
    "evidence": "본사와 가맹점의 역할을 함께 이해합니다.",
    "basis": "프랜차이즈 마케팅·교육 및 자영업자 컨설팅 경험을 바탕으로 본사가 정할 기준과 매장에서 실행할 일을 구분합니다.",
    "photo": "ai"
  },
  "ai-search": {
    "label": "공식 브랜드 정보를 정비하는 AI 검색 마케팅",
    "before": "검색과 AI가 참고할 정보를,",
    "emphasis": "정확하고 일관되게 정리합니다.",
    "description": "홈페이지와 공식 소개 자료를 대조하고 고객의 질문에 답하는 콘텐츠를 구성합니다. 검색·AI 답변에서 확인한 정보와 출처를 기록해 정비할 항목을 정합니다.",
    "cta": "AI 검색 마케팅 상담하기",
    "audience": "검색과 AI 답변에 나타나는 브랜드 정보를 관리하려는 본사 담당자",
    "work": "SEO · 질문형 콘텐츠 · 공식 정보 정비 · 노출 현황 진단",
    "situations": [
      "채널마다 다른 회사·서비스 정보를 정리하려는 담당자",
      "고객 질문에 대한 공식 답변 자료를 갖추려는 담당자",
      "검색·AI 답변의 오류와 누락을 점검하려는 담당자"
    ],
    "questions": [
      "공식 회사·서비스 정보는 어디에 정리되어 있나요?",
      "고객이 반복해서 묻는 질문은 무엇인가요?",
      "현재 검색·AI 답변에서 수정할 정보가 있나요?"
    ],
    "prepare": "홈페이지 주소, 공식 소개 자료, 점검할 질문과 실제 답변 화면",
    "evidence": "브랜드의 실제 업무와 공개 자료를 함께 읽습니다.",
    "basis": "기존 회사 소개에 안내된 AI 기반 프랜차이즈 마케팅 연구·교육 활동을 바탕으로, 브랜드가 실제 제공하는 업무와 공개 정보의 일치 여부를 살펴봅니다. 노출·추천·검색 순위를 보장하지 않습니다."
  },
  "content": {
    "label": "프랜차이즈 본사의 콘텐츠 제작·운영",
    "before": "브랜드의 강점과 서비스 정보를,",
    "emphasis": "채널에 맞는 콘텐츠로 제작합니다.",
    "description": "홈페이지, 블로그, 영상에서 전달할 핵심 내용을 먼저 정합니다. 보유 자료와 활용 목적을 확인하고 기획·촬영·편집·운영 중 필요한 범위를 협의합니다.",
    "cta": "콘텐츠 제작 상담하기",
    "audience": "브랜드 메시지와 제작·운영 일정을 관리하는 본사 담당자",
    "work": "홈페이지 · 블로그·플레이스 · 숏폼 · 브랜드 영상",
    "situations": [
      "여러 채널의 브랜드 설명을 일관되게 정리하려는 본사",
      "기획부터 제작까지 외부 실행이 필요한 담당자",
      "보유 사진·영상의 활용 범위와 추가 제작을 정하려는 담당자"
    ],
    "questions": [
      "어떤 고객에게 어떤 정보를 전달하려 하나요?",
      "활용할 채널과 필요한 제작 형식은 무엇인가요?",
      "보유 자료와 새로 촬영할 자료는 무엇인가요?"
    ],
    "prepare": "브랜드 소개, 보유 사진·영상, 활용 채널, 참고 화면",
    "evidence": "기획과 실제 촬영 과정을 연결합니다.",
    "basis": "기존 콘텐츠 촬영 자료에서 확인할 수 있는 인터뷰·현장 촬영 활동을 바탕으로, 전달할 메시지와 필요한 장면을 먼저 정리합니다.",
    "photo": "shoot"
  },
  "education": {
    "label": "프랜차이즈 본사·SV·점주를 위한 실무 교육",
    "before": "역할별 업무 과제를 중심으로,",
    "emphasis": "현장에 적용할 실무를 교육합니다.",
    "description": "본사 직원, 슈퍼바이저, 점주의 업무와 실무 수준을 확인합니다. 가맹점 방문, 점주 상담, 콘텐츠 작성 등 필요한 주제를 정하고 실제 업무 자료로 실습합니다.",
    "cta": "교육 상담하기",
    "audience": "본사 직원·SV·점주 교육을 기획하는 담당자와 소상공인",
    "work": "본사 직원 교육 · SV 실무 · 점주 마케팅 · AI 활용",
    "situations": [
      "본사 직원과 SV의 공통 업무 기준을 만들려는 담당자",
      "점주가 매장에서 적용할 마케팅 실습을 준비하는 담당자",
      "참여자 수준에 맞는 AI·업무 도구 교육이 필요한 조직"
    ],
    "questions": [
      "참여자는 어떤 업무를 맡고 있나요?",
      "교육 후 현장에서 적용할 과제는 무엇인가요?",
      "실습할 자료와 노트북·도구가 준비되어 있나요?"
    ],
    "prepare": "교육 대상·인원, 업무 과제, 보유 자료, 실습 도구·환경",
    "evidence": "본사·SV·가맹점주 교육 경험을 활용합니다.",
    "basis": "기존 회사 소개에 안내된 본사·SV·가맹점주 교육 경험을 바탕으로 참여자의 역할에 맞는 주제와 실습 자료를 구성합니다.",
    "photo": "training"
  }
};
export const detailCopy:Record<string,DetailCopy>={
 '/franchise/diagnosis':{before:'마케팅 현황을 점검하고,',emphasis:'실행 우선순위를 정리합니다.',description:'홈페이지, 광고, 콘텐츠를 함께 살펴보고 고객이 정보를 찾거나 상담을 신청할 때 막히는 지점을 확인합니다. 먼저 손봐야 할 일을 정리합니다.',photo:'consult',checks:['고객 유입 경로','브랜드 설명','상담 동선'],sampleTitle:'고객 흐름 진단표'},
 '/franchise/recruit':{before:'창업자가 확인할 정보를,',emphasis:'가맹모집 콘텐츠로 정리합니다.',description:'예비 점주가 궁금해하는 창업 정보, 운영 지원, 브랜드 차별점을 정리하고 콘텐츠와 상세페이지, 광고에서 일관되게 전달합니다.',photo:'shoot',checks:['가맹모집 메시지','상세페이지','광고 연결'],sampleTitle:'가맹모집 페이지 구성안'},
 '/franchise/sales':{before:'가맹점의 운영 여건에 맞춰,',emphasis:'지역 마케팅을 실행합니다.',description:'상권과 방문 시간대, 주요 메뉴를 살펴보고 매장 사진과 지역 콘텐츠, 프로모션을 연결해 방문할 이유를 구체적으로 보여줍니다.',photo:'food',checks:['매장 강점','지역 콘텐츠','방문 유도'],sampleTitle:'지역 고객 콘텐츠 기획안'},
 '/franchise/ads':{before:'운영 중인 광고와',emphasis:'문의 흐름을 함께 점검합니다.',description:'클릭 수와 함께 실제 문의와 연결되는 흐름을 살펴봅니다. 운영 내용을 공유하고 다음에 조정할 일을 제안합니다.',photo:'workshop',checks:['운영 현황','문의 흐름','개선 제안'],sampleTitle:'광고 운영 점검 보고서'},
 '/ai-search/seo':{before:'서비스 정보를 찾기 쉽게,',emphasis:'페이지 구조와 콘텐츠를 정비합니다.',description:'서비스 설명과 페이지 제목, 내부 링크를 함께 점검합니다. 검색이 이해할 구조와 고객이 읽을 내용을 정리합니다.',photo:'consult',checks:['페이지 제목','콘텐츠 구조','내부 연결'],sampleTitle:'페이지별 SEO 점검표'},
 '/ai-search/aeo':{before:'고객의 질문에 답하는',emphasis:'콘텐츠와 FAQ를 구성합니다.',description:'상담 질문을 모아 짧은 답변과 자세한 설명을 구성합니다. 확인할 수 있는 근거와 함께 FAQ와 서비스 페이지에 반영합니다.',photo:'mentor',checks:['고객 질문','답변과 근거','FAQ 구성'],sampleTitle:'질문·답변 콘텐츠 초안'},
 '/ai-search/geo':{before:'AI가 참고할 공식 정보를',emphasis:'일관된 기준으로 정리합니다.',description:'채널마다 다른 소개와 오래된 자료를 대조합니다. 공식 출처와 갱신 기준을 정해 브랜드의 정보를 일관되게 관리합니다.',photo:'ai',checks:['공식 출처','정보 일관성','갱신 기준'],sampleTitle:'공식 정보·출처 관리표'},
 '/ai-search/diagnosis':{before:'검색·AI 답변을 기록하고,',emphasis:'공식 정보와 대조합니다.',description:'브랜드 관련 질문과 실제 답변을 기록하고 공식 자료와 대조합니다. 빠진 설명과 잘못된 정보를 구분해 정비할 항목을 찾습니다.',photo:'workshop',checks:['브랜드 질문','답변 기록','공식 자료 대조'],sampleTitle:'검색·AI 답변 관찰표'},
 '/content/website':{before:'서비스 설명부터 문의까지,',emphasis:'홈페이지의 흐름을 설계합니다.',description:'서비스를 이해하고 근거를 확인한 뒤 문의하는 흐름을 설계합니다. 모바일에서도 설명과 상담 버튼을 쉽게 찾을 수 있게 구성합니다.',photo:'consult',checks:['정보 구조','PC·모바일 화면','문의 연결'],sampleTitle:'서비스 랜딩페이지 구성안'},
 '/content/naver':{before:'매장 정보와 지역 콘텐츠를',emphasis:'일관되게 운영합니다.',description:'메뉴와 매장 정보, 지역 고객의 질문을 콘텐츠로 정리합니다. 게시물과 매장 기본 정보가 서로 다르지 않은지 함께 확인합니다.',photo:'food',checks:['매장 기본 정보','지역 콘텐츠','게시·관리 기준'],sampleTitle:'매장 소개 콘텐츠 기획안'},
 '/content/shortform':{before:'핵심 메시지에 맞춰',emphasis:'숏폼 영상을 기획·제작합니다.',description:'첫 장면에서 보여줄 강점을 고르고 촬영 장면과 자막을 구성합니다. 쇼츠·릴스 등 활용 채널에 맞춰 편집 범위를 협의합니다.',photo:'camera',checks:['첫 장면','촬영·자막 구성','채널별 편집'],sampleTitle:'숏폼 장면별 스토리보드'},
 '/content/brand-film':{before:'브랜드와 운영 현장을 담는',emphasis:'홍보영상을 제작합니다.',description:'브랜드 이야기와 인터뷰, 실제 운영 과정을 영상으로 정리합니다. 홍보와 교육 중 활용 목적에 맞춰 기획·촬영·편집을 진행합니다.',photo:'shoot',checks:['브랜드 이야기','인터뷰·현장 촬영','목적별 편집'],sampleTitle:'브랜드 영상 구성안'},
 '/education/hq':{before:'본사 마케팅과 운영 업무에',emphasis:'적용하는 실무 교육.',description:'가맹모집부터 매장 실행까지 고객의 흐름을 함께 읽습니다. 부서별 자료와 업무를 연결하고 협업할 과제를 정리하는 교육입니다.',photo:'training',checks:['고객 여정','부서 간 협업','성과 점검'],sampleTitle:'본사 협업 과제 워크북'},
 '/education/supervisor':{before:'가맹점 방문과 점주 상담에',emphasis:'적용하는 SV 실무 교육.',description:'가맹점의 상황을 읽고, 문제를 정리하고, 실행할 일을 제안하는 실무를 다룹니다. 방문 보고와 점주 상담을 현장 과제로 연습합니다.',photo:'training',checks:['매장 진단','점주 커뮤니케이션','실행 제안'],sampleTitle:'SV 방문·상담 워크북'},
 '/education/owner':{before:'우리 매장 자료로 실습하는',emphasis:'점주·소상공인 마케팅 교육.',description:'우리 매장의 사진과 메뉴, 고객의 질문으로 직접 콘텐츠를 만들어보는 실습형 교육입니다. 점주와 소상공인이 매장에서 시도할 실행 계획을 정리합니다.',photo:'owner',checks:['매장 정보','콘텐츠 실습','실행 계획'],sampleTitle:'우리 매장 콘텐츠 실습지'},
 '/education/ai':{before:'콘텐츠 작성과 반복 업무에',emphasis:'적용하는 AI 실무 교육.',description:'브랜드 자료를 넣어 콘텐츠 초안을 만들고, 결과를 검토하는 방법을 익힙니다. 반복 업무에 적용할 프롬프트와 확인 기준을 직접 정리합니다.',photo:'ai',checks:['업무별 프롬프트','결과 검토','반복 업무 적용'],sampleTitle:'AI 업무 프롬프트 워크북'},
};
export function experienceProfile(href:string){
 const group=navigation.find(g=>href===g.href||g.children.some(c=>c.href===href));
 if(!group||!serviceGroups[group.key])return null;
 const child=group.children.find(c=>c.href===href);
 const detail=child?detailCopy[href]:undefined;
 const profile=servicePages[href];
 return {group,child,detail,profile,copy:serviceGroups[group.key],
  scope:profile?.scope||child?.scope||[],
  outputs:profile?.outputs||['가맹모집 메시지 구성안','콘텐츠·상세페이지 기획안','광고 연결 점검 항목']};
}
