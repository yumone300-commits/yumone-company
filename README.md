# 염원컴퍼니 공식 홈페이지

Next.js 16 App Router · React · TypeScript 기반 홈페이지입니다.

## 실행

- `pnpm dev`: 개발 서버
- `pnpm build`: 프로덕션 빌드
- `pnpm start`: 프로덕션 서버
- `pnpm typecheck`: 타입 검사

## 콘텐츠

- 공지사항: Notion CMS와 저장소의 원문 스냅샷을 사용합니다.
- 교육 상품관 및 SV 아카데미: `/education/`, `/lp/sv-academy/`
- 공개 승인 전 프로젝트 예시는 홈에서 숨깁니다. `src/data/publication.ts`에서 노출을 제어합니다.
- 원문 공지 이전 기록은 `scripts/support/`와 `content/`를 참조하세요.

## 현재 운영 설정 (2026-10-05)

Next.js 서버 라우트로 상담과 CMS를 처리합니다.
- 서버 전용 `FORM_ENDPOINT`: Apps Script 웹 앱의 /exec URL. Vercel Production 환경변수에 넣고 재배포합니다. 클라이언트에는 노출하지 않습니다.
- `NEXT_PUBLIC_SITE_URL`: 공개 Config 유형으로 설정. 기본값은 https://www.yumone.co.kr 입니다.
- `CANONICAL_REDIRECT_ENABLED=true`: 새 정식 도메인 DNS·인증서·페이지 확인 후에만 설정합니다. 이전 사이트가 아직 도메인을 사용하는 동안에는 false를 유지합니다.
- Google 수신기: `scripts/contact-receiver.gs`. 시트는 비공개로 유지하며 접수 ID로 중복을 방지합니다. 알림 메일 실패 시 접수 행은 유지되고 마지막 열에 실패 상태를 기록합니다.
- 로컬 `FORM_ENDPOINT`를 모의 수신 서버로 설정하면 실제 메일 발송 없이 검증할 수 있습니다.
- GTM만 분석 스크립트를 로드하며 성공 응답에서만 `lead_submit` 이벤트와 `form_id`를 보냅니다. 고객 입력값은 이벤트에 넣지 않습니다.
- 고객사별 노출: `src/data/publication.ts`의 clientVisibility에서 이름별 false를 설정합니다. 로고 공개 승인은 별도 운영 확인 대상입니다.
- 개인정보처리방침·이용약관 시행일: `src/lib/site.ts`의 POLICY_EFFECTIVE_DATE.
- 요청 제한은 서버 인스턴스의 1분 3회 제한과 수신기 공유 캐시를 사용합니다. 캐시 만료·삭제 시 새 제한 구간이 시작될 수 있습니다.
