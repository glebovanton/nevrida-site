import type { ReactNode } from "react";
import artwork from "@/data/artwork.generated.json";

type Corner = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
type Common = { corners?: Partial<Record<Corner, string>>; topArch?: string; bottomArch?: string };
const common = (artwork as unknown as { _common?: Common })._common;

/** Reusable decorative shell. Real Figma SVGs are optional; fallback is pure CSS. */
export function OrnateFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  const corners: { className: string; key: Corner }[] = [
    { key: "topLeft", className: "tl" }, { key: "topRight", className: "tr" },
    { key: "bottomLeft", className: "bl" }, { key: "bottomRight", className: "br" },
  ];
  return (
    <section className={`ornate-frame ${className}`}>
      <div className="ornate-frame__outline" aria-hidden="true" />
      {common?.topArch ? <img alt="" className="ornate-frame__arch ornate-frame__arch--top" src={common.topArch} /> : null}
      {common?.bottomArch ? <img alt="" className="ornate-frame__arch ornate-frame__arch--bottom" src={common.bottomArch} /> : null}
      {corners.map(({ key, className: position }) => {
        const asset = common?.corners?.[key];
        return (
          <span key={key} className={`ornate-frame__corner ornate-frame__corner--${position}${asset ? " ornate-frame__corner--asset" : ""}`} aria-hidden="true">
            {asset ? <img alt="" src={asset} /> : "❦"}
          </span>
        );
      })}
      {children}
    </section>
  );
}
