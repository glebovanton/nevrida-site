import { messages, type Locale } from "@/data/i18n";

export function Lyrics({ content, locale }: { content: string; locale: Locale }) {
  const t = messages[locale].lyrics;
  return (
    <details className="lyrics">
      <summary className="lyrics__summary">
        <span className="lyrics__show">{t.show}</span>
        <span className="lyrics__hide">{t.hide}</span>
      </summary>
      <div className="lyrics__content" lang="be">{content.trim()}</div>
    </details>
  );
}
