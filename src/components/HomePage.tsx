import Link from "next/link";
import { pathFor, type Locale } from "@/data/i18n";
import { pages } from "@/data/pages";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { StreamingLinks } from "./StreamingLinks";

// Existing artwork only: keep the Figma-style composition separate from song pages.
// Nothing here depends on a fixed number of songs or editorial pages.
const heroArt = [
  "/legacy/home/albums/nikto.webp",
  "/legacy/home/albums/ogni.webp",
  "/legacy/home/albums/kabluchki.webp",
  "/legacy/home/albums/omut.webp",
] as const;

export function HomePage({ locale }: { locale: Locale }) {
  const { band, tales } = pages[locale];
  const genre = {
    be: "Беларускі фольк-рок гурт",
    ru: "Белорусская фолк-рок-группа",
    en: "Belarusian folk-rock band",
  }[locale];
  const bandHeading = {
    be: "Беларускі гурт",
    ru: "Белорусская группа",
    en: "Belarusian band",
  }[locale];
  const aboutLabel = {
    be: "Даведацца пра гурт",
    ru: "Узнать о группе",
    en: "Discover the band",
  }[locale];
  const talesLabel = {
    be: "Перайсці да казак",
    ru: "Перейти к сказкам",
    en: "Explore the tales",
  }[locale];

  return (
    <div className="site-shell landing-scene">
      <SiteHeader locale={locale} />
      <main id="main" className="landing-main">
        <section className="landing-hero" aria-label="Nevrida">
          <div className="landing-hero__brand">
            <img className="landing-hero__wordmark" src="/brand/wordmark.svg" width="900" height="517" alt="Nevrida" fetchPriority="high" />
            <p className="landing-hero__genre">{genre}</p>
          </div>
          <div className="landing-hero__polaroids" aria-hidden="true">
            {heroArt.map((src, index) => (
              <figure className={`landing-hero__polaroid landing-hero__polaroid--${index + 1}`} key={src}>
                <img src={src} alt="" width="434" height="434" loading="lazy" />
              </figure>
            ))}
          </div>
        </section>

        <section className="landing-about" aria-labelledby="landing-about-title">
          <h1 className="landing-about__headline" id="landing-about-title">
            <span>{bandHeading}</span>
            <em>Nevrida</em>
          </h1>
          <div className="landing-about__text">
            {band.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            <Link className="editorial-link" href={pathFor(locale, "nevrida2")}>{aboutLabel}<span aria-hidden="true">↗</span></Link>
          </div>
        </section>

        <section className="landing-tales" aria-labelledby="landing-tales-title">
          <div className="landing-tales__heading">
            <h2 id="landing-tales-title">{tales.title}</h2>
            <Link className="editorial-link" href={pathFor(locale, "nevrida1")}>{talesLabel}<span aria-hidden="true">↗</span></Link>
          </div>
          <div className="landing-tales__visual" aria-hidden="true" />
          <p className="landing-tales__description">{tales.intro[1]}</p>
        </section>

        <StreamingLinks heading={band.streams} />
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
