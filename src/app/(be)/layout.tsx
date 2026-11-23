import type { ReactNode } from "react";
import { rootMetadata } from "@/lib/seo";
import "@/app/globals.css";
import "@/app/editorial.css";
import "@/app/figma.css";

export const metadata = rootMetadata("be");
export const viewport = { width: "device-width", initialScale: 1, themeColor: "#10100d" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="be"><body>{children}</body></html>;
}
