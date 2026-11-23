import type { CSSProperties } from "react";
import type { Song } from "@/data/songs";
import type { Locale } from "@/data/i18n";
import { messages } from "@/data/i18n";
import artwork from "@/data/artwork.generated.json";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { MusicLinks } from "./MusicLinks";
import { Lyrics } from "./Lyrics";
import "@/app/song-figma.css";

type ArtworkMap = Record<string, { desktop?: string; mobile?: string }>;

/**
 * One song template for all eight song slugs and all three locale routes.
 * The Figma exports describe the shared frame, two disclosure states, and
 * a sample illustration for /intro/. Other songs keep their own artwork.
 */
export function SongPage({ song, locale }: { song: Song; locale: Locale }) {
  const scene = (artwork as ArtworkMap)[song.slug] ?? {};
  const isIntro = song.slug === "intro";
  const introTitleParts = isIntro ? song.displayTitle.split(" ") : [];
  const desktopArt = isIntro ? "/figma/song/intro-forest.webp" : scene.desktop;
  const mobileArt = isIntro ? "/figma/song/intro-forest.webp" : scene.mobile ?? scene.desktop;
  const style = {
    "--song-scene-desktop": desktopArt ? `url("${desktopArt}")` : "none",
    "--song-scene-mobile": mobileArt ? `url("${mobileArt}")` : "none",
  } as CSSProperties;

  return (
    <div className="site-shell song-figma" data-song={song.slug} style={style}>
      <div className="song-figma__background" aria-hidden="true" />
      <SiteHeader locale={locale} slug={song.slug} figmaAssets />
      <main className="song-figma__main" id="main">
        <article className={`song-figma__frame${song.slug === "tsyabe-mala" ? " song-figma__frame--long-title" : ""}`}>
          {/* Frame is assembled from native Figma vectors + transparent original ornaments.
              Only the paper body and straight side rails grow with lyric length.
              Decorative corners/arches keep their native aspect ratio. */}
          <div className="song-figma__frame-decoration" aria-hidden="true">
            <span className="song-figma__paper-rect" />
            <span className="song-figma__paper-dome song-figma__paper-dome--top" />
            <span className="song-figma__paper-dome song-figma__paper-dome--bottom" />
            <span className="song-figma__arch song-figma__arch--top" />
            <span className="song-figma__arch song-figma__arch--bottom" />
            <span className="song-figma__frame-rails" />
            <span className="song-figma__ornament song-figma__ornament--top-left" />
            <span className="song-figma__ornament song-figma__ornament--top-right" />
            <span className="song-figma__ornament song-figma__ornament--bottom-left" />
            <span className="song-figma__ornament song-figma__ornament--bottom-right" />
          </div>
          <div className="song-figma__number" aria-label={`${messages[locale].accessibility.number} ${song.number}`}>
            <span className="song-figma__number-digits">{song.number}</span>
          </div>
          <h1 className="song-figma__title" lang="be">{isIntro ? (<>
            <span>{introTitleParts.slice(0, 2).join(" ")}</span>
            <span>{introTitleParts.slice(2).join(" ")}</span>
          </>) : song.displayTitle}</h1>
          <div className="song-figma__rule" aria-hidden="true" />
          <MusicLinks song={song} locale={locale} />
          <Lyrics content={song.lyrics} locale={locale} />
        </article>
      </main>
      <SiteFooter locale={locale} figmaAssets />
    </div>
  );
}
