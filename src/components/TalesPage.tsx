import Link from "next/link";
import { pages } from "@/data/pages";
import { pathFor, type Locale } from "@/data/i18n";
import { songs } from "@/data/songs";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

const featureImages = ["/artwork/tsyabe-mala.webp", "/artwork/kalyhanka.webp", "/artwork/zabiary-miane.webp"] as const;

/** Optional dedicated design for /nevrida1/; copy and songs come from shared data. */
export function TalesPage({ locale }: { locale: Locale }) {
  const tales = pages[locale].tales;
  return (
    <div className="site-shell tales-scene">
      <SiteHeader locale={locale} slug="nevrida1" />
      <main className="tales-main" id="main">
        <header className="tales-hero">
          <div className="tales-hero__text">
            <span className="editorial-eyebrow">Nevrida</span>
            <h1>{tales.title}</h1>
            <p>{tales.intro[0]}</p>
          </div>
          <div className="tales-hero__cover" role="img" aria-label={tales.title}>
            <img src="/artwork/intro.webp" width={1056} height={758} alt="" fetchPriority="high" />
            <span className="tales-hero__cover-caption">Nevrida</span>
          </div>
        </header>
        <section className="tales-statement" aria-label={tales.title}>
          <p>{tales.intro[1]}</p>
        </section>
        <section className="tales-steps" aria-label={tales.title}>
          {tales.steps.map((step, index) => (
            <article className={`tales-step tales-step--${index + 1}`} key={step.title}>
              <div className="tales-step__image"><img src={featureImages[index % featureImages.length]} alt="" width={1200} height={860} loading="lazy" /></div>
              <div className="tales-step__content">
                <span className="editorial-eyebrow">0{index + 1} / 0{tales.steps.length}</span>
                <h2>{step.title}</h2>
                <p>{step.text}</p>
                {"bullets" in step && step.bullets && (
                  <ol className="tales-step__instructions">{step.bullets.map(line => <li key={line}>{line}</li>)}</ol>
                )}
                {"after" in step && step.after && <p>{step.after}</p>}
              </div>
            </article>
          ))}
        </section>
        <p className="tales-closing">{tales.closing}</p>
        <section className="tales-tracks" aria-labelledby="tales-tracks-title">
          <div className="tales-tracks__intro">
            <span className="editorial-eyebrow">Nevrida</span>
            <h2 id="tales-tracks-title">{tales.songsTitle}</h2>
          </div>
          <div className="tales-tracks__grid">
            {songs.map(song => (
              <Link className="tales-track" key={song.slug} href={pathFor(locale, song.slug)} aria-label={`${tales.songsTitle}: ${song.title}`}>
                <div className="tales-track__image"><img src={`/artwork/${song.slug}.webp`} width={512} height={366} loading="lazy" alt="" /></div>
                <div className="tales-track__info"><span>{song.number}</span><h3 lang="be">{song.title}</h3><span aria-hidden="true">↗</span></div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
