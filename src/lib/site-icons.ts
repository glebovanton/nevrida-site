import type { Metadata } from "next";

/** Shared by every locale and the standalone global 404 document. */
export const siteIcons: NonNullable<Metadata["icons"]> = {
  icon: [
    { url: "/favicon.ico", type: "image/x-icon", sizes: "16x16 32x32 48x48 64x64" },
    { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
  ],
  apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
};
