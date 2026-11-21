import type { ReactNode } from "react";

/** The frame's artwork is traced from the actual Figma book decoration, not a screenshot. */
const corners = ["top-left", "top-right", "bottom-left", "bottom-right"] as const;

export function OrnateFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`ornate-frame ${className}`}>
      <div className="ornate-frame__paper" aria-hidden="true">
        <span className="ornate-frame__paper-rect" />
        <span className="ornate-frame__paper-dome ornate-frame__paper-dome--top" />
        <span className="ornate-frame__paper-dome ornate-frame__paper-dome--bottom" />
      </div>
      <div className="ornate-frame__decoration" aria-hidden="true">
        <span className="ornate-frame__border ornate-frame__border--left" />
        <span className="ornate-frame__border ornate-frame__border--right" />
        <svg className="ornate-frame__arch ornate-frame__arch--top" viewBox="0 0 610 81" preserveAspectRatio="none">
          <path d="M3 80 C33 -24 575 -24 607 80" fill="none" stroke="#bd9d52" strokeWidth="5" />
          <path d="M12 80 C44 -5 566 -5 598 80" fill="none" stroke="#bd9d52" strokeWidth="1.25" />
        </svg>
        <svg className="ornate-frame__arch ornate-frame__arch--bottom" viewBox="0 0 610 81" preserveAspectRatio="none">
          <path d="M3 1 C33 105 575 105 607 1" fill="none" stroke="#bd9d52" strokeWidth="5" />
          <path d="M12 1 C44 86 566 86 598 1" fill="none" stroke="#bd9d52" strokeWidth="1.25" />
        </svg>
        {corners.map((name) => (
          <img key={name} className={`ornate-frame__ornament ornate-frame__ornament--${name}`}
            src={`/decor/ornament-${name}.svg`} width="203" height="213" alt="" />
        ))}
      </div>
      <div className="ornate-frame__content">{children}</div>
    </section>
  );
}
