import type { MetadataRoute } from "next";
import { songs } from "@/data/songs";
import { languageLinks, locales } from "@/data/i18n";

export const dynamic = "force-static";

/** Only approved song pages are submitted. Homepage and unfinished pages remain noindex. */
export default function sitemap(): MetadataRoute.Sitemap {
  return songs.flatMap(song => {
    const links = languageLinks(song.slug);
    return locales.map(locale => ({
      url: links[locale],
      changeFrequency: "monthly" as const,
      priority: locale === "be" ? 0.9 : 0.7,
      alternates: { languages: links },
    }));
  });
}
