import Link from "next/link";
import { messages, pathFor, type Locale } from "@/data/i18n";

/** Original Nevrida artwork vectorized from the owner's Figma PDF export. */
export function Brand({ locale, large = false, figmaAssets = false }: { locale: Locale; large?: boolean; figmaAssets?: boolean }) {
  return (
    <Link href={pathFor(locale)} className={large ? "brand brand--large" : "brand"} aria-label={messages[locale].accessibility.home}>
      <img
        src={figmaAssets ? (large ? "/figma/assets/422c61aa6159de750f630e2e00447a3d41753f71.webp" : "/figma/assets/718638d4a0f26d095a8d623772429da3d099aad1.webp") : (large ? "/brand/wordmark.svg" : "/brand/monogram.svg")}
        alt="Nevrida"
        width={large ? 270 : 63}
        height={large ? 155 : 42}
      />
    </Link>
  );
}
