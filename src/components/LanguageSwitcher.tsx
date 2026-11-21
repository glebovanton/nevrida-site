import { languageLabels, locales, messages, pathFor, type Locale } from "@/data/i18n";

/** Accessible native disclosure: no client-side state or hydration required. */
export function LanguageSwitcher({ locale, slug, className = "" }: { locale: Locale; slug?: string; className?: string }) {
  return (
    <details className={`lang-switcher ${className}`}>
      <summary aria-label={`${messages[locale].accessibility.languages}: ${languageLabels[locale]}`}>
        <span>{languageLabels[locale]}</span><span className="lang-switcher__caret" aria-hidden="true" />
      </summary>
      <div className="lang-switcher__options" role="group" aria-label={messages[locale].accessibility.languages}>
        {locales.filter(candidate => candidate !== locale).map(candidate => (
          <a key={candidate} href={pathFor(candidate, slug)} hrefLang={candidate} lang={candidate}>
            {languageLabels[candidate]}
          </a>
        ))}
      </div>
    </details>
  );
}
