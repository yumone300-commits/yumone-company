import {AnalyticsPageView} from './analytics-page-view';
import {site} from '@/data/site';
import {allNavigationPages} from '@/data/navigation';
import {insights,cases} from '@/data/content';

export function Analytics() {
 const id=process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID?.trim();
 // An ID alone cannot verify the property's Enhanced Measurement/PII settings.
 if(!id||!/^G-[A-Z0-9]{6,}$/.test(id)||process.env.NEXT_PUBLIC_GA4_MANUAL_TRACKING_READY!=='true')return null;
 const pages:Record<string,string>=Object.fromEntries([
  ['/',site.name],...allNavigationPages.map(p=>[p.href,p.title]),['/contact','프로젝트 상담 신청'],['/site-map','전체 사이트맵'],
  ...insights.map(i=>['/insight/column/'+i.slug,i.title]),...cases.map(c=>['/project/marketing/'+c.slug,c.title]),
 ]);
 return <AnalyticsPageView id={id} origin={site.url} pages={pages}/>;
}
