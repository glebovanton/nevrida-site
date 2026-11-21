import { lyrics } from "./lyrics";

export const platforms = [
  "yandexMusic",
  "appleMusic",
  "spotify",
  "vkMusic",
  "itunes",
  "youtube",
] as const;

export type Platform = (typeof platforms)[number];

export type Song = {
  slug: string;
  number: string;
  title: string;
  displayTitle: string;
  metaDescription: string;
  releaseLinks: Partial<Record<Platform, string>>;
  additionalLinks?: { label: string; url: string }[];
  lyrics: string;
};

// Единственный источник данных для маршрутов, релизов, списка на главной и sitemap.
// При появлении ссылок достаточно заполнить releaseLinks нужной песни.
export const songs: readonly Song[] = [
  {
    slug: "intro",
    number: "00",
    title: "Спевы маёй зямлі",
    displayTitle: "Спевы маёй зямлі",
    metaDescription: "Спевы маёй зямлі — тэкст песні і спасылкі на музычныя пляцоўкі Nevrida.",
    releaseLinks: {},
    lyrics: lyrics.intro,
  },
  {
    slug: "zabiary-miane",
    number: "01",
    title: "Забяры мяне",
    displayTitle: "Забяры мяне",
    metaDescription: "Забяры мяне — тэкст песні і спасылкі на музычныя пляцоўкі Nevrida.",
    releaseLinks: {},
    lyrics: lyrics["zabiary-miane"],
  },
  {
    slug: "taverna-dlya-syabrou",
    number: "02",
    title: "Таверна для сяброў",
    displayTitle: "Таверна для сяброў",
    metaDescription: "Таверна для сяброў — тэкст песні і спасылкі на музычныя пляцоўкі Nevrida.",
    releaseLinks: {},
    lyrics: lyrics["taverna-dlya-syabrou"],
  },
  {
    slug: "kalyhanka",
    number: "03",
    title: "Калыханка",
    displayTitle: "Калыханка",
    metaDescription: "Калыханка — тэкст песні і спасылкі на музычныя пляцоўкі Nevrida.",
    releaseLinks: {},
    lyrics: lyrics.kalyhanka,
  },
  {
    slug: "tsyabe-mala",
    number: "04",
    title: "Цябе мала",
    displayTitle: "Цябе мала (Тры браты, кароль, паненка, цмок і ўсё такое...)",
    metaDescription: "Цябе мала — тэкст песні «Тры браты, кароль, паненка, цмок і ўсё такое» і музычныя спасылкі Nevrida.",
    releaseLinks: {},
    lyrics: lyrics["tsyabe-mala"],
  },
  {
    slug: "vouchaya-krou",
    number: "05",
    title: "Воўчая кроў",
    displayTitle: "Воўчая кроў",
    metaDescription: "Воўчая кроў — тэкст песні і спасылкі на музычныя пляцоўкі Nevrida.",
    releaseLinks: {},
    lyrics: lyrics["vouchaya-krou"],
  },
  {
    slug: "zhahi",
    number: "06",
    title: "Жахі",
    displayTitle: "Жахі",
    metaDescription: "Жахі — тэкст песні і спасылкі на музычныя пляцоўкі Nevrida.",
    releaseLinks: {},
    lyrics: lyrics.zhahi,
  },
  {
    slug: "ty-geta-ya",
    number: "07",
    title: "Ты — гэта я",
    displayTitle: "Ты — гэта я",
    metaDescription: "Ты — гэта я — тэкст песні і спасылкі на музычныя пляцоўкі Nevrida.",
    releaseLinks: {},
    lyrics: lyrics["ty-geta-ya"],
  },
];

export const reservedSlugs = ["nevrida1", "nevrida2"] as const;

export function findSong(slug: string): Song | undefined {
  return songs.find((song) => song.slug === slug);
}

export function isReservedSlug(slug: string): boolean {
  return reservedSlugs.some((reserved) => reserved === slug);
}
