# Columbina AltCap: optional licensed webfont setup

The designer identified `Columbina AltCap` as the display typeface: https://fonts-online.ru/fonts/columbina-altcap

The archive intentionally contains **no font binaries**. The license for web distribution has not been confirmed. A font being downloadable from a third-party site is not proof of permission to self-host it.

When the project owner provides a **licensed webfont** (`ColumbinaAltCap.woff2`), copy it to `public/fonts/ColumbinaAltCap.woff2` and add this `@font-face` rule **before** `:root` in `src/app/globals.css`:

```css
@font-face {
  font-family: "Columbina AltCap";
  src: url("/fonts/ColumbinaAltCap.woff2") format("woff2");
  font-style: normal;
  font-weight: 400 700;
  font-display: swap;
}
```

Only declare the weights actually present in the licensed font file (for a non-variable regular face, use `font-weight: 400`). The typography already uses `--font-display: "Columbina AltCap", "Cormorant Garamond", Georgia, serif` so no component code changes will be needed.
