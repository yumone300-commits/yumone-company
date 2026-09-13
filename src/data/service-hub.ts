// 사업분야 허브 전용 데이터. 기존 HOME과 서비스 상세 데이터는 변경하지 않습니다.
export const serviceHub = {
  hero: {eyebrow:'OUR SERVICE',title:'프랜차이즈의 문제를\n성장 전략으로 바꿉니다.',description:'가맹 문의, 브랜드 마케팅, 가맹점 활성화,\nAI 검색, 교육까지\n프랜차이즈 성장에 필요한 영역을 연결합니다.'},
  problems:[
    {title:'가맹 문의가 줄고 있습니다.',label:'성장 시스템 살펴보기',href:'#franchise'},
    {title:'광고비는 늘지만 성과가 떨어집니다.',label:'마케팅 살펴보기',href:'#marketing'},
    {title:'AI에서 경쟁 브랜드만 추천됩니다.',label:'AI 검색 마케팅 살펴보기',href:'#ai-search'},
    {title:'가맹점 매출과 점주 만족도가 떨어집니다.',label:'경영·성장 컨설팅 살펴보기',href:'#consulting'},
    {title:'본사·SV·점주 교육 체계가 필요합니다.',label:'교육프로그램 살펴보기',href:'/education'},
  ],
  services:[
    {slug:'franchise',title:'프랜차이즈 성장 시스템',eyebrow:'FRANCHISE GROWTH SYSTEM',image:'building',problem:'가맹 문의가 줄고, 확장을 뒷받침할 본사 운영 기준이 부족합니다.',solution:'브랜드 진단부터 가맹 상담 프로세스, 운영 매뉴얼과 성장 로드맵까지 연결합니다.',audience:'가맹사업을 준비하거나 전국 확장을 앞둔 프랜차이즈 본사'},
    {slug:'marketing',title:'온·오프라인 마케팅',eyebrow:'FRANCHISE MARKETING',image:'marketing',problem:'광고비는 늘지만 유효 문의와 매장 방문으로 이어지지 않습니다.',solution:'검색·SNS·콘텐츠·광고의 메시지를 맞추고 가맹모집과 매장 활성화 캠페인을 설계합니다.',audience:'가맹 문의의 질과 마케팅 효율을 개선하려는 본사·마케팅 담당자'},
    {slug:'ai-search',title:'AI 검색 마케팅',eyebrow:'SEO · AEO · GEO',image:'marketing',problem:'AI에서 경쟁 브랜드가 추천되고, 우리 브랜드의 공식 정보는 충분히 전달되지 않습니다.',solution:'공식 정보와 질문형 콘텐츠, 기술 SEO를 정비하고 검색에서의 발견 가능성을 점검합니다.',audience:'AI 검색 시대에 브랜드 정보와 경쟁력을 정비하려는 프랜차이즈 본사'},
    {slug:'consulting',title:'경영·성장 컨설팅',eyebrow:'GROWTH CONSULTING',image:'education',problem:'가맹점 매출과 점주 만족도가 떨어지고, 본사와 현장의 우선순위가 다릅니다.',solution:'경영·운영 현황을 진단하고 실행 과제, 부서별 계획과 후속 점검 기준을 수립합니다.',audience:'기존 가맹점의 운영을 개선하고 다음 성장 방향을 정하려는 본사'},
  ],
  process:[
    {title:'진단',description:'브랜드 현황과 본사·가맹점의 과제를 함께 확인합니다.'},
    {title:'전략',description:'해결할 문제의 우선순위와 실행 방향을 정합니다.'},
    {title:'실행',description:'마케팅·운영·교육을 연결해 계획을 현장에 적용합니다.'},
    {title:'측정',description:'합의한 지표와 현장 피드백으로 변화를 확인합니다.'},
    {title:'개선',description:'확인된 결과를 바탕으로 다음 실행을 보완합니다.'},
  ],
  strengths:[
    {title:'20년 프랜차이즈 경험',description:'산업과 현장의 구조 이해'},
    {title:'마케팅',description:'발견부터 문의까지 연결'},
    {title:'교육',description:'전략을 현장의 실행으로'},
    {title:'AI',description:'검색 변화에 맞는 브랜드 전략'},
  ],
};
