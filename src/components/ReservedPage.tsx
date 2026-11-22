import Link from "next/link";
import { messages, pathFor, type Locale } from "@/data/i18n";
import { pages } from "@/data/pages";
import { songs } from "@/data/songs";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { OrnateFrame } from "./OrnateFrame";
import { ArtistStreamingLinks } from "./ArtistStreamingLinks";

/** Existing reserved routes are now real localized content pages. */
export function ReservedPage({ locale, slug }: { locale: Locale; slug: "nevrida1" | "nevrida2" }) {
  const content = pages[locale];
  const isTales = slug === "nevrida1";
  return (
    <div className="site-shell song-scene editorial-scene" data-scene={slug}>
      <div className="song-scene__art" aria-hidden="true" />
      <SiteHeader locale={locale} slug={slug} />
      <main className="song-main editorial-main" id="main">
        <OrnateFrame className="ornate-frame--editorial">
          <span className="reserved-mark">Nevrida</span>
          <h1 className="reserved-title">{isTales ? content.tales.title : content.band.title}</h1>
          {isTales ? (
            <>
              <div className="editorial-intro">{content.tales.intro.map(text => <p key={text}>{text}</p>)}</div>
              <div className="editorial-steps">
                {content.tales.steps.map((step, i) => (
                  <section className="editorial-step" key={step.title}>
                    <span className="editorial-step__number" aria-hidden="true">0{i + 1}</span>
                    <h2>{step.title}</h2>
                    <p>{step.text}</p>
                    {"bullets" in step && step.bullets && <ul>{step.bullets.map(text => <li key={text}>{text}</li>)}</ul>}
                    {"after" in step && step.after && <p>{step.after}</p>}
                  </section>
                ))}
              </div>
              <p className="editorial-closing">{content.tales.closing}</p>
              <section className="editorial-songs" aria-label={content.tales.songsTitle}>
                <h2>{content.tales.songsTitle}</h2>
                <ul>{songs.map(song => <li key={song.slug}><Link href={pathFor(locale, song.slug)}><span lang="be">{song.title}</span><span aria-hidden="true">↗</span></Link></li>)}</ul>
              </section>
            </>
          ) : (
            <>
              <div className="editorial-intro">{content.band.paragraphs.map(text => <p key={text}>{text}</p>)}</div>
              <ArtistStreamingLinks heading={content.band.streams} />
              <p className="editorial-closing"><Link href={pathFor(locale, "nevrida1")}>{content.band.storiesLink} ↗</Link></p>
            </>
          )}
        </OrnateFrame>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
