import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SongPage } from "@/components/SongPage";
import { TalesPage } from "@/components/TalesPage";
import { AboutPage } from "@/components/AboutPage";
import { RiderPage } from "@/components/RiderPage";
import { findSong, songs } from "@/data/songs";
import { editorialSlugs, isEditorialSlug } from "@/data/pages";
import { type Locale } from "@/data/i18n";
import { reservedMetadata, riderMetadata, songMetadata } from "@/lib/seo";

export type SlugParams = { params: Promise<{ slug: string }> };

/** Song routes remain data-driven, editorial content uses its dedicated components. */
export const staticSlugs = () => [
  ...songs.map(({ slug }) => ({ slug })),
  ...editorialSlugs.map(slug => ({ slug })),
  { slug: "rider" },
];

export function getDetailMetadata(locale: Locale, slug: string): Metadata {
  const song = findSong(slug);
  if (song) return songMetadata(locale, song);
  if (slug === "rider") return riderMetadata(locale);
  if (isEditorialSlug(slug)) return reservedMetadata(locale, slug);
  return {};
}

export function renderDetail(locale: Locale, slug: string) {
  const song = findSong(slug);
  if (song) return <SongPage locale={locale} song={song} />;
  if (slug === "nevrida1") return <TalesPage locale={locale} />;
  if (slug === "nevrida2") return <AboutPage locale={locale} />;
  if (slug === "rider") return <RiderPage locale={locale} />;
  notFound();
}
