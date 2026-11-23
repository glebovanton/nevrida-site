import Link from "next/link";
import { pages } from "@/data/pages";
import { pathFor, type Locale } from "@/data/i18n";
import { songs } from "@/data/songs";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { Art, FigmaSlot, asset } from "./FigmaLayout";

const language = {
  be: { album: "Альбом «Казкі Неўрыды»", listen: "слухаць альбом", buy: "набыць", song: "Песня" },
  ru: { album: "Альбом «Казкі Неўрыды»", listen: "слушать альбом", buy: "купить", song: "Песня" },
  en: { album: "Tales of Nevrida album", listen: "listen to the album", buy: "buy", song: "Song" },
} as const;

function StepTitle({ title, number }: { title: string; number: number }) {
  const lower = title.toLocaleLowerCase();
  return <h2>{number}. {lower.charAt(0).toLocaleUpperCase() + lower.slice(1)}</h2>;
}

export function TalesPage({ locale }: { locale: Locale }) {
  const tales = pages[locale].tales;
  const l = language[locale];
  const [buy,read,music] = tales.steps;
  return <div className="site-shell nv-site-shell nv-tales">
    <div className="nv-canvas" data-figma-design="96:2,96:169">
      <div className="nv-tales__ground" aria-hidden="true" />
      <Art src={asset("forest")} desktop={{x:-395,y:0,w:2229,h:3343}} mobile={{x:-578,y:0,w:2229,h:3343}} className="nv-tales__forest" fit="cover" priority />
      <Art src={asset("ornaments")} desktop={{x:-215,y:990,w:1773,h:2499}} className="nv-tales__ornaments" />
      <Art src={asset("forestScratch")} desktop={{x:-89,y:2502,w:1617,h:1154}} className="nv-tales__grunge" />
      <FigmaSlot desktop={{x:158,y:762,w:1125,h:2368}} mobile={{x:20,y:101,w:320,h:3646}} className="nv-tales__panel"><span /></FigmaSlot>
      <Art src={asset("bookHero")} desktop={{x:158,y:142,w:1125,h:620}} mobile={{x:0,y:0,w:360,h:350}} className="nv-tales__hero-image" fit="cover" priority />
      <SiteHeader locale={locale} slug="nevrida1" figmaAssets />

      <main id="main" className="nv-main">
        {/* Bookmarks link to the eight real QR song routes, rather than static labels. */}
        {songs.map((song,index) => <FigmaSlot key={song.slug}
          desktop={{x:index<4 ? 179+index*58 : 1041+(index-4)*58,y:142,w:47,h:index===0?133:71}}
          mobile={{x:index<4 ? -1 : 294,y:106+(index<4?index:7-index)*53,w:index===0?123:67,h:53}}
          className={`nv-tales__bookmark nv-tales__bookmark--${index}`}>
          <Link href={pathFor(locale,song.slug)} aria-label={`${l.song} ${song.number}: ${song.title}`} title={song.title}>
            <span>{index===0 ? `${l.song} №0` : `№${index}`}</span>
          </Link>
        </FigmaSlot>)}

        <Art src={asset("goldFrame")} desktop={{x:202,y:775,w:1036,h:638}} mobile={{x:35,y:363,w:290,h:179}} className="nv-tales__frame nv-tales__frame--top" />
        <FigmaSlot desktop={{x:476,y:864,w:668,h:285}} mobile={{x:46,y:418,w:310,h:142}} className="nv-tales__poem">
          <h1><span>Ой вецер вее</span><span>у сэрцы засее</span><span>спевы маёй</span><span>зямлі...</span></h1>
        </FigmaSlot>
        <FigmaSlot desktop={{x:251,y:1162,w:325,h:90}} mobile={{x:46,y:595,w:228,h:58}} className="nv-tales__album-heading">
          <h2>{l.album}</h2>
        </FigmaSlot>
        <FigmaSlot desktop={{x:612,y:1162,w:593,h:230}} mobile={{x:46,y:660,w:286,h:479}} className="nv-tales__intro">
          {tales.intro.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </FigmaSlot>
        <FigmaSlot desktop={{x:612,y:1406,w:250,h:27}} mobile={{x:46,y:1185,w:250,h:27}} className="nv-tales__listen">
          <a href="https://www.youtube.com/@nevridaland/releases" target="_blank" rel="noopener noreferrer">{l.listen} <span aria-hidden="true">↗</span></a>
        </FigmaSlot>

        <Art src={asset("taleArt1")} desktop={{x:158,y:1480,w:217,h:322}} mobile={{x:46,y:1240,w:204,h:303}} fit="cover" className="nv-tales__illustration" />
        <Art src={asset("taleArt2")} desktop={{x:407,y:1608,w:175,h:236}} mobile={{x:46,y:1568,w:314,h:236}} fit="cover" className="nv-tales__illustration" />
        <Art src={asset("taleArt3")} desktop={{x:614,y:1478,w:404,h:406}} mobile={{x:0,y:1829,w:360,h:362}} fit="cover" className="nv-tales__illustration" />
        <Art src={asset("taleArt4")} desktop={{x:1050,y:1480,w:233,h:273}} className="nv-tales__illustration" fit="cover" />

        <FigmaSlot desktop={{x:614,y:1937,w:443,h:32}} mobile={{x:46,y:2237,w:268,h:30}} className="nv-tales__step-heading"><StepTitle title={buy.title} number={1} /></FigmaSlot>
        <FigmaSlot desktop={{x:642,y:1991,w:548,h:82}} mobile={{x:46,y:2319,w:268,h:271}} className="nv-tales__step-text"><p>{buy.text}</p></FigmaSlot>
        <FigmaSlot desktop={{x:1090,y:1944,w:87,h:21}} mobile={{x:46,y:2276,w:150,h:27}} className="nv-tales__buy"><span title="Ссылка на магазин пока не указана">{l.buy} <span aria-hidden="true">↗</span></span></FigmaSlot>
        <FigmaSlot desktop={{x:614,y:2090,w:500,h:32}} mobile={{x:46,y:2606,w:268,h:54}} className="nv-tales__step-heading"><StepTitle title={read.title} number={2} /></FigmaSlot>
        <FigmaSlot desktop={{x:642,y:2144,w:472,h:80}} mobile={{x:46,y:2687,w:268,h:146}} className="nv-tales__step-text"><p>{read.text}</p></FigmaSlot>
        <FigmaSlot desktop={{x:614,y:2224,w:500,h:32}} mobile={{x:46,y:2864,w:268,h:60}} className="nv-tales__step-heading"><StepTitle title={music.title} number={3} /></FigmaSlot>
        <FigmaSlot desktop={{x:642,y:2278,w:546,h:165}} mobile={{x:46,y:2950,w:277,h:392}} className="nv-tales__step-text nv-tales__step-text--last">
          <p>{music.text}</p>
          {music.bullets && <ul>{music.bullets.map(item=><li key={item}>{item}</li>)}</ul>}
          {music.after && <p>{music.after}</p>}
        </FigmaSlot>

        <Art src={asset("openBookLeft")} desktop={{x:72,y:1973,w:253,h:335}} mobile={{x:70,y:3319,w:187,h:247}} className="nv-tales__openbook" fit="cover" />
        <Art src={asset("openBookRight")} desktop={{x:287,y:1945,w:253,h:335}} mobile={{x:229,y:3299,w:187,h:247}} className="nv-tales__openbook" fit="cover" />
        <Art src={asset("goldFrame")} desktop={{x:202,y:2469,w:1036,h:638}} mobile={{x:35,y:3910,w:290,h:179}} className="nv-tales__frame nv-tales__frame--bottom" />
        <Art src={asset("finale")} desktop={{x:251,y:2465,w:939,h:343}} className="nv-tales__finale" fit="cover" />
        <Art src={asset("finaleMobile")} mobile={{x:0,y:3148,w:359,h:640}} className="nv-tales__finale" fit="cover" />
        <FigmaSlot desktop={{x:513,y:2867,w:414,h:69}} mobile={{x:33,y:3850,w:294,h:78}} className="nv-tales__closing"><p>{tales.closing}</p></FigmaSlot>
        <Art src={asset("publisher")} desktop={{x:614,y:2950,w:90,h:76}} mobile={{x:74,y:3967,w:90,h:76}} className="nv-tales__publisher" />
        <FigmaSlot desktop={{x:751,y:2955,w:76,h:65}} mobile={{x:211,y:3972,w:76,h:65}} className="nv-tales__publisher-text"><span>ПАПУРЫ<small>МИНСК</small></span></FigmaSlot>
      </main>
      <SiteFooter locale={locale} figmaAssets />
    </div>
  </div>;
}
