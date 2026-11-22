#!/usr/bin/env node
/** Minimal zero-dependency integrity checks for the static export.
 * Adding a song must not require editing this script.
 */
import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";

const root = new URL("../", import.meta.url);
const read = name => readFileSync(new URL(name, root), "utf8");
const exists = name => existsSync(new URL(name, root));

const songsSource = read("src/data/songs.ts");
const lyricsSource = read("src/data/lyrics.ts");
const pagesSource = read("src/data/pages.ts");
const routeSource = read("src/lib/route-page.tsx");
const sitemapSource = read("src/app/sitemap.ts");
const seoSource = read("src/lib/seo.ts");
const i18nSource = read("src/data/i18n.ts");
const nextConfig = read("next.config.ts");

// Detect song records without requiring a fixed count as new songs arrive.
const songSlugs = [...songsSource.matchAll(/^\s*slug:\s*["']([a-z0-9-]+)["']/gm)].map(match => match[1]);
assert(songSlugs.length > 0, "No song definitions found");
assert.equal(new Set(songSlugs).size, songSlugs.length, "Duplicate song slug");

// Existing printed QR codes must never be removed or renamed accidentally.
const printedQrSlugs = ["intro", "zabiary-miane", "taverna-dlya-syabrou", "kalyhanka", "tsyabe-mala", "vouchaya-krou", "zhahi", "ty-geta-ya"];
for (const slug of printedQrSlugs) {
  assert(songSlugs.includes(slug), `Printed QR slug missing: ${slug}`);
}
for (const slug of songSlugs) {
  assert(lyricsSource.includes(`${slug}:`) || lyricsSource.includes(`"${slug}":`) || lyricsSource.includes(`'${slug}':`), `Lyrics entry missing: ${slug}`);
}

// Editorial pages are the single source of truth for their routes and sitemap.
const editorial = pagesSource.match(/export const editorialSlugs\s*=\s*\[([^\]]*)\]/s);
assert(editorial, "Missing editorialSlugs in src/data/pages.ts");
const editorialSlugs = [...editorial[1].matchAll(/["']([a-z0-9-]+)["']/g)].map(match => match[1]);
assert(editorialSlugs.includes("nevrida1") && editorialSlugs.includes("nevrida2"), "Required editorial routes missing");
assert.equal(new Set([...songSlugs, ...editorialSlugs, "rider"]).size, songSlugs.length + editorialSlugs.length + 1, "Conflicting detail slugs");
assert(routeSource.includes("editorialSlugs") && routeSource.includes("isEditorialSlug"), "Routes must derive editorial pages from page data");
// Guard against silently routing finished editorial pages back to placeholders.
assert(/if\s*\(slug\s*===\s*["']nevrida1["']\)\s*return\s*<TalesPage\b/.test(routeSource), "nevrida1 must render TalesPage");
assert(/if\s*\(slug\s*===\s*["']nevrida2["']\)\s*return\s*<AboutPage\b/.test(routeSource), "nevrida2 must render AboutPage");
assert(exists("src/app/editorial.css"), "Missing editorial page styles");

assert(sitemapSource.includes("editorialSlugs"), "Sitemap must derive routes from page data");
assert(sitemapSource.includes("songs.map"), "Sitemap must derive songs from song data");
assert(!sitemapSource.includes('"rider"') && !sitemapSource.includes("'rider'"), "Placeholder rider must not be in sitemap");
assert(routeSource.includes('"rider"') && routeSource.includes("riderMetadata"), "Rider route is missing");
assert(seoSource.includes("riderMetadata") && /index:\s*false/.test(seoSource), "Rider must remain noindex");

for (const locale of ["be", "ru", "en"]) {
  const directory = locale === "be" ? "src/app/(be)" : `src/app/(${locale})/${locale}`;
  for (const file of ["layout.tsx", "page.tsx", "[slug]/page.tsx"]) {
    assert(exists(`${directory}/${file}`), `Missing route: ${directory}/${file}`);
  }
  assert(read(`${directory}/layout.tsx`).includes("@/app/editorial.css"), `Editorial CSS must load for ${locale}`);
  assert(i18nSource.includes(`${locale}: {`), `Missing locale: ${locale}`);
  assert(pagesSource.includes(`${locale}: {`), `Missing editorial translation: ${locale}`);
}
assert(i18nSource.includes('return locale === defaultLocale ? path : `/${locale}${path}`'), "Original Belarusian QR URLs must stay unprefixed");
assert(nextConfig.includes('output: "export"') && nextConfig.includes('trailingSlash: true'), "GitHub Pages export settings changed");
for (const file of ["src/components/SiteHeader.tsx", "src/components/SiteFooter.tsx", "src/components/RiderPage.tsx", "src/data/lyrics.ts"]) {
  assert(exists(file), `Missing dependency: ${file}`);
}

console.log(`OK: ${songSlugs.length} songs, ${editorialSlugs.length} editorial pages, 1 noindex rider, 3 locale variants, SEO & static export.`);
