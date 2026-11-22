import { messages, type Locale } from "@/data/i18n";
import { OrnateFrame } from "./OrnateFrame";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

/** Localized temporary page until the band provides its approved rider. */
export function RiderPage({ locale }: { locale: Locale }) {
  const t = messages[locale];
  return (
    <div className="site-shell song-scene editorial-scene" data-scene="rider">
      <div className="song-scene__art" aria-hidden="true" />
      <SiteHeader locale={locale} slug="rider" />
      <main className="song-main" id="main">
        <OrnateFrame className="ornate-frame--reserved">
          <span className="reserved-mark">{t.reserved.heading}</span>
          <h1 className="reserved-title">{t.navigation.rider}</h1>
          <p className="rider-placeholder__description">{t.reserved.body}</p>
          <a className="rider-placeholder__contact" href="#contacts">{t.navigation.contacts} ↗</a>
        </OrnateFrame>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
