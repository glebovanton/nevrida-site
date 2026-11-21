import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SongPage } from "@/components/SongPage";
import { ReservedPage } from "@/components/ReservedPage";
import { findSong, isReservedSlug, reservedSlugs, songs } from "@/data/songs";
import { type Locale } from "@/data/i18n";
import { reservedMetadata, songMetadata } from "@/lib/seo";

export type SlugParams = { params: Promise<{ slug: string }> };
export const staticSlugs = () => [...songs.map(({slug}) => ({slug})), ...reservedSlugs.map(slug => ({slug}))];

export function getDetailMetadata(locale: Locale, slug: string): Metadata {
  const song = findSong(slug);
  if (song) return songMetadata(locale, song);
  if (isReservedSlug(slug)) return reservedMetadata(locale, slug as "nevrida1" | "nevrida2");
  return {};
}

export function renderDetail(locale: Locale, slug: string) {
  const song = findSong(slug);
  if (song) return <SongPage locale={locale} song={song} />;
  if (isReservedSlug(slug)) return <ReservedPage locale={locale} slug={slug as "nevrida1" | "nevrida2"} />;
  notFound();
}
