import type { MetadataRoute } from "next";
import { songs } from "@/data/songs";
import { languageLinks, locales } from "@/data/i18n";

export const dynamic = "force-static";

/** Published original homepage + approved song pages; unfinished reserved pages omitted. */
export default function sitemap(): MetadataRoute.Sitemap {
  const homeLinks = languageLinks();
  const homeEntries = locales.map(locale => ({ url: homeLinks[locale], changeFrequency: "monthly" as const, priority: locale === "be" ? 1 : 0.8, alternates: { languages: homeLinks } }));
  return [...homeEntries, ...songs.flatMap(song => {
    const links = languageLinks(song.slug);
    return locales.map(locale => ({
      url: links[locale],
      changeFrequency: "monthly" as const,
      priority: locale === "be" ? 0.9 : 0.7,
      alternates: { languages: links },
    }));
  })];
}
