import {educationHTML} from '@/components/education-academy/content';
import {followupHTML,fragment,sourceFieldsHTML} from '@/components/education-academy/fragments';
import {groupSizes,lpFormats} from '@/lib/education-inquiry';

// Ad/SMS landing for the SV course only. Reused blocks are cut from the /education/ source so both pages stay in sync.
const esc=(value:string)=>value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const from=(opening:string)=>fragment(educationHTML,opening);

const formats=[
 {key:'A',ask:'처음이라 한번 들어보고 싶어요',title:'반일 특강',meta:'3시간',value:lpFormats[0]},
 {key:'B',ask:'SV 팀을 제대로 바꾸고 싶어요',title:'1일 실무 과정',meta:'6시간 · 역할극 포함',value:lpFormats[1]},
 {key:'C',ask:'여러 번 자주 해주세요',title:'연간 교육 파트너십',meta:'분기 1회',value:lpFormats[2]},
];
const materials=['SV 역할 정의서','점주 면담 기록지','상황별 스크립트','가맹점 진단표','2주 실행 계획서'];

const hero=`<section class="lp-hero" aria-labelledby="lp-title">
 <div class="wrap">
  <p class="landing-brand">염원 SV 아카데미 · SV 실무 교육</p>
  <h1 id="lp-title">SV 교육 보냈는데,<br>현장은 그대로인가요?</h1>
  <p class="lp-sub">교육을 안 한 게 아닙니다.<br>듣고 끝났을 뿐입니다.</p>
  <ul class="lp-proofs" aria-label="강의 실적">
   <li><b>업계 최초</b><span>평사원 출신 여성 임원</span></li>
   <li><b>500명+</b><span>누적 수강생</span></li>
   <li><b>5.0</b><span>강사 전문성</span></li>
  </ul>
  <a class="btn btn-red" href="#lp-apply" data-lp-cta="hero">우리 본사 SV 교육 상담하기 <span aria-hidden="true">→</span></a>
 </div>
 <figure class="lp-hero-photo"><img src="/images/education-academy/original-01.jpg" width="1508" height="864" fetchpriority="high" alt="'가맹점주에게 신뢰받는 탁월한 슈퍼바이저가 되어 내 몸값을 높여라' 슬라이드 앞에서 슈퍼바이저들에게 강의하는 염혜단 대표"></figure>
</section>`;

const compare=`<section class="empathy lp-compare" aria-labelledby="lp-compare-title">
 <div class="wrap">
  <p class="kicker">교육을 해도 현장이 그대로라면</p>
  <h2 class="h2" id="lp-compare-title">듣고 끝나는 교육과<br>해 보고 끝나는 교육</h2>
  ${from('<div class="compare">')}
 </div>
</section>`;

const course=`<section class="detail lp-course" aria-labelledby="lp-course-title">
 <div class="wrap">
  <p class="kicker">SV 실무 교육</p>
  <h2 class="h2" id="lp-course-title">마인드에서 가맹점 만족까지,<br>3단계로 연습합니다.</h2>
  ${from('<div class="steps">')}
  <div class="lp-materials">
   <h3>교육 후 가져가는 자료</h3>
   <ul>${materials.map(m=>`<li>${m}</li>`).join('')}</ul>
  </div>
 </div>
</section>`;

const photos=`<section class="lp-photos" aria-labelledby="lp-photos-title">
 <div class="wrap">
  <p class="kicker">우리 SV가 경험할 교육 현장</p>
  <h2 class="h2" id="lp-photos-title">앉아서 듣기보다,<br>직접 해 보는 교육입니다.</h2>
  ${from('<div class="photos">')}
 </div>
</section>`;

const proof=`<section class="numbers lp-numbers" aria-label="교육 실적과 만족도">
 <div class="wrap">
  <div class="num-grid">
   <div class="num"><b>500<sup>명+</sup></b><span>누적 수강생</span><small>2025~2026 CS·AI 마케팅 교육</small></div>
   <div class="num"><b>5.0</b><span>강사 전문성</span><small>SV 가맹점 CS 2회차 · 2026.08.20</small></div>
   <div class="num"><b>4.9</b><span>동료 추천 의향</span><small>슈퍼바이저 가맹점 CS 3회차 · 2026.09.17</small></div>
  </div>
  <p class="num-src">만족도는 해당 회차 교육 만족도 설문의 항목별 점수(5점 만점)입니다. 출처: 2026년 각 회차 운영 결과 보고서.</p>
 </div>
</section>
<section class="talk lp-voice" aria-labelledby="lp-voice-title">
 <div class="wrap">
  <div class="voice-head">
   <p class="kicker">교육을 들은 수강생의 원문 후기</p>
   <h2 class="h2" id="lp-voice-title">교육이 끝나면,<br>수강생이 먼저 말합니다</h2>
  </div>
  ${from('<div class="picks">')}
  ${from('<details class="raw">')}
 </div>
</section>`;

const coach=`<section class="empathy lp-coach" aria-label="강사 소개">
 <div class="wrap">${from('<div class="coach" id="coach">')}</div>
</section>`;

const formatCards=`<section class="lp-formats" id="lp-formats" aria-labelledby="lp-formats-title">
 <div class="wrap">
  <p class="kicker">교육 형태 고르기</p>
  <h2 class="h2" id="lp-formats-title">우리 본사에 맞는 방식을<br>골라 주세요.</h2>
  <div class="lp-format-cards">${formats.map(f=>`<button type="button" class="lp-format" data-format="${f.key}" data-format-value="${esc(f.value)}"><span class="lp-format-key">${f.key}</span><span class="lp-format-ask">“${f.ask}”</span><span class="lp-format-title">${f.title}</span><span class="lp-format-meta">${f.meta}</span><span class="lp-format-go">이 형태로 상담하기 →</span></button>`).join('')}</div>
  <p class="lp-note">비용은 대상·인원·시간에 따라 상담 후 안내합니다.</p>
 </div>
</section>`;

const faq=`<section class="lp-faq" aria-labelledby="lp-faq-title">
 <div class="wrap">
  <p class="kicker" id="lp-faq-title">상담 전에 많이 묻는 질문</p>
  ${from('<div class="faq">')}
 </div>
</section>`;

const form=`<section class="cta lp-apply" id="lp-apply" aria-labelledby="lp-apply-title">
 <div class="wrap">
  <div class="form-wrap">
   <div>
    <h3 id="lp-apply-title">우리 본사 SV 교육,<br>상담부터 시작하세요.</h3>
    <p class="sub">남겨 주시면 연락드려 SV 인원과 현장 고민을 확인한 뒤 교육안을 보내 드립니다.</p>
    <div class="direct"><div><em>전화</em><a href="tel:0269496859" data-lp-cta="tel">02-6949-6859</a></div><div><em>메일</em><a href="mailto:yumone300@gmail.com">yumone300@gmail.com</a></div></div>
   </div>
   <form id="lp-form" name="consult-lp" method="POST" novalidate action="/api/education/inquiry/">
    <input type="hidden" name="form-name" value="consult-lp">${sourceFieldsHTML('sv-academy')}<input type="hidden" name="plan" value="SV 실무 교육">
    <p hidden><label>비워 두세요 <input name="bot-field"></label></p>
    <div class="f full"><label for="lp-company">본사(브랜드)명</label><input id="lp-company" name="company" maxlength="100" required autocomplete="organization" placeholder="예: ○○치킨"></div>
    <div class="f full"><label for="lp-name">성함·직함</label><input id="lp-name" name="name" maxlength="100" required autocomplete="name" placeholder="예: 홍길동 팀장"></div>
    <div class="f full"><label for="lp-phone">연락처</label><input id="lp-phone" name="phone" maxlength="24" type="tel" inputmode="tel" required autocomplete="tel" placeholder="010-0000-0000"></div>
    <div class="f full"><label for="lp-sv">SV 인원 (선택)</label><select id="lp-sv" name="sv"><option value="" selected disabled>선택해 주세요</option>${groupSizes.map(s=>`<option>${s}</option>`).join('')}</select></div>
    <fieldset class="f full lp-format-field"><legend>원하는 교육 형태</legend>${lpFormats.map((value,i)=>`<label><input type="radio" name="format" value="${esc(value)}"${i===lpFormats.length-1?' checked':''}> ${esc(value)}</label>`).join('')}</fieldset>
    <div class="f full"><label for="lp-msg">요즘 SV·점주에게 가장 자주 나오는 문제 (선택)</label><textarea id="lp-msg" name="message" maxlength="3000" placeholder="예: 신규 SV가 점주 면담을 어려워합니다."></textarea></div>
    <label class="f full f-agree"><span><input type="checkbox" name="agree" value="동의" required> 개인정보 수집·이용에 동의합니다. <small>(수집 항목: 본사명·성함·직함·연락처·SV 인원·교육 형태·문의 내용·유입 경로 / 목적: 교육 상담 연락 / 보유: 상담 완료 후 1년 또는 삭제 요청 시까지)</small></span></label>
    <button class="btn btn-red" type="submit">SV 교육 상담 신청하기 →</button>
    <p class="fine">남겨 주신 정보는 교육 상담 연락에만 사용합니다.</p>
    <div class="done" id="lp-done" role="status" aria-live="polite" hidden></div>
   </form>
  </div>
 </div>
</section>`;

const followup=`<section class="empathy lp-followup"><div class="wrap">${followupHTML}</div></section>`;

const problem=from('<section class="problem">');

export const svAcademyLpHTML=[hero,problem,compare,course,photos,proof,coach,formatCards,followup,faq,form].join('\n')
 +`<a class="lp-sticky" href="#lp-apply" data-lp-cta="sticky" hidden>우리 본사 SV 교육 상담하기 <span aria-hidden="true">→</span></a>`;
