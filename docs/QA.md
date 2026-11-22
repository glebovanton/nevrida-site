# Nevrida — editorial release QA (BE/RU/EN)

## Before publishing

1. Keep the existing production URL `https://nevrida.by`; do not change the A/NS records or GitHub Pages custom domain.
2. Ensure the original `public/` assets (brand, artwork, legacy/home, decor) are present in your local repo; this update deliberately reuses them.
3. `nvm use && npm ci && npm run check:content && npm run build` (commit an existing valid package-lock.json; do not replace it with the one from an unrelated snapshot).
4. Check `/`, `/ru/`, `/en/` for the new homepage, the biography, the tales CTA and all six artist streaming destinations.
5. Check `/nevrida1/`, `/ru/nevrida1/`, `/en/nevrida1/` for book copy, three steps, translated English content, eight QR song cards, correct locale links and mobile layout.
6. Check `/nevrida2/`, `/ru/nevrida2/`, `/en/nevrida2/` for the group biography.
7. Verify the eight original unprefixed QR routes still work. A new song added to `src/data/songs.ts` with matching `lyrics.ts` data should automatically create BE/RU/EN pages and appear in tales and sitemap.
8. Inspect all page sizes at 360/390/430/768/1024/1440/1920 px: no horizontal scroll or overlay; keyboard focus and mobile menu work.
9. Verify `out/index.html`, `out/nevrida1/index.html`, `out/nevrida2/index.html`, `out/ru/nevrida1/index.html`, `out/en/nevrida1/index.html` and existing song HTML files.
10. Confirm indexable `robots` metadata and canonical/hreflang point to `https://nevrida.by`, not the old temporary custom domain. `out/sitemap.xml` must list all real pages, not just songs.
11. For external links verify `rel="noopener noreferrer"`, correct URL and that the link opens in a new tab.
12. Before production, review the literal address `nevridaland@gmal.com` with the band: this typo-like spelling came from the source design and was not silently corrected.

## Design/assets limitations

- Latest desktop/mobile Figma includes a new photo/polaroid composition. The archive supplied in this turn contains only `src/`, not the Figma originals. The implementation uses existing release covers and band art instead of inventing new photographs. Replace the collage images with the approved originals once supplied.
- The design specifies Columbina AltCap. No font binary has been embedded or redistributed. The site uses a local `Columbina AltCap` installation if available, with the pre-existing serif fallback for users without it. To enable it for all visitors, obtain a web-use license and add a self-hosted `.woff2` in the project's `public/fonts/` folder with the documented `@font-face` rule.
- No book purchasing URL was supplied; the “Buy the book” heading describes the intended reader flow but does not lead to a guessed shop.
