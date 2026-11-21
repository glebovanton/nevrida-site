import Link from "next/link";
import { messages, pathFor, type Locale } from "@/data/i18n";

/** Original Nevrida artwork vectorized from the owner's Figma PDF export. */
export function Brand({ locale, large = false }: { locale: Locale; large?: boolean }) {
  return (
    <Link href={pathFor(locale)} className={large ? "brand brand--large" : "brand"} aria-label={messages[locale].accessibility.home}>
      <img
        src={large ? "/brand/wordmark.svg" : "/brand/monogram.svg"}
        alt="Nevrida"
        width={large ? 270 : 63}
        height={large ? 155 : 42}
      />
    </Link>
  );
}
