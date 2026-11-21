import type { ReactNode } from "react";
import { rootMetadata } from "@/lib/seo";
import "@/app/globals.css";

export const metadata = rootMetadata("ru");
export const viewport = { width: "device-width", initialScale: 1, themeColor: "#10100d" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="ru"><body>{children}</body></html>;
}
