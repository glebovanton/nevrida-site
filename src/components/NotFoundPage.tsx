"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { defaultLocale, isLocale, pathFor, type Locale } from "@/data/i18n";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import styles from "./NotFoundPage.module.scss";

const copy = {
  be: { heading: "Такой старонкі няма", home: "Галоўная" },
  ru: { heading: "Такой страницы нет", home: "Главная" },
  en: { heading: "Page not found", home: "Home" },
} satisfies Record<Locale, { heading: string; home: string }>;

const assets = "/figma/404";

/** GitHub Pages serves one 404.html for all unknown paths, including /ru/* and /en/*.
 * Keep the build-time markup deterministic; resolve the original URL after hydration. */
export function NotFoundPage() {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const prefix = window.location.pathname.split("/")[1] ?? "";
    const nextLocale = isLocale(prefix) ? prefix : defaultLocale;
    setLocale(nextLocale);
    document.documentElement.lang = nextLocale;
    document.title = `404 — ${copy[nextLocale].heading} | Nevrida`;
  }, []);

  const t = copy[locale];
  const closeMenuForContacts = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest('a[href="#contacts"]')) {
      const menu = event.currentTarget.querySelector<HTMLDetailsElement>(".mobile-nav[open]");
      if (menu) menu.open = false;
    }
  };
  return (
    <div className={styles.page} onClick={closeMenuForContacts}>
      <div className={styles.canvas}>
        <SiteHeader locale={locale} figmaAssets />
        <main id="main" className={styles.main}>
          <h1 className={styles.heading}>
            <span className="visually-hidden">404 — </span>
            <span className={styles.art} aria-hidden="true">
              {/* The original zero is exported separately for both Figma frames. */}
              <img className={`${styles.four} ${styles.fourRight}`} src={`${assets}/four.svg`} alt="" draggable="false" />
              <img className={styles.fern} src={`${assets}/fern.webp`} alt="" draggable="false" />
              <img className={`${styles.four} ${styles.fourLeft}`} src={`${assets}/four.svg`} alt="" draggable="false" />
              <picture className={styles.zero}>
                <source media="(max-width: 899px)" srcSet={`${assets}/zero-mobile.svg`} />
                <img src={`${assets}/zero-desktop.svg`} alt="" draggable="false" />
              </picture>
              {/* Figma masks just the leaf crossing the right numeral. Keep the
                  same image and reveal only that foreground region. */}
              <img className={`${styles.fern} ${styles.fernForeground}`} src={`${assets}/fern.webp`} alt="" draggable="false" />
            </span>
            <span className={styles.message}>{t.heading}</span>
          </h1>
          {/* A normal anchor deliberately leaves the error page via a full navigation. */}
          <a className={styles.home} href={pathFor(locale)}>{t.home}</a>
        </main>
        <SiteFooter locale={locale} figmaAssets />
      </div>
    </div>
  );
}
