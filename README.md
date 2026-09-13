# 염원컴퍼니 공식 홈페이지

Next.js 16.3.4 · React · TypeScript · Tailwind CSS 4 · App Router 기반 반응형 멀티페이지 사이트입니다. 기존 초안을 사용자 브리프에 맞춰 완성했습니다. 공통 컨테이너는 1200px입니다.

## 페이지 목록 (24개)
- `/`: 문제 제기 → 서비스 → AI 검색 → 차별점 → 사례 → 대표 → 교육 → 인사이트 → 상담
- `/about`: 회사소개, 대표소개, 핵심가치, 경력·실적, WHY YUMONE
- `/services`, `/services/franchise`, `/services/marketing`, `/services/ai-search`, `/services/consulting`
- `/education`, `/education/sv`, `/education/franchisee`, `/education/headquarters`, `/education/ai-marketing`
- `/cases`, `/cases/franchise-system`, `/cases/brand-marketing`, `/cases/field-education`, `/cases/ai-discovery`
- `/insights`, `/insights/franchise-growth-checklist`, `/insights/ai-brand-information`, `/insights/education-to-action`
- `/contact`, `/privacy`, `/terms`

## 구조와 주요 컴포넌트
전체 파일 트리는 `STRUCTURE.md`에 있습니다.
- `src/components/header.tsx`: 공통 로고, sticky 헤더, 모바일 메뉴, Escape 닫기
- `src/components/footer.tsx`: 공통 푸터와 정책 링크
- `src/components/ui.tsx`: Container, Button, SectionTitle, Photo, PageHero, FinalCTA, Breadcrumb
- `src/components/portrait.tsx`: 실제 대표 사진 설정 또는 명시적 placeholder
- `src/components/case-grid.tsx`, `insight-grid.tsx`: 목록 필터, 빈 결과
- `src/components/contact-form.tsx`: 필수값 검사, 문의 분야 자동 선택, 모의 제출 상태
- `src/lib/contact.ts`: 이메일/CRM/API로 교체할 접수 어댑터. 현재 저장·전송 없음
- `src/lib/seo.tsx`: 페이지 metadata, JSON-LD, BreadcrumbList

## 데이터와 설정
- `src/data/site.ts`: 회사 정보, URL, 로고·대표 사진 경로, 경력, 실적, 신뢰 수치, 이미지 경로
- `src/data/services.ts`: 사업분야 설명, 과제, 산출물, 프로세스, FAQ
- `src/data/education.ts`: 대상, 커리큘럼, 교육 결과물
- `src/data/content.ts`: 사례 예시와 인사이트 편집 초안
- `.env.example`: 공식 URL 설정 예시. 실제 도메인 연결 후 NEXT_PUBLIC_SITE_URL 변경 및 재빌드
- `app/sitemap.ts`, `robots.ts`: 검색 엔진 설정. 실제 사례가 아닌 구성 예시는 sitemap에서 제외
- Organization, Person, Service, Article, BreadcrumbList, FAQPage 구조화 데이터 구현

## 이미지 목록
- `public/images/building.webp`: 기존 프로젝트에 있던 건물 참고 사진. 회사의 실제 사옥이 아님
- `public/images/marketing.webp`: 기존 프로젝트의 마케팅 참고 사진
- `public/images/education.webp`: 기존 프로젝트의 교육 참고 사진. 실제 염원컴퍼니 강의 현장이 아님
- 동일 이름 JPG는 원본 보관용이며 페이지는 WebP를 사용
- 위 세 이미지의 출처·라이선스 기록이 기존 프로젝트에 없어 공개 전 권리 확인 또는 자사 사진 교체 필요
- `public/icon.svg`: 임시 브랜드색 Y 파비콘
- 로고 원본이 별도 제공되지 않아 현재 Y 워드마크 사용. `site.logo`에 실제 로고 경로를 넣으면 헤더·푸터에 자동 반영
- 대표 사진은 임의 인물을 사용하지 않음. `site.ceoPhoto`에 파일 경로 설정 시 HOME·ABOUT에 자동 반영
- 사용자 목업 전체 이미지를 웹페이지 배경으로 사용하지 않음

## 운영 전 TODO
1. 공식 로고, 대표 사진, 실제 강의 사진과 이미지 사용 권한 확정
2. 주소, 전화, 이메일, 사업자번호, 개인정보 담당자·보유 기간 입력
3. 브리프의 20년+, 200+, 900+ 경험 수치 증빙 확인
4. 대표 경력과 주요 실적 입력
5. 구성 예시 4건을 공개 동의된 고객 사례로 교체. BEFORE → PROBLEM → STRATEGY → EXECUTION → RESULT → CLIENT FEEDBACK 내용과 실제 근거 입력
6. 인사이트 3건은 편집 초안이므로 검토하고 실제 게시일 확정
7. 개인정보처리방침·이용약관 초안 확정
8. 접수 어댑터를 서버 API/CRM/이메일에 연결하고 서버 검증, 스팸 방어, 장애 처리를 추가. 현재 폼은 브리프대로 mock이며 실제 상담이 접수되지 않음
9. 공식 도메인 확정 후 canonical, sitemap, robots, 구조화 데이터 URL 재빌드

## 실행과 검수
- 개발: `pnpm dev`
- 빌드: `pnpm build` (`out/` 정적 출력)
- 타입 검사: `pnpm typecheck`
- 정적 검사: `python scripts/audit.py` → `QA-static.json`
- 브라우저 검사: Playwright와 Microsoft Edge 설치 후 `node scripts/browser-qa.cjs`. 필요 시 PLAYWRIGHT_MODULE, QA_URL 환경변수 사용
- `QA-browser.json`: 1440·1280·768·390px의 전 페이지 H1·이미지·가로 넘침, 모바일 메뉴, 사례 필터, 문의 자동 선택, 필수값 검사, 모의 제출 검증
- 서버 API가 없는 정적 출력이며 런타임 이미지 변환 대신 로컬 WebP와 이미지 크기 예약·lazy loading 사용

Windows 정적 출력의 중첩 RSC payload 경로는 scripts/normalize-export.cjs가 브라우저 요청 경로에 맞춰 별칭 파일을 생성합니다. build 스크립트에 포함되어 있습니다. 번들 Sites 빌드 도우미의 패키지 관리자 실행이 이 환경에서 실패해 동일 Next.js 빌드 명령과 정규화 스크립트를 직접 실행했습니다.

