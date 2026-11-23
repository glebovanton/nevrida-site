import type { CSSProperties, ReactNode } from "react";

/** Exact Figma design-space positions, converted to percentages of the responsive design canvas. */
export type BoxRect = { x: number; y: number; w: number; h?: number };

export function FigmaSlot({
  desktop,
  mobile,
  children,
  className = "",
  style,
}: {
  desktop?: BoxRect;
  mobile?: BoxRect;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const attrs: Record<string, string | number> = {};
  if (desktop) {
    attrs["--nv-dx"] = `${desktop.x / 1440 * 100}%`;
    attrs["--nv-dy"] = desktop.y;
    attrs["--nv-dw"] = `${desktop.w / 1440 * 100}%`;
    if (desktop.h !== undefined) attrs["--nv-dh"] = desktop.h;
  }
  if (mobile) {
    attrs["--nv-mx"] = `${mobile.x / 360 * 100}%`;
    attrs["--nv-my"] = mobile.y;
    attrs["--nv-mw"] = `${mobile.w / 360 * 100}%`;
    if (mobile.h !== undefined) attrs["--nv-mh"] = mobile.h;
  }
  const presence = !desktop ? "nv-only-mobile" : !mobile ? "nv-only-desktop" : "";
  return <div className={`nv-slot ${presence} ${className}`} style={{...attrs,...style} as CSSProperties}>{children}</div>;
}

export function Art({
  src,
  desktop,
  mobile,
  className = "",
  fit = "fill",
  style,
  priority,
}: {
  src: string;
  desktop?: BoxRect;
  mobile?: BoxRect;
  className?: string;
  fit?: "fill" | "cover" | "contain";
  style?: CSSProperties;
  priority?: boolean;
}) {
  return <FigmaSlot desktop={desktop} mobile={mobile} className={`nv-art ${className}`} style={style}>
    {/* Decorative design images are intentionally out of the accessibility tree. */}
    <img src={src} alt="" aria-hidden="true" loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} draggable="false" style={{objectFit:fit}} />
  </FigmaSlot>;
}

/** Raster fills exported from the owner's Figma document, deduplicated by image hash. */
export const f = {
  grid: "320b0c4c535853dcce41c6fa11bb768a4d316905",
  fern: "5e4cca069d5a66b30c8ada759fc2514eb92f8722",
  curvedFern: "3d1e016c959d9013d5719c0feb67ea81cd6d8205",
  upperTexture: "7cf1582d7960ba017a087467a2a7f4bde10fb978",
  logo: "422c61aa6159de750f630e2e00447a3d41753f71",
  monogram: "718638d4a0f26d095a8d623772429da3d099aad1",
  polaroid: "f7fd8a98376f51041c03fac3a85cecc5dee5b7b4",
  photoDrummer: "4a68ba081ba01e8735fe5aa82dd2f1ed91ddd77b",
  photoGuitar: "e7ed7ade3e49b5721ebf906b16f18cc1c70a6753",
  photoStage: "c4d23518b3648df4f6ab9a4c15da156e0b78193b",
  photoGroup: "bc899a2a71a75c9767abd42afa643148d8a5cdb4",
  scratch: "34d50f59b8e719a94b8fcc91cde4d616cc319c6c",
  bottomScratch: "e0c0e9c37b3c45c72deba89e5a71374f829af4a4",
  tornPaper: "dca02935c1c340604d58bf28bbab17a355592412",
  bookHero: "b3c6a9fdff56e59e9daadd0203b63113a4bd91a7",
  forest: "a58fbb0cf401eda2a000005ef48512792bf4c8b9",
  forestScratch: "9df8930fa966154a30e996749b80e24ed52e97d6",
  ornaments: "5c614b300461324b6170557f98ea6087b0ca924e",
  goldFrame: "9f089f9711ccd2376a087576ed0ad09e06a1a013",
  taleArt1: "7df260e5a005e5c4ca4f4c543fc6f19b6666d3be",
  taleArt2: "e8c1b36654ba3aebdcbcd8b58e4b0419747f926f",
  taleArt3: "47c22d245964f162f4ea884a69269bf18f13bf3f",
  taleArt4: "96ed360b935d43442118dc12fa00f6ca2d0c44ee",
  finale: "e22f5c47092d84d7f61463e70e291b5292fa2785",
  finaleMobile: "71b4117ad1855deec6813cced395d7efbb32d989",
  openBookLeft: "e163b1f9753a8f9783fa2c0989eba276ea6b896b",
  openBookRight: "160113c8e2c71aa0c6f19b974f7a25b5fefa3eec",
  publisher: "560176e35e401ee8b1c0806c278da436845e7ff8",
} as const;
export function asset(key: keyof typeof f): string { return `/figma/assets/${f[key]}.webp`; }
