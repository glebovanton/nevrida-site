import type { Metadata, Viewport } from "next";
import { NotFoundPage } from "@/components/NotFoundPage";
import "@/app/globals.css";

// A global 404 has its own document: the locale root layouts are not rendered.
export const metadata: Metadata = {
  title: "404 — Такой старонкі няма | Nevrida",
  robots: { index: false, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function GlobalNotFound() {
  return (
    <html lang="be">
      <body><NotFoundPage /></body>
    </html>
  );
}
