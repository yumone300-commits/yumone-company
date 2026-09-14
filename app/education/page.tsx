import {SitemapPage} from '@/components/sitemap-page';
import {navigation} from '@/data/navigation';
import {metadata as makeMetadata} from '@/lib/seo';
const group=navigation.find(g=>g.key==='education')!;
export const metadata=makeMetadata(group.title,group.description,group.href);
export default function Page(){return <SitemapPage href="/education"/>}
