import Link from "next/link";
import artwork from "@/data/artwork.generated.json";
import { messages, pathFor, type Locale } from "@/data/i18n";

/** Replace the text fallback with the owner's original Figma logo asset when available. */
export function Brand({ locale, large = false }: { locale: Locale; large?: boolean }) {
  const common = (artwork as unknown as { _common?: { headerLogo?: string; footerLogo?: string } })._common;
  const image = large ? common?.footerLogo : common?.headerLogo;
  return (
    <Link href={pathFor(locale)} className={large ? "brand brand--large" : "brand"} aria-label={messages[locale].accessibility.home}>
      {image ? <img className="brand__asset" src={image} alt="Nevrida" /> : large ? (
        <><span className="brand__ornament" aria-hidden="true">❦</span><span className="brand__word">NEVRIDA</span></>
      ) : <span className="brand__monogram" aria-hidden="true">N<span>✦</span></span>}
    </Link>
  );
}
