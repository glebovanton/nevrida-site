import { pages } from "@/data/pages";
import type { Locale } from "@/data/i18n";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { StreamingLinks } from "./StreamingLinks";

/** Optional dedicated design for /nevrida2/, using the same owner-approved copy as the active page. */
export function AboutPage({ locale }: { locale: Locale }) {
  const band = pages[locale].band;
  return (
    <div className="site-shell about-scene">
      <SiteHeader locale={locale} slug="nevrida2" />
      <main id="main" className="about-main">
        <div className="about-main__copy">
          <span className="editorial-eyebrow">Nevrida</span>
          <h1>{band.title}</h1>
          {band.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <img className="about-main__band" src="/legacy/home/band.webp" alt={band.title} width={640} height={424} />
        <StreamingLinks heading={band.streams} />
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
