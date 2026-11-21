import Link from "next/link";
import { messages, pathFor, type Locale } from "@/data/i18n";
import { Brand } from "./Brand";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function SiteHeader({ locale, slug }: { locale: Locale; slug?: string }) {
  const t = messages[locale];
  // The rider's final URL is not approved. Link to temporary homepage section until then.
  const menu = [
    { label: t.navigation.tales, href: pathFor(locale, "nevrida1") },
    { label: t.navigation.about, href: pathFor(locale, "nevrida2") },
    { label: t.navigation.rider, href: pathFor(locale) + "#rider" },
    { label: t.navigation.contacts, href: pathFor(locale) + "#contacts" },
  ];
  return (
    <header className="site-header">
      <a className="skip-link" href="#main">{t.accessibility.skip}</a>
      <Brand locale={locale} />
      <div className="site-header__right">
        <nav className="desktop-nav" aria-label={t.accessibility.menu}>
          {menu.map(({ href, label }, i) => (
            <Link key={href} href={href} className={i === 0 ? "desktop-nav__primary" : undefined}>{label}</Link>
          ))}
        </nav>
        <LanguageSwitcher locale={locale} slug={slug} className="lang-switcher--desktop" />
      </div>
      <details className="mobile-nav">
        <summary aria-label={t.accessibility.menu} className="mobile-nav__toggle"><span /><span /><span /></summary>
        <nav className="mobile-nav__panel" aria-label={t.accessibility.menu}>
          {menu.map(({ href, label }, i) => (
            <Link href={href} key={href}><span className="mobile-nav__number">0{i + 1}</span>{label}</Link>
          ))}
          <LanguageSwitcher locale={locale} slug={slug} className="lang-switcher--mobile" />
          <div className="mobile-nav__copyright">© Nevrida</div>
        </nav>
      </details>
    </header>
  );
}
