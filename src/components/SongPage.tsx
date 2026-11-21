import type { CSSProperties } from "react";
import type { Song } from "@/data/songs";
import type { Locale } from "@/data/i18n";
import { messages } from "@/data/i18n";
import artwork from "@/data/artwork.generated.json";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { OrnateFrame } from "./OrnateFrame";
import { MusicLinks } from "./MusicLinks";
import { Lyrics } from "./Lyrics";

type ArtworkMap = Record<string, { desktop?: string; mobile?: string }>;

export function SongPage({ song, locale }: { song: Song; locale: Locale }) {
  const scene = (artwork as ArtworkMap)[song.slug] ?? {};
  const style = {
    "--scene-desktop": scene.desktop ? `url("${scene.desktop}")` : "none",
    "--scene-mobile": scene.mobile ? `url("${scene.mobile}")` : scene.desktop ? `url("${scene.desktop}")` : "none",
  } as CSSProperties;
  return (
    <div className="site-shell song-scene" data-scene={song.slug} style={style}>
      <div className="song-scene__art" aria-hidden="true" />
      <SiteHeader locale={locale} slug={song.slug} />
      <main id="main" className="song-main">
        <OrnateFrame className={song.slug === "tsyabe-mala" ? "ornate-frame--long-title" : ""}>
          <div className="song-number" aria-label={`${messages[locale].accessibility.number} ${song.number}`}><span>•</span>{song.number}<span>•</span></div>
          <h1 className="song-title" lang="be">{song.displayTitle}</h1>
          <div className="song-rule" aria-hidden="true" />
          <MusicLinks song={song} locale={locale} />
          <Lyrics content={song.lyrics} locale={locale} />
        </OrnateFrame>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
