import { platforms, type Platform, type Song } from "@/data/songs";
import { messages, type Locale } from "@/data/i18n";

const labels: Record<Platform, string> = {
  yandexMusic: "Yandex Music",
  appleMusic: "Apple Music",
  spotify: "Spotify",
  vkMusic: "VK Music",
  itunes: "iTunes",
  youtube: "YouTube",
};

/**
 * Original Figma icon groups, with separate semantic hit areas in song data order.
 * These are exported vector assets, not screenshots of the webpage.
 * Links remain independent, accessible HTML anchors when a URL is supplied.
 */
export function MusicLinks({ song, locale }: { song: Song; locale: Locale }) {
  const t = messages[locale].music;
  return (
    <section className="song-figma__music" aria-label={t.heading}>
      <div className="song-figma__music-icons">
        <picture aria-hidden="true">
          <source media="(max-width: 700px)" srcSet="/figma/song/music-icons-mobile.svg" />
          <img src="/figma/song/music-icons-desktop.svg" alt="" width="749" height="82" draggable="false" />
        </picture>
        <div className="song-figma__music-hitareas">
          {platforms.map((platform) => {
            const url = song.releaseLinks[platform];
            const label = `${song.title}: ${labels[platform]}`;
            return url ? (
              <a key={platform} href={url} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} />
            ) : (
              <span key={platform} role="img" aria-label={`${labels[platform]}: ${t.pending}`} title={t.pending} />
            );
          })}
        </div>
      </div>
      <div className="song-figma__music-more">
        {song.additionalLinks?.length ? (
          song.additionalLinks.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
          ))
        ) : (
          <span title={t.pending}>{t.other}</span>
        )}
      </div>
    </section>
  );
}
