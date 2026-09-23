export type AnalyticsEvent = {page_location:string;page_referrer:string;page_title:string};
// Only known public paths and supplied page titles are accepted. No query, hash, referrer parameters or form values.
export function createPageTracker(origin:string, pages:Record<string,string>, send:(event:AnalyticsEvent)=>void) {
 let previous='';
 return (pathname:string, consent=true)=>{
  const path=pathname.replace(/\/$/,'')||'/';
  if(!consent||!Object.hasOwn(pages,path)) return false;
  const location=new URL(path==='/'?'/':path+'/',origin).href;
  if(location===previous)return false;
  send({page_location:location,page_referrer:previous,page_title:pages[path]});
  previous=location;
  return true;
 };
}
