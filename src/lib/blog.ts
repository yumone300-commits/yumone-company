import snapshot from '../../content/blog/cms-snapshot.json';
import overrides from '../../content/blog/category-overrides.json';
import type {BlogPost,BlogCard,BlogCategory} from './blog-types';
export {blogCategories} from './blog-types';
// Server-only consumers import this module. Client components receive public projections only.
const rows=snapshot.posts as unknown as BlogPost[];
export function publicPosts():BlogPost[]{return rows.filter(p=>p.status==='published'&&p.contentVerified&&['complete','direct','legacy'].includes(p.collectionStatus)&&p.title&&p.blocks.length&&p.publishedAt).map(p=>({...p,category:(overrides as Record<string,{category:BlogCategory}>)[p.id]?.category||p.category,blocks:withHeadingIds(p.blocks)})).sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt)||a.id.localeCompare(b.id));}
export function withHeadingIds(blocks:BlogPost['blocks']){const seen=new Set<string>();let count=0;return blocks.map(block=>{if(block.type!=='heading')return block;const base=block.id?.replace(/[^a-zA-Z0-9_-]/g,'')||`section-${++count}`;let id=base,index=2;while(seen.has(id))id=`${base}-${index++}`;seen.add(id);return {...block,id,level:block.level===3?3 as const:2 as const}})}
export const postHref=(post:Pick<BlogPost,'slug'>)=>`/insight/column/${post.slug}/`;
export function findPost(slug:string){return publicPosts().find(p=>p.slug===slug)}
export function cardPosts():BlogCard[]{return publicPosts().map(({id,slug,title,summary,category,tags,author,publishedAt,images})=>({id,slug,title,summary,category,tags,author,publishedAt,images:images.filter(i=>i.role==='thumbnail'&&i.status==='ready'&&i.rights==='approved').map(({id,role,src,alt,caption,kind,status,rights,width,height})=>({id,role,src,alt,caption,kind,status,rights,width,height}))}))}
export const blogIntro='가맹모집부터 가맹점 매출, AI 마케팅과 SV 교육까지. 프랜차이즈 현장에서 바로 적용할 방법을 전합니다.';
export const blogCTA:Record<BlogCategory,{label:string;href:string}>={
 '가맹모집':{label:'우리 브랜드 가맹모집 전략 상담하기',href:'/contact/?service=recruit'},
 '가맹점 매출':{label:'가맹점 매출 활성화 상담하기',href:'/contact/?service=sales'},
 'AI 마케팅':{label:'AI 검색 마케팅 상담하기',href:'/contact/?service=ai-search'},
 'SV·교육':{label:'본사 교육 프로그램 문의하기',href:'/contact/?service=education'},
};
