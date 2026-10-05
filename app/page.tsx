import {RedesignedHome} from './home-v2';
import {metadata as makeMetadata} from '@/lib/seo';
import {homeShare} from '@/data/share';
export const metadata={...makeMetadata(homeShare.title,homeShare.description,'/'),title:{absolute:homeShare.title}};
export default function Home(){return <RedesignedHome/>}
