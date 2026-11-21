import Link from "next/link";
import { songs } from "@/data/songs";
import { messages, pathFor, type Locale } from "@/data/i18n";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

/** Temporary home scaffolding: no final Figma artwork supplied for this route. Not indexed. */
export function HomePage({ locale }: { locale: Locale }) {
  const t = messages[locale].home;
  return (
    <div className="site-shell home-scene" id="top">
      <SiteHeader locale={locale} />
      <main id="main" className="home-main">
        <section className="home-hero" aria-labelledby="home-title">
          <p className="home-hero__eyebrow">{t.eyebrow}</p>
          <h1 id="home-title" className="home-hero__title">Nevrida</h1>
          <p>{t.subtitle}</p>
          <a href="#songs" className="home-hero__link">{t.explore} <span aria-hidden="true">↓</span></a>
          <span className="home-hero__notice">{t.temporary}</span>
        </section>
        <section className="home-songs" id="songs" aria-labelledby="songs-title">
          <p className="section-kicker">01 / {t.section}</p>
          <h2 id="songs-title">{t.songs}</h2>
          <ol className="home-songs__grid">
            {songs.map(song => (
              <li key={song.slug}>
                <Link href={pathFor(locale, song.slug)}><span className="home-songs__number">{song.number}</span><span lang="be">{song.title}</span><span className="home-songs__arrow" aria-hidden="true">↗</span></Link>
              </li>
            ))}
          </ol>
        </section>
        <section className="home-information" id="about"><h2>{t.about}</h2><p>{t.aboutBody}</p></section>
        <section className="home-information" id="rider"><h2>{t.rider}</h2><p>{t.riderBody}</p></section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
