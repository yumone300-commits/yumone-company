import {legacyRoutes} from '@/data/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {ArrowRight,ArrowUpRight} from 'lucide-react';
import {images} from '@/data/site';
export function Container({children,className=''}:{children:React.ReactNode;className?:string}){return <div className={`container ${className}`}>{children}</div>}
export function Button({href,children,secondary=false}:{href:string;children:React.ReactNode;secondary?:boolean}){return <Link className={`button ${secondary?'secondary':''}`} href={legacyRoutes[href]||href}>{children}<ArrowRight size={18}/></Link>}
export function SectionTitle({eyebrow,title,description,href,linkText='전체보기'}:{eyebrow:string;title:string;description?:string;href?:string;linkText?:string}){return <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{description&&<p className="muted">{description}</p>}</div>{href&&<Link className="text-link" href={legacyRoutes[href]||href}>{linkText}<ArrowUpRight size={17}/></Link>}</div>}
export function Photo({name,alt,className='',priority=false}:{name:string;alt:string;className?:string;priority?:boolean}){return <div className={`photo ${className}`}><Image src={images[name as keyof typeof images]||images.building} alt={alt} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 650px" priority={priority}/></div>}
export function PageHero({eyebrow,title,description,image='building'}:{eyebrow:string;title:string;description:string;image?:string}){return <section className="page-hero"><Photo name={image} alt="서비스 이해를 돕는 참고 이미지" priority/><Container><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></Container></section>}
export function FinalCTA(){return <section className="final-cta"><Container><div><p className="eyebrow">LET’S GROW TOGETHER</p><h2>우리 브랜드,<br/>AI와 고객에게 제대로 발견되고 있나요?</h2><p>광고를 더 집행하기 전에, 우리 브랜드가 선택되는 과정부터 확인해 보세요.</p></div><div className="cta-stack"><Button href="/contact?service=ai">우리 브랜드 진단받기</Button><Link href="/contact">프로젝트 상담하기 →</Link></div></Container></section>}
export function Breadcrumb({items}:{items:{label:string;href:string}[]}){return <Container><nav className="breadcrumbs" aria-label="현재 위치"><Link href="/">홈</Link>{items.map(x=><span key={x.href}> / <Link href={legacyRoutes[x.href]||x.href}>{x.label}</Link></span>)}</nav></Container>}
