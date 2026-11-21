import { messages, type Locale } from "@/data/i18n";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { OrnateFrame } from "./OrnateFrame";

export function ReservedPage({ locale, slug }: { locale: Locale; slug: "nevrida1" | "nevrida2" }) {
  const t = messages[locale].reserved;
  return (
    <div className="site-shell song-scene" data-scene="reserved">
      <div className="song-scene__art" aria-hidden="true" />
      <SiteHeader locale={locale} slug={slug} />
      <main className="song-main" id="main">
        <OrnateFrame className="ornate-frame--reserved">
          <span className="reserved-mark">Nevrida</span>
          <h1 className="reserved-title">{slug === "nevrida1" ? t.tales : t.about}</h1>
          <p className="reserved-body">{t.body}</p>
        </OrnateFrame>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
