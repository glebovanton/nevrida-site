import type { MetadataRoute } from "next";
import { songs } from "@/data/songs";
import { editorialSlugs } from "@/data/pages";
import { languageLinks, locales } from "@/data/i18n";

export const dynamic = "force-static";

/** Indexed pages only. Rider is a noindex placeholder and must stay out of sitemap. */
export default function sitemap(): MetadataRoute.Sitemap {
  const homeLinks = languageLinks();
  const homeEntries = locales.map(locale => ({
    url: homeLinks[locale],
    changeFrequency: "monthly" as const,
    priority: locale === "be" ? 1 : 0.8,
    alternates: { languages: homeLinks },
  }));

  const indexedSlugs = [...songs.map(({ slug }) => slug), ...editorialSlugs];
  return [...homeEntries, ...indexedSlugs.flatMap(slug => {
    const links = languageLinks(slug);
    return locales.map(locale => ({
      url: links[locale],
      changeFrequency: "monthly" as const,
      priority: locale === "be" ? 0.9 : 0.7,
      alternates: { languages: links },
    }));
  })];
}
