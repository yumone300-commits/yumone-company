export type NavigationItem={title:string;href:string;description:string;problem?:string;scope?:string[]};
export type NavigationGroup=NavigationItem & {key:string;headline:string;audience:string;problems:string[];children:NavigationItem[]};
// Final sitemap supplied by user. Copy describes service scope, never fabricated client outcomes.
// TODO: Add approved press links, case evidence, customer logos and original testimonials to corresponding pages.
export const navigation:NavigationGroup[]=[
  {
    "key": "about",
    "title": "염원컴퍼니",
    "href": "/about",
    "headline": "현장을 이해하고, 성장의 방향을 설계합니다.",
    "description": "프랜차이즈 본사의 전략과 가맹점 실행을 연결하는 마케팅·교육·컨설팅 파트너입니다.",
    "audience": "회사 선택 기준과 담당자의 전문성을 확인하고 싶은 프랜차이즈 본사",
    "problems": [
      "브랜드와 현장을 함께 이해하는 파트너가 필요합니다.",
      "전략이 제안서에 머물지 않고 실행으로 이어져야 합니다."
    ],
    "children": [
      {
        "title": "회사 소개",
        "href": "/about/company",
        "description": "본사와 가맹점이 함께 성장하는 연결 구조를 만듭니다.",
        "problem": "마케팅과 운영·교육이 서로 다른 목표로 움직이고 있습니다.",
        "scope": [
          "프랜차이즈 본사 전략과 현장 과제 연결",
          "검색·콘텐츠·광고의 일관된 메시지",
          "본사·SV·가맹점주 교육",
          "실행 결과를 반영하는 개선 방향"
        ]
      },
      {
        "title": "대표 소개",
        "href": "/about/founder",
        "description": "염혜단 대표의 20년+ 프랜차이즈 실무 경험을 소개합니다.",
        "problem": "우리 산업을 이해하는 사람이 직접 방향을 설계하는지 궁금합니다.",
        "scope": [
          "20년+ 프랜차이즈 실무 경험",
          "프랜차이즈 마케팅·교육 경험",
          "본사·SV·가맹점주 교육",
          "AI 기반 프랜차이즈 마케팅 연구·교육"
        ]
      },
      {
        "title": "염원컴퍼니의 차별점",
        "href": "/about/difference",
        "description": "광고 채널보다 먼저 브랜드가 성장할 구조를 살펴봅니다.",
        "problem": "광고, 콘텐츠, 현장 교육이 분리되어 개선의 우선순위를 잡기 어렵습니다.",
        "scope": [
          "프랜차이즈 본사와 가맹점의 구조 이해",
          "진단에서 실행으로 이어지는 전략",
          "현장에서 활용하는 역할별 교육",
          "SEO·AEO·GEO와 공식 정보 연결"
        ]
      },
      {
        "title": "언론·소식",
        "href": "/about/news",
        "description": "염원컴퍼니의 활동과 공식 소식을 확인하는 공간입니다.",
        "problem": "공식 발표와 검증되지 않은 홍보 정보를 구분하기 어렵습니다.",
        "scope": [
          "공식 회사 활동 안내",
          "교육·강의 소식의 주제와 대상",
          "마케팅 연구와 콘텐츠 발행 소식",
          "출처와 공개 승인이 확인된 보도 자료"
        ]
      }
    ]
  },
  {
    "key": "franchise",
    "title": "프랜차이즈 마케팅",
    "href": "/franchise",
    "headline": "가맹모집부터 가맹점 매출까지, 하나의 전략으로.",
    "description": "본사의 성장 단계와 현장 과제를 진단하고 발견·상담·방문으로 이어지는 마케팅을 설계합니다.",
    "audience": "가맹사업을 확대하거나 모집·매장 매출의 정체를 해결하려는 본사",
    "problems": [
      "문의는 있지만 상담과 계약으로 연결되지 않습니다.",
      "본사 광고와 매장 실행이 따로 움직입니다."
    ],
    "children": [
      {
        "title": "프랜차이즈 마케팅 진단",
        "href": "/franchise/diagnosis",
        "description": "성과가 막히는 지점부터 확인합니다.",
        "problem": "무엇부터 바꿔야 할지 판단할 기준이 없습니다.",
        "scope": [
          "브랜드·경쟁력 및 가맹사업 단계 점검",
          "검색·홈페이지·콘텐츠 현황 확인",
          "가맹문의와 상담 전환 흐름 분석",
          "개선 우선순위 및 실행 과제 정리"
        ]
      },
      {
        "title": "가맹점 모집 마케팅",
        "href": "/franchise/recruit",
        "description": "예비 창업자의 질문을 가맹 상담으로 연결합니다.",
        "problem": "광고 노출은 늘지만 실제 가맹 상담으로 이어지지 않습니다.",
        "scope": [
          "예비 창업자와 브랜드 선택 이유 정리",
          "가맹모집 메시지·랜딩 콘텐츠 기획",
          "문의 동선과 상담 전달 체계",
          "모집 광고 운영 및 전환 점검"
        ]
      },
      {
        "title": "가맹점 매출 활성화",
        "href": "/franchise/sales",
        "description": "지역 고객이 매장을 발견하고 다시 찾는 흐름을 만듭니다.",
        "problem": "본사 마케팅이 개별 매장의 방문과 구매로 이어지지 않습니다.",
        "scope": [
          "매장·상권·고객 접점 점검",
          "네이버 플레이스·블로그 정보 정비",
          "지역 콘텐츠와 프로모션 기획",
          "점주 실행 가이드와 현장 피드백"
        ]
      },
      {
        "title": "광고 운영 대행",
        "href": "/franchise/ads",
        "description": "광고의 목표를 노출보다 다음 행동에 맞춥니다.",
        "problem": "광고비는 쓰지만 어떤 유입이 문의로 연결되는지 알기 어렵습니다.",
        "scope": [
          "캠페인 목표·채널·예산 범위 협의",
          "검색·콘텐츠 광고 메시지 기획",
          "랜딩페이지 및 문의 측정 구조 점검",
          "운영 결과 보고와 소재·타깃 개선"
        ]
      }
    ]
  },
  {
    "key": "ai-search",
    "title": "AI 검색 마케팅",
    "href": "/ai-search",
    "headline": "검색과 AI가 이해할 수 있는 브랜드 정보를 만듭니다.",
    "description": "SEO·AEO·GEO를 연결해 브랜드의 공식 정보와 근거를 정리하고 발견 가능성을 점검합니다.",
    "audience": "검색과 AI 답변 속 브랜드 정보의 정확성과 노출 기반을 개선하려는 본사",
    "problems": [
      "우리 브랜드 정보가 채널마다 다릅니다.",
      "AI 답변에 오래되거나 부정확한 정보가 나타납니다."
    ],
    "children": [
      {
        "title": "SEO 검색 최적화",
        "href": "/ai-search/seo",
        "description": "고객의 검색 의도에 맞는 공식 페이지를 정비합니다.",
        "problem": "좋은 콘텐츠가 있어도 검색에서 찾기 어렵습니다.",
        "scope": [
          "페이지 제목·설명·정보 구조 점검",
          "검색 의도별 콘텐츠 구성",
          "내부 링크·색인·모바일 접근성 점검",
          "공식 정보와 갱신 기준 관리"
        ]
      },
      {
        "title": "AEO 답변 검색 최적화",
        "href": "/ai-search/aeo",
        "description": "고객의 질문에 명확하게 답하는 콘텐츠를 설계합니다.",
        "problem": "상담에서 반복되는 질문에 공식 페이지가 충분히 답하지 못합니다.",
        "scope": [
          "고객 질문과 상담 FAQ 수집",
          "질문·답변 중심의 콘텐츠 구조",
          "출처·조건·근거를 포함한 설명",
          "답변 정보의 정확성과 일관성 점검"
        ]
      },
      {
        "title": "GEO 생성형 AI 최적화",
        "href": "/ai-search/geo",
        "description": "AI가 참고할 수 있는 브랜드의 맥락과 근거를 정리합니다.",
        "problem": "AI가 우리 브랜드를 이해할 공식 자료가 부족합니다.",
        "scope": [
          "브랜드·서비스 핵심 정보 정리",
          "확인 가능한 전문성·사례 근거 구성",
          "홈페이지와 외부 채널의 정보 일치",
          "질문별 AI 답변 기록과 변화 관찰"
        ]
      },
      {
        "title": "AI 검색 노출 진단",
        "href": "/ai-search/diagnosis",
        "description": "브랜드가 어떤 질문에서 어떻게 설명되는지 확인합니다.",
        "problem": "AI에서 브랜드가 보이지 않는 이유를 막연하게 추측하고 있습니다.",
        "scope": [
          "브랜드·업종 관련 질문 선정",
          "검색 결과와 AI 답변의 현황 기록",
          "정보 누락·불일치·근거 부족 점검",
          "SEO·AEO·GEO 개선 과제 우선순위"
        ]
      }
    ]
  },
  {
    "key": "content",
    "title": "콘텐츠 제작",
    "href": "/content",
    "headline": "브랜드의 강점을 고객이 이해할 수 있는 콘텐츠로.",
    "description": "홈페이지, 블로그, 영상과 매뉴얼을 하나의 브랜드 메시지와 고객 행동으로 연결합니다.",
    "audience": "브랜드 설명과 상담 전환을 개선할 콘텐츠가 필요한 본사",
    "problems": [
      "채널마다 메시지와 디자인이 달라 신뢰를 주기 어렵습니다.",
      "콘텐츠를 만들어도 다음 행동으로 이어지지 않습니다."
    ],
    "children": [
      {
        "title": "홈페이지·랜딩페이지 제작",
        "href": "/content/website",
        "description": "브랜드 이해에서 문의까지 자연스러운 동선을 설계합니다.",
        "problem": "방문자가 핵심 서비스와 문의 경로를 찾기 어렵습니다.",
        "scope": [
          "사이트맵과 고객별 정보 구조",
          "브랜드 메시지·페이지 카피 정리",
          "PC·모바일 화면과 문의 동선",
          "검색 기본 정보·링크·폼 검수"
        ]
      },
      {
        "title": "네이버 블로그·플레이스 운영",
        "href": "/content/naver",
        "description": "고객이 확인하는 브랜드와 매장 정보를 일관되게 관리합니다.",
        "problem": "영업 정보와 콘텐츠가 오래되거나 매장마다 다르게 노출됩니다.",
        "scope": [
          "블로그·플레이스 현황 진단",
          "브랜드·지역·고객 질문 기반 콘텐츠",
          "매장 기본 정보와 운영 기준 정비",
          "게시 일정·리뷰 응대 방향·갱신 관리"
        ]
      },
      {
        "title": "유튜브·쇼츠·릴스 제작",
        "href": "/content/shortform",
        "description": "짧은 영상 안에 브랜드가 선택받을 이유를 담습니다.",
        "problem": "영상이 제품 소개에 머물러 브랜드의 차별점이 전달되지 않습니다.",
        "scope": [
          "채널 목적·타깃·영상 주제 기획",
          "스크립트·촬영 구성·현장 제작",
          "플랫폼별 편집·자막·썸네일",
          "게시와 후속 문의를 잇는 CTA"
        ]
      },
      {
        "title": "브랜드 홍보영상 제작",
        "href": "/content/brand-film",
        "description": "브랜드 이야기와 현장의 노하우를 영상으로 정리합니다.",
        "problem": "본사의 설명과 현장 교육 내용이 담당자마다 다릅니다.",
        "scope": [
          "브랜드 소개·인터뷰·현장 스토리 구성",
          "홍보영상 기획·촬영·편집",
          "프랜차이즈 운영 매뉴얼 콘텐츠 통합",
          "교육용 영상의 정보 구조와 활용 가이드"
        ]
      }
    ]
  },
  {
    "key": "education",
    "title": "마케팅교육",
    "href": "/education",
    "headline": "알고 끝나는 교육에서, 현장에서 실행하는 교육으로.",
    "description": "본사 직원·슈퍼바이저·점주의 역할에 맞춰 마케팅과 AI 활용을 실무 과제로 연결합니다.",
    "audience": "담당자의 역할과 현장 수준에 맞는 교육 체계를 만들려는 본사",
    "problems": [
      "교육 이후 실제 업무에서 무엇을 바꿀지 불명확합니다.",
      "본사·SV·점주에게 같은 내용만 전달하고 있습니다."
    ],
    "children": [
      {
        "title": "프랜차이즈 본사 직원 교육",
        "href": "/education/hq",
        "description": "마케팅과 운영이 같은 목표를 바라보도록 합니다.",
        "problem": "부서 간 고객 정보와 실행 과제가 연결되지 않습니다.",
        "scope": [
          "프랜차이즈 고객 여정 이해",
          "가맹모집 콘텐츠와 상담 연결",
          "본사·가맹점 협업 구조",
          "성과 보고와 개선 회의"
        ]
      },
      {
        "title": "슈퍼바이저 교육",
        "href": "/education/supervisor",
        "description": "점검을 넘어 현장 문제를 함께 해결하는 SV 역량을 기릅니다.",
        "problem": "방문 보고가 점검으로 끝나 점주 실행으로 이어지지 않습니다.",
        "scope": [
          "SV의 역할과 가맹점 커뮤니케이션",
          "매장 현황 진단과 핵심 지표 읽기",
          "점주 상담 및 갈등 상황 대응",
          "방문 보고서와 개선 실행 계획"
        ]
      },
      {
        "title": "가맹점주 교육",
        "href": "/education/owner",
        "description": "우리 매장에서 바로 적용할 실행 계획을 만듭니다.",
        "problem": "교육 내용을 지역 고객과 매장 상황에 적용하기 어렵습니다.",
        "scope": [
          "매장 고객과 지역 상권 이해",
          "온라인 매장 정보와 리뷰 관리",
          "고객 응대와 재방문 경험",
          "우리 매장 마케팅 실행 계획"
        ]
      },
      {
        "title": "AI 마케팅·업무 자동화 교육",
        "href": "/education/ai",
        "description": "AI 도구를 실무에 연결하고 결과를 검증하는 습관을 만듭니다.",
        "problem": "AI 도구는 사용하지만 반복 업무와 브랜드 맥락에 연결하지 못합니다.",
        "scope": [
          "AI 도구의 활용 범위와 검증 습관",
          "브랜드 맥락을 담는 프롬프트",
          "검색 질문 기반 콘텐츠 기획",
          "SEO·AEO·GEO와 반복 업무 자동화 실습"
        ]
      }
    ]
  },
  {
    "key": "project",
    "title": "프로젝트",
    "href": "/project",
    "headline": "결과보다 먼저, 문제와 해결 과정을 투명하게.",
    "description": "마케팅과 교육의 진행 방식, 공개 가능한 현장 자료와 사례의 확인 기준을 소개합니다.",
    "audience": "유사 과제의 접근 방법과 협업 기준을 검토하려는 담당자",
    "problems": [
      "성과 숫자만으로 우리 브랜드와의 적합성을 판단하기 어렵습니다.",
      "사례의 대상·범위·근거를 함께 확인하고 싶습니다."
    ],
    "children": [
      {
        "title": "마케팅 프로젝트 사례",
        "href": "/project/marketing",
        "description": "브랜드의 과제와 실행 과정을 중심으로 사례를 살펴봅니다.",
        "problem": "다른 브랜드의 결과를 우리 상황에 그대로 적용해도 되는지 모르겠습니다.",
        "scope": [
          "초기 브랜드 과제와 진행 범위",
          "진단·전략·콘텐츠·광고 실행 과정",
          "측정 기간과 비교 기준",
          "공개 승인된 결과와 후속 개선"
        ]
      },
      {
        "title": "교육·강의 사례",
        "href": "/project/education",
        "description": "교육 대상과 현장 과제에 맞춘 진행 방식을 소개합니다.",
        "problem": "교육 주제만으로 참여자의 업무에 도움이 될지 판단하기 어렵습니다.",
        "scope": [
          "본사·SV·점주별 교육 대상",
          "실무 과제와 커리큘럼 구성",
          "현장 실습과 실행 계획",
          "공개 가능한 현장 자료와 피드백"
        ]
      },
      {
        "title": "고객사·파트너",
        "href": "/project/partners",
        "description": "협업의 범위와 공개 기준을 명확하게 안내합니다.",
        "problem": "로고만으로 실제 수행 업무와 협업 관계를 알기 어렵습니다.",
        "scope": [
          "브랜드 상황과 필요 역량 확인",
          "담당 역할·일정·자료 공유 방식",
          "콘텐츠와 상표의 공개 승인",
          "협업 결과와 후속 과제 점검"
        ]
      },
      {
        "title": "담당자 후기",
        "href": "/project/reviews",
        "description": "실제 담당자의 경험을 확인 가능한 맥락과 함께 전달합니다.",
        "problem": "추천 문구가 어떤 프로젝트에서 나온 것인지 궁금합니다.",
        "scope": [
          "프로젝트 분야와 담당자 역할",
          "협업 과정에서의 경험",
          "확인 가능한 원문과 공개 동의",
          "개인정보·브랜드 정보 공개 범위"
        ]
      }
    ]
  },
  {
    "key": "insight",
    "title": "인사이트",
    "href": "/insight",
    "headline": "프랜차이즈 현장에 필요한 질문과 실무 기준.",
    "description": "마케팅, AI 검색, 매장 운영과 교육에 관한 기존 콘텐츠를 주제별로 연결합니다.",
    "audience": "우리 브랜드의 문제를 먼저 정리하고 실무 참고 자료를 찾는 담당자",
    "problems": [
      "정보는 많지만 우리 상황에서 어떤 질문을 해야 할지 어렵습니다.",
      "실행에 활용할 수 있는 구체적인 점검 기준이 필요합니다."
    ],
    "children": [
      {
        "title": "프랜차이즈 마케팅 칼럼",
        "href": "/insight/column",
        "description": "가맹모집과 브랜드 성장의 기본 질문을 정리합니다.",
        "problem": "광고 집행 전에 브랜드의 선택 이유를 정리하지 못했습니다.",
        "scope": [
          "브랜드 선택 이유와 가맹 고객 질문",
          "홈페이지·콘텐츠·상담 연결",
          "측정과 개선을 위한 점검 기준",
          "현재 발행된 마케팅 칼럼"
        ]
      },
      {
        "title": "AI 검색 마케팅 자료",
        "href": "/insight/ai-search",
        "description": "SEO·AEO·GEO를 정확한 브랜드 정보에서 시작합니다.",
        "problem": "AI 도구의 변화 속에서 무엇을 먼저 정비할지 어렵습니다.",
        "scope": [
          "공식 브랜드 정보 정리",
          "질문에 답하는 콘텐츠 구성",
          "출처와 갱신 기준 관리",
          "현재 발행된 AI 검색 자료"
        ]
      },
      {
        "title": "가맹점 매출 활성화 팁",
        "href": "/insight/tips",
        "description": "현장에서 실행할 작은 개선 과제를 찾습니다.",
        "problem": "본사 교육과 콘텐츠를 우리 매장의 행동으로 옮기기 어렵습니다.",
        "scope": [
          "지역 고객과 매장 정보 확인",
          "고객 응대와 재방문 경험",
          "점주 실행 계획과 현장 피드백",
          "교육과 실무 적용 관련 기존 글"
        ]
      },
      {
        "title": "프차언니 유튜브",
        "href": "/insight/youtube",
        "description": "프랜차이즈 마케팅과 교육 이야기를 영상으로 만나세요.",
        "problem": "글로만 이해하기 어려운 현장 이야기를 찾고 있습니다.",
        "scope": [
          "공식 프차언니 채널 안내",
          "프랜차이즈 마케팅 주제",
          "교육·컨설팅 관점의 실무 콘텐츠",
          "공식 채널에서 최신 영상 확인"
        ]
      }
    ]
  }
];
export const allNavigationPages=navigation.flatMap(g=>[g,...g.children]);
export const contactHref=(service:string)=>`/contact?service=${encodeURIComponent(service)}`;
export const serviceOptions=navigation.filter(g=>!['about','project','insight'].includes(g.key)).map(g=>({value:g.key,label:g.title}));
export const companyContact={phone:'02-6949-6859',tel:'0269496859',email:'yumone300@gmail.com',address:'서울시 서초구 남부순환로350길 11, 8층'}; // User-supplied final PDF footer.
export const legacyRoutes:Record<string,string>={'/services':'/franchise','/services/franchise':'/franchise','/services/marketing':'/franchise/ads','/services/ai-search':'/ai-search','/services/consulting':'/franchise/diagnosis','/education/headquarters':'/education/hq','/education/sv':'/education/supervisor','/education/franchisee':'/education/owner','/education/ai-marketing':'/education/ai','/cases':'/project','/insights':'/insight'};
