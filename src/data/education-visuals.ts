export type EducationPhoto={src:string;alt:string;caption:string;width:number;height:number;position:string};
// Existing published landing assets. No dates, brands or attendee roles are inferred.
// Requested education_visual_assets files were not present; replace mappings when supplied.
export const educationPhotos={
 intro:{src:'/images/education-academy/original-05.jpg',alt:'교육장에서 테이블별로 앉아 발표와 설명을 듣는 참여자들',caption:'SV 실무 교육 현장',width:960,height:720,position:'50% 60%'},
 'offline-sv':{src:'/images/education-academy/original-04.jpg',alt:'역할극 자료가 표시된 화면 앞에서 함께 대화하는 교육 참여자들',caption:'SV 실무 교육 · 사례 토의와 역할극',width:960,height:681,position:'50% 58%'},
 'offline-owner':{src:'/images/education-academy/original-07.jpg',alt:'노트북과 교육 화면을 보며 AI 활용을 실습하는 참여자들',caption:'관련 교육 사례 · AI 마케팅 실전 교육 현장',width:960,height:649,position:'50% 53%'},
 group:{src:'/images/education-academy/original-06.jpg',alt:'교육장에서 발표자의 설명을 듣는 테이블별 참여자들',caption:'참여형 교육 · 발표와 현장 토의',width:960,height:720,position:'50% 50%'},
} satisfies Record<string,EducationPhoto>;
export const livePracticeTopics:Record<string,string>={'live-sv':'상황별 점주 소통 연습','live-owner':'우리 매장 홍보문 작성 실습'};
