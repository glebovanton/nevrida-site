import Link from "next/link";
import { messages, pathFor, type Locale } from "@/data/i18n";

/** Faithful semantic React port of old nevrida.github.io/src/components/Main.vue and Footer.vue. */
const oldAlbums = [
  { id: "kabluchki", url: "https://ps.onerpm.com/2740100774" },
  { id: "ogni", url: "https://ps.onerpm.com/3227207815" },
  { id: "omut", url: "https://onerpm.link/1488382707" },
  { id: "nikto", url: "https://onerpm.link/800192216601" },
  { id: "omut-radio", url: "https://onerpm.link/3513763204" },
] as const;

const oldSocials = [
  { id: "vk", url: "https://vk.com/nevrida", label: "ВКонтакте" },
  { id: "inst", url: "https://www.instagram.com/nevridaland/", label: "Instagram" },
  { id: "fb", url: "https://www.facebook.com/nevrida", label: "Facebook" },
  { id: "youtube", url: "https://www.youtube.com/nevridaland", label: "YouTube" },
] as const;

export function HomePage({ locale }: { locale: Locale }) {
  const t = messages[locale];
  return (
    <div className="old-home">
      <main className="old-home__container" id="main">
        <h1 className="visually-hidden">Nevrida — {t.seo.homeTitle}</h1>
        <img className="old-home__band" src="/legacy/home/band.webp" width="640" height="424" alt="Музычны гурт Nevrida" fetchPriority="high" />
        <nav className="old-home__social" aria-label="Nevrida social links">
          {oldSocials.map(({ id, label, url }) => (
            <a key={id} href={url} target="_blank" rel="noopener noreferrer" aria-label={label}>
              <img src={`/legacy/home/social/${id}.svg`} width="50" height="50" alt="" />
            </a>
          ))}
        </nav>
        <img className="old-home__window" src="/legacy/home/okno.webp" width="200" height="200" alt="" loading="lazy" />
        <section className="old-home__albums" aria-label="Nevrida releases">
          {oldAlbums.map(({ id, url }) => (
            <a className="old-home__album" key={id} href={url} target="_blank" rel="noopener noreferrer" aria-label={`Listen to Nevrida — ${id}`}>
              <img className="old-home__album-cover" src={`/legacy/home/albums/${id}.webp`} alt={id.replace(/-/g, " ")} loading="lazy" width="200" height="200" />
              <img className="old-home__album-play" src="/legacy/home/play-button.svg" alt="" width="58" height="58" loading="lazy" />
            </a>
          ))}
        </section>
        <div className="old-home__video">
          <iframe title="Nevrida — official music video" src="https://www.youtube-nocookie.com/embed/EMILcfZ-vsk" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
        </div>
        <nav className="old-home__tales-nav" aria-label="Stories">
          <Link href={pathFor(locale, "intro")}>{t.navigation.tales} <span aria-hidden="true">↗</span></Link>
          <Link href={pathFor(locale, "nevrida2")}>{t.navigation.about}</Link>
          <span className="old-home__languages">
            {(["be", "ru", "en"] as const).map(code => <Link key={code} className={locale===code ? "old-home__lang-active" : ""} href={pathFor(code)} lang={code} hrefLang={code}>{code.toUpperCase()}</Link>)}
          </span>
        </nav>
      </main>
      <footer className="old-home__footer" id="contacts">
        <p>{locale === "be" ? "па пытаннях арганізацыі канцэртаў:" : locale === "en" ? "for concert bookings:" : "по вопросам организации концертов:"}</p>
        <p><a href="tel:+375291669234">+375(29)1669234</a> / <a href="mailto:nevridaland@gmal.com">nevridaland@gmal.com</a></p>
        <p>© Nevrida</p>
      </footer>
    </div>
  );
}
