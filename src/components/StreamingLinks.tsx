import { streaming } from "@/data/streaming";
import { MusicIcon } from "./MusicIcon";

/** Shared artist-level links, distinct from per-song release links. */
export function StreamingLinks({ heading, className = "" }: { heading: string; className?: string }) {
  return (
    <section className={`streaming ${className}`} aria-labelledby="streaming-title">
      <h2 id="streaming-title" className="streaming__heading">{heading}</h2>
      <div className="streaming__grid">
        {streaming.map(({ id, label, href, icon }) => (
          <a key={id} className="streaming__item" href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} — Nevrida`}>
            <span className="streaming__icon"><MusicIcon platform={icon} /></span>
            <span className="streaming__label">{label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
