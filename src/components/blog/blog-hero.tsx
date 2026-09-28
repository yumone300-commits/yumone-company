import Image from 'next/image';
import blog from './blog.module.css';
import s from './blog-hero.module.css';

export function BlogHero() {
  return <header className={s.hero} aria-labelledby="blog-title">
    <div className={`${blog.container} ${s.inner}`}>
      <div className={s.copy}>
        <p className={s.eyebrow}>YUMONE BLOG</p>
        <h1 id="blog-title">블로그</h1>
        <p className={s.description}>가맹모집부터 가맹점 매출, AI 마케팅과 SV 교육까지.<br/>프랜차이즈 현장에서 바로 적용할 방법을 전합니다.</p>
      </div>
      <figure className={s.figure}>
        <div className={s.imageFrame}>
          <Image src="/images/blog/hero-team-bright.webp" width={1200} height={675}
            alt="노트북과 인쇄 자료를 함께 보며 콘텐츠를 검토하는 네 명의 실무자"
            className={s.image} sizes="(max-width: 600px) calc(100vw - 40px), 450px" preload/>
        </div>
        <figcaption>이해를 돕기 위한 AI 생성 이미지</figcaption>
      </figure>
    </div>
  </header>;
}
