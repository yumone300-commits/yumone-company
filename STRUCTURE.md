# 염원컴퍼니 홈페이지 구조

먼저 공통 레이아웃과 HOME을 완성한 뒤 상세 페이지를 확장합니다.

```text
app/
  layout.tsx, globals.css, page.tsx
  about/page.tsx
  services/page.tsx, [slug]/page.tsx
  education/page.tsx, [slug]/page.tsx
  cases/page.tsx, [slug]/page.tsx
  insights/page.tsx, [slug]/page.tsx
  contact/page.tsx
  privacy/page.tsx, terms/page.tsx
  sitemap.ts, robots.ts
src/
  components/ — Header, Footer, Button, Container, Card, forms, filters
  data/ — site config, services, education, cases, insights
  lib/ — metadata, structured data, mock contact adapter
public/images/ — 교체 가능한 이미지
```

디자인: 목업의 흰 배경·검정 타이포·레드 CTA, 절제된 네이비 섹션. 모든 페이지 동일한 1200px 컨테이너. 대표 인물은 placeholder. 사례와 수치는 확인된 제공 정보만 사용.
