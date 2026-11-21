import type { Metadata } from "next";
import { getDetailMetadata, renderDetail, staticSlugs, type SlugParams } from "@/lib/route-page";

export const dynamicParams = false;
export const generateStaticParams = staticSlugs;
export async function generateMetadata({ params }: SlugParams): Promise<Metadata> {
  return getDetailMetadata("en", (await params).slug);
}
export default async function Page({ params }: SlugParams) {
  return renderDetail("en", (await params).slug);
}
