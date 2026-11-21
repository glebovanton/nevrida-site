import { platforms, type Platform, type Song } from "@/data/songs";
import { messages, type Locale } from "@/data/i18n";
import { MusicIcon } from "./MusicIcon";

const labels: Record<Platform, string> = {
  yandexMusic: "Яндекс Музыка", appleMusic: "Apple Music", spotify: "Spotify",
  vkMusic: "VK Музыка", itunes: "iTunes", youtube: "YouTube",
};

export function MusicLinks({ song, locale }: { song: Song; locale: Locale }) {
  const t = messages[locale].music;
  return (
    <section className="music" aria-label={t.heading}>
      <div className="music__grid">
        {platforms.map(platform => {
          const url = song.releaseLinks[platform];
          const contents = <><span className="music__icon"><MusicIcon platform={platform} /></span><span className="music__label">{labels[platform]}</span></>;
          return url ? (
            <a key={platform} className="music__item music__item--active" href={url} target="_blank" rel="noopener noreferrer" aria-label={`${song.title} — ${labels[platform]}`}>{contents}</a>
          ) : (
            <span key={platform} className="music__item music__item--pending" title={t.pending} aria-label={`${labels[platform]} — ${t.pending}`}>{contents}</span>
          );
        })}
      </div>
      <div className="music__other">
        {song.additionalLinks?.length ? song.additionalLinks.map(link => (
          <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
        )) : <span title={t.pending}>{t.other}</span>}
      </div>
    </section>
  );
}
