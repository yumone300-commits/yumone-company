const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs=require('node:fs');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const page=await browser.newPage();const errors=[];const checks=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 const base=process.env.QA_URL||'http://localhost:3000';
 const routes=['/','/about','/services','/services/franchise','/services/marketing','/services/ai-search','/services/consulting','/education','/education/sv','/education/franchisee','/education/headquarters','/education/ai-marketing','/cases','/cases/franchise-system','/cases/brand-marketing','/cases/field-education','/cases/ai-discovery','/insights','/insights/franchise-growth-checklist','/insights/ai-brand-information','/insights/education-to-action','/contact','/privacy','/terms'];
 for(const width of [1440,1280,768,390]){
  await page.setViewportSize({width,height:width===390?844:1000});
  for(const route of routes){
   const response=await page.goto(base+route);assert.equal(response.status(),200,route);
   await page.evaluate(()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager')});
   await page.evaluate(async()=>{await Promise.all(Array.from(document.images).map(i=>i.decode().catch(()=>{})))});
   const state=await page.evaluate(()=>({h1:document.querySelectorAll('h1').length,overflow:document.documentElement.scrollWidth>innerWidth,broken:Array.from(document.images).filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)}));
   assert.equal(state.h1,1,route);assert.equal(state.overflow,false,`${width} ${route} overflow`);assert.deepEqual(state.broken,[],route);
   checks.push({width,route,...state});
   if(route==='/'){
    await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
    const box=await page.locator('.hero-copy .button').first().boundingBox();assert.ok(box.y+box.height<(width===390?844:1000),'Hero CTA');
    await page.screenshot({path:`QA-${width}.png`,fullPage:true});
   }
  }
 }
 await page.goto(base+'/');await page.getByRole('button',{name:'메뉴 열기'}).click();await page.locator('#mobile-menu').getByRole('link',{name:'회사소개'}).click();await page.waitForURL('**/about/');assert.equal(await page.locator('#mobile-menu').count(),0);
 await page.goto(base+'/cases');await page.getByRole('button',{name:'컨설팅',exact:true}).click();await page.getByText('이 분야의 사례는 공개 준비 중입니다.').waitFor();await page.getByRole('button',{name:'마케팅',exact:true}).click();assert.equal(await page.locator('.case-card').count(),1);
 await page.goto(base+'/contact?service=ai');assert.equal(await page.locator('#service').inputValue(),'ai');
 await page.getByRole('button',{name:'상담 신청하기',exact:true}).click();assert.equal(await page.locator('.form-success').count(),0);
 for(const [id,value] of Object.entries({company:'테스트 회사',name:'테스트 담당자',phone:'010-0000-0000',email:'qa@example.com',concern:'모의 상담 기능 검수입니다.'}))await page.locator('#'+id).fill(value);
 await page.locator('[name=consent]').check();await page.getByRole('button',{name:'상담 신청하기',exact:true}).click();await page.locator('.form-success').waitFor();assert.match(await page.locator('.form-success').innerText(),/실제 상담 접수는 이루어지지 않았습니다/);
 assert.deepEqual(errors,[]);fs.writeFileSync('QA-browser.json',JSON.stringify({checks,interactions:['mobile navigation','case filters and empty state','AI inquiry preselection','required field validation','mock submission'],consoleErrors:errors},null,2));
 await browser.close();console.log(`PASS: ${checks.length} responsive route checks, 5 interactions, no console errors`);
})().catch(e=>{console.error(e);process.exit(1)});


