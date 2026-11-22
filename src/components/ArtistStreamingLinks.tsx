import { artistPlatforms } from "@/data/pages";

/** One accessible shared list of owner-approved artist profiles. */
export function ArtistStreamingLinks({ heading }: { heading: string }) {
  return (
    <section className="artist-streams" aria-label={heading}>
      <h2 className="artist-streams__title">{heading}</h2>
      <div className="artist-streams__links">
        {artistPlatforms.map(({ href, label }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer">
            {label} <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}
