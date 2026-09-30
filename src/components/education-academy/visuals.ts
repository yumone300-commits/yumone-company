import {educationPhotos,livePracticeTopics,type EducationPhoto} from '@/data/education-visuals';
const esc=(value:string)=>value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
export function educationPhoto(photo:EducationPhoto,kind:string):string {
 // The catalog is below the page hero; all photographs can load lazily.
 return `<figure class="catalog-photo catalog-photo-${esc(kind)}"><img src="${esc(photo.src)}" width="${photo.width}" height="${photo.height}" alt="${esc(photo.alt)}" style="object-position:${esc(photo.position)}" loading="lazy" decoding="async"><figcaption>${esc(photo.caption)}</figcaption></figure>`;
}
export function productVisual(id:string,mode:string,title:string,audience:string,preparing:boolean):string {
 if(id==='offline-sv'||id==='offline-owner')return educationPhoto(educationPhotos[id],'card');
 if(livePracticeTopics[id])return `<div class="catalog-practice"><span>실습 주제 예시</span><p>${esc(livePracticeTopics[id])}</p></div>`;
 if(mode==='vod'||mode==='ebook')return digitalVisual(mode,title,audience,preparing);
 return '';
}
export function liveVisual():string {
 return `<figure class="catalog-live-visual"><div class="catalog-laptop" aria-hidden="true"><div class="catalog-laptop-screen"><div class="catalog-screen-bar"><span>온라인 실시간</span><span>함께 배우는 시간</span></div><div class="catalog-screen-lesson"><span>설명부터 실습까지</span><strong>같은 주제로 배우고,<br>함께 적용해 봅니다.</strong><ol><li><b>01</b>개념 설명</li><li><b>02</b>함께 실습</li><li><b>03</b>질문 정리</li></ol></div></div><div class="catalog-laptop-base"></div></div><figcaption><strong>수강 방식 예시</strong><span>정해진 시간에 함께 배우는 실시간 교육</span><small>실제 플랫폼 화면이 아닌 설명용 목업입니다.</small></figcaption></figure>`;
}
export function digitalVisual(mode:'vod'|'ebook',title?:string,audience?:string,preparing=true):string {
 // Unapproved draft titles never reach this helper. Empty shelves show format examples only.
 const label=(mode==='vod'?'썸네일 시안':'표지 시안')+(preparing?' · 출시 준비 중':' · 실제 콘텐츠 화면이 아닌 설명용 목업');
 const heading=title||(mode==='vod'?'녹화 강의':'실무 전자책');
 if(mode==='vod')return `<figure class="catalog-digital-visual catalog-vod-visual"><div class="catalog-video-cover" aria-hidden="true"><span class="catalog-cover-format">VOD · 녹화 강의</span><strong>${esc(heading)}</strong><span class="catalog-cover-audience">${esc(audience||'SV · 가맹점주 교육')}</span><div class="catalog-film-edge"></div></div><figcaption>${label}${title?'':'<small>특정 상품이 아닌 형식 예시입니다.</small>'}</figcaption></figure>`;
 return `<figure class="catalog-digital-visual catalog-ebook-visual"><div class="catalog-book-cover" aria-hidden="true"><span class="catalog-book-brand">YUMONE COMPANY</span><span class="catalog-cover-format">전자책</span><strong>${esc(heading)}</strong><span class="catalog-book-rule"></span><span class="catalog-cover-audience">${esc(audience||'필요한 내용을 찾아보는 자료')}</span></div><figcaption>${label}${title?'':'<small>실제 표지·본문·목차는 출시 시 안내합니다.</small>'}</figcaption></figure>`;
}
