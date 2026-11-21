import { Brand } from "./Brand";
import { messages, type Locale } from "@/data/i18n";
import { site } from "@/data/site";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = messages[locale].footer;
  return (
    <footer className="site-footer" id="contacts">
      <div className="site-footer__top">
        <Brand locale={locale} large />
        <div className="site-footer__contacts">
          <p className="site-footer__heading">{t.contacts}</p>
          <a href={site.phoneHref}>{site.phoneLabel}</a>
          <span title="Figma: email may contain a typo; confirm with owner">{site.emailLabel}</span>
        </div>
        <div className="site-footer__social">
          <p className="site-footer__heading">{t.socials}</p>
          {site.social.map(social => social.href ? (
            <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">{social.label} <span aria-hidden="true">↗</span></a>
          ) : <span key={social.label} className="site-footer__pending">{social.label} ↗</span>)}
        </div>
      </div>
      <div className="site-footer__bottom">{t.copyright}</div>
    </footer>
  );
}
