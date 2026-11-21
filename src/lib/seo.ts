import type { Metadata } from "next";
import { type Locale, languageLinks, messages, pathFor } from "@/data/i18n";
import type { Song } from "@/data/songs";
import { site } from "@/data/site";

const ogLocales: Record<Locale, string> = { be: "be_BY", ru: "ru_RU", en: "en_US" };

export function rootMetadata(locale: Locale): Metadata {
  return {
    metadataBase: new URL(site.url),
    applicationName: "Nevrida",
    title: { default: messages[locale].seo.homeTitle, template: "%s | Nevrida" },
    description: messages[locale].seo.homeDescription,
    openGraph: { siteName: "Nevrida", locale: ogLocales[locale], type: "website", url: site.url + pathFor(locale) },
    robots: { index: true, follow: true },
  };
}

export function songMetadata(locale: Locale, song: Song): Metadata {
  const url = site.url + pathFor(locale, song.slug);
  const description = messages[locale].seo.songDescription(song.title);
  return {
    title: song.title,
    description,
    alternates: { canonical: url, languages: languageLinks(song.slug) },
    openGraph: { type: "article", title: `${song.title} | Nevrida`, description, url, locale: ogLocales[locale], siteName: "Nevrida" },
    robots: { index: true, follow: true },
  };
}

export function reservedMetadata(locale: Locale, slug: "nevrida1" | "nevrida2"): Metadata {
  const title = slug === "nevrida1" ? messages[locale].reserved.tales : messages[locale].reserved.about;
  return {
    title,
    description: messages[locale].reserved.body,
    robots: { index: false, follow: true },
    alternates: { canonical: site.url + pathFor(locale, slug), languages: languageLinks(slug) },
  };
}

export function homeMetadata(locale: Locale): Metadata {
  return {
    title: messages[locale].seo.homeTitle,
    description: messages[locale].seo.homeDescription,
    robots: { index: false, follow: true }, // Temporary homepage awaiting approved Figma design.
    alternates: { canonical: site.url + pathFor(locale), languages: languageLinks() },
  };
}
