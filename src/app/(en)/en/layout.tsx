import type { ReactNode } from "react";
import { rootMetadata } from "@/lib/seo";
import "@/app/globals.css";
import "@/app/editorial.css";

export const metadata = rootMetadata("en");
export const viewport = { width: "device-width", initialScale: 1, themeColor: "#10100d" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
