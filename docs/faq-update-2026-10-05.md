# 고객지원 FAQ 개편 — 2026-10-05

## 저장 위치와 편집

- 공개 경로: `/support/faq/` (기존 경로 유지)
- 공식 승인 원고: `src/data/faq-approved.json`. 질문/핵심 답변/상세 답변/관련 링크/내부 검색 보조어를 편집 후 배포합니다. ID는 변경하지 않습니다.
- 기존 노션 고객지원 DB에도 원본ID를 키로 15개를 등록했습니다. 기존 FAQ 초안 6개와 공지·자료 데이터는 보존했습니다. 재조회 결과 발행 FAQ 15개, 초안 6개이며 승인 원고와 제목·요약·본문이 일치했습니다.
- 노션에서 `요약`은 핵심 답변, `본문`은 상세 답변입니다. 유형 FAQ, 공개상태 발행, 공개검수 체크, 발행일 조건을 만족하면 공개됩니다.
- 홈페이지 서버에 NOTION_TOKEN이 연결되면 동일 원본ID의 노션 수정본이 파일 콘텐츠를 대체합니다. 공개 해제는 정상 CMS 조회 시 반영됩니다. 장애 시에는 저장소의 승인 버전을 제공합니다. 긴급 삭제는 파일에서도 삭제하고 배포해야 합니다.
- 노션 서버 연결 전에는 노션 편집만으로 웹사이트가 자동 갱신되지 않습니다. 현재는 저장소 파일을 함께 갱신해 배포해야 합니다. 비밀키를 공개 클라이언트에 추가하지 않았습니다.

## 확인된 오류 원인

변경 전 Vercel FAQ는 HTTP 200이었지만 `data-content-source="snapshot"`과 조회 실패 안내를 반환했습니다. 코드에서 snapshot 분기는 NOTION_TOKEN 미설정 시에만 사용되며, 당시 스냅샷에는 공지 7개만 있었습니다. `publicSupport`는 notices만 ready로 바꾸고 FAQ는 unconfigured를 유지해 오류를 출력했습니다. 즉 브라우저의 별도 FAQ API 오류가 아니라 서버 렌더링 과정의 데이터 미설정 상태였습니다.

FAQ 전용 경로에서 승인 원고를 기본 소스로 사용하고 건강한 CMS 결과를 안정 ID로 병합하도록 수정했습니다. 기존 CMS와 관리자 기능, 공지·자료 조회 함수는 변경하지 않았습니다. 서버 토큰 연결 자체는 이번 작업에서 해결하지 않았습니다.

## 코드

- `app/support/faq/page.tsx`: 실제 전용 경로, SSR, 메타데이터, JSON-LD, 상담 영역
- `src/components/support/faq.tsx`, `faq.module.css`: 검색·카테고리·아코디언·해시·복사·반응형
- `src/lib/support/faq-data.ts`: CMS 병합, 검색, FAQPage 생성
- `src/data/faq-approved.json`: 승인 원고 15개
- `scripts/support/test-faq.cjs`, `verify-faq-html.py`: 데이터 및 실제 응답 검증

## 테스트

- 전체 15개, 마케팅/교육/자료·문의 각각 5개, 중복 없음
- 검색: 마케팅 비용 1개, 슈퍼바이저 1개, AI 3개, 전자책 1개, 다운로드 1개. 앞뒤 공백과 ai 대소문자 처리, 교육+AI 1개 확인
- 결과 없음과 오류 구분, 검색 초기화, Enter/검색 버튼 확인
- native details/summary: 첫 질문 펼침, 키보드 Enter 닫기/Space 열기, 링크 복사 성공 안내, 해시 직접 접속 펼침 확인
- 실제 문의 링크를 눌러 `/contact/` 입력 폼 표시 확인. 문의는 제출하지 않았습니다.
- 초기 HTTP 응답의 details 본문에 질문·핵심 답변·상세 답변 15개 모두 존재. JSON-LD 답변과 동일
- 무자격증명 서버와 잘못된 토큰으로 노션 조회가 실패하는 서버 모두 승인 FAQ 표시 확인
- CMS 동일 ID 수정/중복/비공개/장애 fallback 병합 단위 검사 통과
- canonical/og:url: `https://www.yumone.co.kr/support/faq/`. 사이트맵에 1회 포함. 기본 FAQ index,follow. 검색 조건 URL은 noindex,follow. 검색 보조어는 본문 SEO 문장이나 meta keywords로 출력하지 않음
- [Schema.org FAQPage](https://schema.org/FAQPage)의 Question/acceptedAnswer/Answer 구조와 화면 원문 일치 검사 통과. 검색 순위·리치 결과·AI 인용을 보장하지 않음
- PC 1440px, 모바일 360/390px에서 가로 넘침 없음. 기존 헤더·푸터·고객지원 탭 유지
- 관련 서비스, 교육, 무료 자료실, 문의, 공지, 블로그 경로 HTTP 200 확인. 자료실의 기존 CMS 미연결 상태는 이번 범위에서 변경하지 않음
- 타입 검사 및 프로덕션 빌드 통과. 변경 TS/TSX 파일 lint 통과
- 전체 lint는 기존 오류 2건으로 실패: `app/claude-home.tsx:410` no-html-link-for-pages, `src/components/analytics-page-view.tsx:17` prefer-rest-params. 기존 경고 22건도 존재. FAQ 외 기능 변경을 피하기 위해 수정하지 않음

## 운영 도메인 제한

작업 시작 시 `https://www.yumone.co.kr/support/faq/` 요청은 `https://www.yumone.co.kr/`로 이동했습니다. 정식 도메인에서 이 프로젝트의 FAQ를 확인하지 못했으며 DNS·SSL·리디렉션은 수정하지 않았습니다. Vercel 공개 FAQ와 정식 도메인 반영은 구분해야 합니다.
