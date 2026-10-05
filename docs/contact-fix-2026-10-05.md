# 교육 상담 접수 점검 (2026-10-05)

## 확인한 원인
- www.yumone.co.kr → yumone-company-db74 → POST /api/contact/ → FORM_ENDPOINT → 기존 Apps Script → 상담신청_통합 → 기존 관리자 메일.
- Production FORM_ENDPOINT 존재, 현행 웹앱은 소유자 권한/모든 사용자 접근. 환경변수 값은 write-only secret이므로 직접 열람하지 않음.
- 15:58:54 교육 요청은 Vercel에서 20.30초 후 502. 코드의 upstream timeout은 20초.
- 대응 Apps Script doPost는 15:58:55 시작, 4.216초 실행 완료. 시트 6행에 15:58:57 education-main /education/ 접수와 메일 발송 상태 완료 확인. 따라서 저장 자체가 아니라 완료 응답 전달 단계의 지연/시간 초과. 지연이 발생한 Google 응답 리디렉션의 내부 원인까지는 확인 불가.
- 16:04:53 일반 상담은 같은 배포/API에서 4.80초 후 200.
- 세 도메인 www / db74.vercel.app / yumone-company.vercel.app에서 빈 JSON은 모두 400: 저장 없이 입력 검증 및 동일 출처 처리 확인.

## 수정
- 수신 대기 20→50초, Vercel 함수 30→60초, 브라우저 25→65초.
- 동일 request_id/receiptId를 확인한 경우에만 성공. 수신 응답 미확인은 입력을 유지하고 같은 ID 재시도 안내.
- 개인정보나 수신 URL 없이 고정 오류 코드만 서버 로그에 기록.
- Apps Script는 저장 완료 후 메일/상태 셀 오류가 생겨도 접수 성공과 notification 실패를 분리.
- 기존 저장 시트, 수신 메일, 동의 값, 선택 항목, 중복 클릭 방지 및 재시도 접수 ID 유지.

## 검증
- scripts/test-contact.cjs: 필수/선택/동의/출처/환경변수 누락/HTML 응답/잘못된 접수번호/네트워크 실패/중복/메일·상태 셀 실패 통과.
- 변경 TS lint 및 production build 통과.
- 실제 개인정보를 사용한 신규 제출 없음. 운영 테스트 1건은 사용자 응답 대기.

## 운영 확인 위치
- 기존 스프레드시트 https://docs.google.com/spreadsheets/d/1UoeLQ4MIzhZowJcbsWTViTUgnwKiYJGQc2DmdSEI7XQ/edit
- 상담신청_통합: A 접수일시, B 신청 위치, N 접수 ID, O 메일 발송 상태.
- 메일 완료는 MailApp 호출 성공이며 실제 수신함 도착은 별도 확인 필요.
- 환경변수 추가/변경은 필요하지 않음. 설정 위치: Vercel yumone-company-db74 → Settings → Environment Variables → FORM_ENDPOINT → Production.
