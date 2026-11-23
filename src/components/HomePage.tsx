import Link from "next/link";
import type { CSSProperties } from "react";
import { pathFor, type Locale } from "@/data/i18n";
import { pages } from "@/data/pages";
import { streaming } from "@/data/streaming";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { Art, FigmaSlot, asset, type BoxRect } from "./FigmaLayout";

function Polaroid({
  desktop,
  mobile,
  picture,
  dimensions,
  kind,
}: {
  desktop: BoxRect & { h: number };
  mobile: BoxRect & { h: number };
  picture: string;
  dimensions: { dx: number; dy: number; dw: number; dh: number; mx: number; my: number; mw: number; mh: number };
  kind: string;
}) {
  return <FigmaSlot desktop={desktop} mobile={mobile} className={`nv-polaroid nv-polaroid--${kind}`}>
    <img src={asset("polaroid")} className="nv-polaroid__frame" alt="" aria-hidden="true" />
    <div className="nv-polaroid__photo" style={{
      "--pd-x": `${dimensions.dx / desktop.w * 100}%`,
      "--pd-y": `${dimensions.dy / desktop.h * 100}%`,
      "--pd-w": `${dimensions.dw / desktop.w * 100}%`,
      "--pd-h": `${dimensions.dh / desktop.h * 100}%`,
      "--pm-x": `${dimensions.mx / mobile.w * 100}%`,
      "--pm-y": `${dimensions.my / mobile.h * 100}%`,
      "--pm-w": `${dimensions.mw / mobile.w * 100}%`,
      "--pm-h": `${dimensions.mh / mobile.h * 100}%`,
    } as CSSProperties}>
      <img src={picture} alt="" aria-hidden="true" loading="eager" />
    </div>
  </FigmaSlot>;
}

const texts = {
  be: {
    title: "Мяняемся, каб",
    line: "быць сабой",
    read: "даведацца больш",
    project: "глядзець праект",
    listen: "Паслухаць нас",
  },
  ru: {
    title: "Меняемся, чтобы",
    line: "быть собой",
    read: "узнать подробнее",
    project: "посмотреть",
    listen: "Послушать нас",
  },
  en: {
    title: "We change to",
    line: "be ourselves",
    read: "learn more",
    project: "explore the project",
    listen: "Listen to us",
  },
} as const;

const iconSvg = {
  youtube: "home-youtube.svg",
  yandex: "home-yandex.svg",
  apple: "home-apple.svg",
  spotify: "home-spotify.svg",
  vk: "home-vk.svg",
  mts: "home-mts.svg",
} as const;
const iconPos = [
  { x: 119, y: 2103, w: 184, h: 136 },
  { x: 321, y: 2102, w: 190, h: 136 },
  { x: 526, y: 2103, w: 184, h: 136 },
  { x: 729, y: 2103, w: 184, h: 136 },
  { x: 930, y: 2103, w: 184, h: 136 },
  { x: 1176, y: 2103, w: 94, h: 136 },
];
const mobileHitAreas = [
  { x: 36, y: 1653, w: 144, h: 103 },
  { x: 176, y: 1653, w: 148, h: 103 },
  { x: 179, y: 1801, w: 143, h: 103 },
  { x: 38, y: 1801, w: 143, h: 103 },
  { x: 36, y: 1949, w: 146, h: 104 },
  { x: 214, y: 1949, w: 76, h: 104 },
];

export function HomePage({ locale }: { locale: Locale }) {
  const copy = texts[locale];
  const data = pages[locale];
  return <div className="site-shell nv-site-shell nv-home">
    <div className="nv-canvas" data-figma-design="122:463,122:636">
      <div className="nv-home__ground" aria-hidden="true" />
      <Art src={asset("fern")} desktop={{x:-529,y:-104,w:1233,h:1233}} mobile={{x:-234,y:-40,w:530,h:530}} className="nv-fern nv-fern--a" />
      <Art src={asset("fern")} desktop={{x:224,y:-87,w:1057,h:1057}} mobile={{x:90,y:-33,w:454,h:454}} className="nv-fern nv-fern--b" />
      <Art src={asset("curvedFern")} desktop={{x:952,y:225,w:688,h:688}} mobile={{x:47,y:471,w:554,h:554}} className="nv-fern nv-fern--c" />
      <Art src={asset("grid")} desktop={{x:88,y:454,w:1240,h:843}} mobile={{x:-149,y:423,w:607,h:484}} className="nv-grid-art" />
      <Art src={asset("upperTexture")} desktop={{x:-77,y:-322,w:1605,h:1461}} mobile={{x:-40,y:-135,w:690,h:628}} className="nv-texture nv-texture--upper" />
      <Art src={asset("scratch")} desktop={{x:-187,y:-19,w:1627,h:1162}} mobile={{x:-87,y:-4,w:699,h:499}} className="nv-texture nv-texture--lower" />
      <Art src={asset("scratch")} desktop={{x:-89,y:1139,w:1617,h:1154}} className="nv-texture nv-texture--book" />
      <Art src={asset("bottomScratch")} desktop={{x:-89,y:2083,w:1617,h:675}} mobile={{x:-233,y:1042,w:825,h:1801}} className="nv-texture nv-texture--bottom" />
      <Art src={asset("tornPaper")} desktop={{x:-30,y:-419,w:1636,h:514}} mobile={{x:-26,y:-182,w:703,h:221}} className="nv-torn-paper" />

      <SiteHeader locale={locale} figmaAssets />
      <main id="main" className="nv-main">
        <h1 className="visually-hidden">Nevrida — {data.band.title}</h1>
        <Art src={asset("logo")} desktop={{x:48,y:146,w:726,h:431}} mobile={{x:20,y:65,w:320,h:189}} className="nv-hero-logo" priority />
        <FigmaSlot desktop={{x:499,y:501,w:371,h:107}} mobile={{x:117,y:258,w:225,h:65}} className="nv-genre"><span>{locale === "ru" ? "фольк-рок группа" : locale === "be" ? "фольк-рок гурт" : "folk-rock band"}</span></FigmaSlot>
        <Polaroid desktop={{x:858,y:124,w:323,h:391}} mobile={{x:48,y:319,w:185,h:224}} picture={asset("photoDrummer")} dimensions={{dx:31,dy:42,dw:257,dh:259,mx:18,my:24,mw:147,mh:148}} kind="one" />
        <Polaroid desktop={{x:971,y:110,w:372,h:427}} mobile={{x:112,y:311,w:213,h:245}} picture={asset("photoGuitar")} dimensions={{dx:48,dy:47,dw:287,dh:286,mx:28,my:27,mw:164,mh:164}} kind="two" />
        <Polaroid desktop={{x:794,y:239,w:369,h:426}} mobile={{x:11,y:385,w:212,h:244}} picture={asset("photoStage")} dimensions={{dx:38,dy:46,dw:284,dh:285,mx:22,my:26,mw:162,mh:163}} kind="three" />
        <Polaroid desktop={{x:1002,y:298,w:381,h:434}} mobile={{x:130,y:418,w:218,h:248}} picture={asset("photoGroup")} dimensions={{dx:52,dy:48,dw:291,dh:290,mx:30,my:28,mw:166,mh:166}} kind="four" />

        <FigmaSlot desktop={{x:75,y:739,w:633,h:247}} mobile={{x:37,y:660,w:323,h:126}} className="nv-slogan">
          <span className="nv-slogan__main">{copy.title}</span>
          <span className="nv-slogan__hand">{copy.line}</span>
        </FigmaSlot>
        <FigmaSlot desktop={{x:793,y:849,w:572,h:172}} mobile={{x:37,y:809,w:292,h:340}} className="nv-home__about-copy">
          <p>{data.band.paragraphs.join(" ")}</p>
        </FigmaSlot>
        <FigmaSlot desktop={{x:793,y:1048,w:210,h:24}} mobile={{x:37,y:1154,w:220,h:26}} className="nv-home__about-link">
          <Link href={pathFor(locale,"nevrida2")}>{copy.read} <span aria-hidden="true">↗</span></Link>
        </FigmaSlot>

        <Art src={asset("bookHero")} desktop={{x:40,y:1157,w:1356,h:637}} mobile={{x:-1,y:1209,w:363,h:283}} fit="cover" className="nv-home__book-image" priority />
        <FigmaSlot desktop={{x:1243,y:1181,w:137,h:30}} mobile={{x:33,y:1512,w:295,h:62}} className="nv-home__book-link">
          <Link href={pathFor(locale,"nevrida1")}>{copy.project} <span aria-hidden="true">↗</span></Link>
        </FigmaSlot>
        <FigmaSlot desktop={{x:382,y:1829,w:676,h:65}} className="nv-home__book-summary"><p>{data.tales.intro[1]}</p></FigmaSlot>
        <FigmaSlot desktop={{x:31,y:1987,w:440,h:45}} className="nv-home__listen-title"><h2>{copy.listen}</h2></FigmaSlot>
        <FigmaSlot mobile={{x:36,y:1573,w:288,h:476}} className="nv-home__mobile-icons">
          <img src="/figma/svg/home-mobile-platforms.svg" alt="" aria-hidden="true" />
        </FigmaSlot>
        {streaming.map((s,index) => <FigmaSlot key={s.id} desktop={iconPos[index]} mobile={mobileHitAreas[index]} className="nv-home__streaming-icon">
          <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
            <img src={`/figma/svg/${iconSvg[s.id as keyof typeof iconSvg]}`} alt="" aria-hidden="true" />
          </a>
        </FigmaSlot>)}
      </main>
      <SiteFooter locale={locale} figmaAssets />
    </div>
  </div>;
}
