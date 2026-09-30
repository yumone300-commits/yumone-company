import {canPurchase,educationModes,educationProducts,groupEducationPlan,inquiryProducts,productPlan,verifiedHttpsUrl,type EducationProduct} from '@/data/education-products';
import {educationPhotos} from '@/data/education-visuals';
import {educationPhoto,productVisual,liveVisual,digitalVisual} from '@/components/education-academy/visuals';

// This landing already uses reviewed static HTML. Escape every data value before interpolation.
const esc=(value:string)=>value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const options=(values:string[])=>values.map(v=>`<option value="${esc(v)}">${esc(v)}</option>`).join('');
function card(p:EducationProduct):string {
  const inquiry=p.status==='inquiry';
  const purchase=canPurchase(p);
  return `<article class="product-card" data-product="${esc(p.id)}">
    ${productVisual(p.id,p.mode,p.title,p.audience,!purchase)}
    <div class="product-badges"><span>${esc(p.audience)}</span><span>${esc(educationModes[p.mode])}</span></div>
    <h4>${esc(p.title)}</h4><p class="product-benefit">${esc(p.benefit)}</p>
    <ul>${p.contents.map(c=>`<li>${esc(c)}</li>`).join('')}</ul>
    ${inquiry?`<details><summary>교육 내용 보기</summary><p>${esc(p.description)}</p><p>${p.id==='offline-owner'?'상담 시 우선 주제를 선택합니다. 한 번의 짧은 교육에서 운영과 마케팅 모두를 완성하는 과정이 아닙니다.':'대상과 현장의 과제를 확인한 뒤 세부 주제와 실습 범위를 협의합니다.'}</p></details>`:''}
    <div class="product-bottom">${inquiry?`<p class="product-schedule">${esc(p.schedule||'일정 협의')}</p><p class="product-price">대상·인원·시간에 따라 견적</p><a class="btn btn-red product-cta" href="#apply" data-education-plan="${esc(productPlan(p))}" data-education-target="${p.target}" data-education-mode="${educationModes[p.mode]}">${esc(p.cta)} <span aria-hidden="true">→</span></a>`:purchase?`<p class="product-price">${p.price!.toLocaleString('ko-KR')}원 · ${esc(p.billing!)}</p><p>${esc(p.access!)}${p.duration?` · ${esc(p.duration)}`:''}</p>${p.includedMaterials.length?`<p>포함 자료: ${p.includedMaterials.map(esc).join(' · ')}</p>`:''}<a class="btn btn-red product-cta" href="${esc(p.purchaseUrl!)}">${esc(p.cta)}</a>${p.contentConfirmed&&verifiedHttpsUrl(p.sampleUrl)?`<a href="${esc(p.sampleUrl!)}">실제 샘플 보기</a>`:''}`:'<p class="product-status">출시 준비 중</p>'}</div>
  </article>`;
}
function digital(mode:'vod'|'ebook'):string {
 const products=educationProducts.filter(p=>p.mode===mode&&p.publicApproved&&['coming-soon','available'].includes(p.status));
 return products.length?`<div class="product-grid">${products.map(card).join('')}</div>`:`<div class="catalog-digital-shelf">${digitalVisual(mode)}<div class="product-pending"><span>출시 준비 중</span><p>${mode==='vod'?'녹화 강의의 구성·가격·수강 기간은 출시 시 안내합니다.':'전자책의 실제 목차·파일 형식·가격은 출시 시 안내합니다.'}</p><p>현재 구매 가능한 상품은 없습니다.</p></div></div>`;
}
export function educationCatalogHTML():string {
 return `<section class="product-catalog" id="education-products" aria-labelledby="catalog-title"><div class="wrap">
  <div class="catalog-opening"><div class="catalog-opening-copy">
  <p class="kicker">프랜차이즈 현장에 필요한 교육과 실무 자료</p>
  <h2 class="h2" id="catalog-title">우리 본사에 필요한 교육,<br>우리 매장에 필요한 실무.</h2>
  <p class="catalog-intro">함께 배우는 출강 교육부터 온라인 실시간 교육, 혼자 학습하는 VOD와 전자책까지.<br>대상과 상황에 맞는 방식으로 선택하세요.</p>
  </div>${educationPhoto(educationPhotos.intro,'intro')}</div>
  <nav class="catalog-nav" aria-label="교육 상품 빠른 이동"><a href="#education-offline">오프라인 강의</a><a href="#education-live">온라인 실시간</a><a href="#education-vod">VOD 강의</a><a href="#education-ebook">전자책</a></nav>
  <section class="catalog-group" id="education-offline" aria-labelledby="offline-title"><p class="catalog-category">A. 오프라인 강의</p><h3 id="offline-title">우리 직원과 점주가 함께 배우는 출강 교육</h3><p class="catalog-description">교육 대상과 현장의 고민을 먼저 확인하고, 필요한 주제와 실습을 함께 정합니다.</p><div class="product-grid">${inquiryProducts.filter(p=>p.mode==='offline').map(card).join('')}</div></section>
  <div class="catalog-online"><p class="catalog-category">B. 온라인 강의·전자책</p>
   <section class="catalog-group" id="education-live" aria-labelledby="live-title"><p class="catalog-format">온라인 실시간</p><h3 id="live-title">한자리에 모이기 어렵다면, 온라인에서 함께</h3><p class="catalog-description">정해진 시간에 접속해 설명을 듣고 질문하며 실습하는 본사·기관 단체 교육입니다.</p>${liveVisual()}<div class="product-grid">${inquiryProducts.filter(p=>p.mode==='live').map(card).join('')}</div></section>
   <section class="catalog-group" id="education-vod" aria-labelledby="vod-title"><p class="catalog-format">VOD 강의</p><h3 id="vod-title">내 일정에 맞춰 배우는 녹화 강의</h3>${digital('vod')}</section>
   <section class="catalog-group" id="education-ebook" aria-labelledby="ebook-title"><p class="catalog-format">전자책</p><h3 id="ebook-title">지금 필요한 내용을 빠르게 찾는 실무 전자책</h3><p class="catalog-description">긴 강의보다 필요한 예시와 체크리스트가 먼저인 분들을 위한 자료를 준비합니다.</p>${digital('ebook')}</section>
  </div>
  <aside class="catalog-group-offer" aria-labelledby="group-offer-title"><div><h3 id="group-offer-title">신입 SV 교육, 매번 처음부터 준비하지 마세요.</h3><p>직원·가맹점주 수에 맞춰 출강, 온라인 교육, 교재 구성을 상담하세요.</p><p class="catalog-help">VOD 단체 수강은 해당 강의 출시 및 운영 준비 후 제공됩니다.</p><p class="catalog-help">반복 교육이 필요한 기업은 상담 후 연간 파트너십의 범위를 정합니다.</p></div><a class="btn btn-red" href="#apply" data-education-plan="${groupEducationPlan}" data-education-target="함께" data-education-mode="상담 후 결정">우리 본사 단체 교육 견적 받기 <span aria-hidden="true">→</span></a>${educationPhoto(educationPhotos.group,'group')}</aside>
 </div></section>`;
}

export function withEducationCatalog(source:string):string {
 const start=source.indexOf('<section class="cta" id="apply">');
 const form=source.indexOf('<div class="form-wrap">',start);
 const end=source.indexOf('</section>',form);
 if(start<0||form<0||end<0)throw new Error('Education catalog insertion point not found');
 let inquiry=source.slice(form,end);
 inquiry=inquiry.replace('<div class="form-wrap">','<div class="form-wrap" aria-labelledby="inquiry-title">')
  .replace('<h3>다음 분기 SV 교육,<br>지금 일정 잡아 두세요</h3>','<h3 id="inquiry-title">우리 조직에 맞는 교육,<br>함께 정리해 보세요.</h3>')
  .replace('남겨 주시면 1일 안에 연락드리고, 귀사에 맞춘 교육안을 보내 드립니다. 비용은 대상·인원·시간에 따라 상담 후 안내합니다.','교육 대상과 필요한 주제를 알려주세요. 일정·내용을 협의한 뒤 대상·인원·시간에 맞춰 견적을 안내합니다.')
  .replace('본사(브랜드)명</label>','본사·기관명</label>')
  .replace('SV 인원</label>','예상 인원 (선택)</label>')
  .replace('<select id="f-sv" name="sv">','<select id="f-sv" name="sv"><option selected>미정</option>')
  .replace('<option selected>4~10명</option>','<option>4~10명</option>')
  .replace('<label for="f-plan">관심 있는 방식</label>','<label for="f-plan">관심 상품 (선택)</label>')
  .replace('<option selected>1회 특강</option>',`<option selected value="">아직 정하지 않았어요</option>${options([...inquiryProducts.map(productPlan),groupEducationPlan])}<option>1회 특강</option>`)
  .replace('<div class="f full"><label for="f-plan">',`<div class="f"><label for="f-target">교육 대상</label><select id="f-target" name="target" required><option value="">선택해 주세요</option>${options(['SV','가맹점주','함께'])}</select></div><div class="f"><label for="f-delivery">진행 방식 (선택)</label><select id="f-delivery" name="delivery">${options(['상담 후 결정',educationModes.offline,educationModes.live])}</select></div><div class="f full"><label for="f-plan">`)
  .replace('본사명·담당자·연락처·SV 인원·문의 내용 / 목적:','본사·기관명·담당자·연락처·교육 대상·예상 인원·관심 상품·진행 방식·문의 내용 / 목적:');
 return source.slice(0,start)+educationCatalogHTML()+'<section class="cta catalog-inquiry" id="apply"><div class="wrap">'+inquiry+source.slice(end);
}
