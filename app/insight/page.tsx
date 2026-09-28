import {Suspense} from 'react';import {cardPosts,blogIntro} from '@/lib/blog';import {BlogList} from '@/components/blog/blog-list';import {metadata as makeMetadata} from '@/lib/seo';import s from '@/components/blog/blog.module.css';
import {BlogCardView} from '@/components/blog/blog-card';
import {BlogHero} from '@/components/blog/blog-hero';
export const metadata=makeMetadata('블로그',blogIntro,'/insight');
export default function Blog(){const posts=cardPosts();return <div className={s.page}><BlogHero/><div className={s.container}><Suspense fallback={<div className={s.grid}>{posts.slice(0,9).map(p=><BlogCardView key={p.id} post={p}/>)}</div>}><BlogList posts={posts}/></Suspense></div></div>}
