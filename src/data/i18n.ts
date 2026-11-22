/** Language codes are ISO 639-1: Belarusian is "be"; "by" is a country code. */
export const locales = ["be", "ru", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "be";
export const languageLabels: Record<Locale, string> = { be: "BE", ru: "RU", en: "EN" };

export const messages = {
  be: {
    navigation: { tales: "казкі Неўрыды", about: "пра нас", rider: "райдар", contacts: "кантакты" },
    music: { heading: "Слухаць песню", other: "астатняе", pending: "Спасылка хутка з’явіцца" },
    lyrics: { show: "тэкст песні", hide: "схаваць тэкст" },
    footer: { contacts: "Кантакты", socials: "Сацсеткі", copyright: "© Nevrida" },
    accessibility: { home: "Nevrida — галоўная", menu: "Адкрыць меню", languages: "Выбраць мову", number: "Нумар", skip: "Да асноўнага зместу" },
    reserved: { heading: "Старонка ў распрацоўцы", tales: "Праект казак Неўрыды", about: "Пра нас", body: "Матэрыялы для гэтай старонкі яшчэ рыхтуюцца." },
    seo: { homeTitle: "Nevrida — афіцыйны сайт", homeDescription: "Nevrida — песні, гісторыі і казкі, тэксты і музычныя рэлізы.", songDescription: (title: string) => `${title} — тэкст песні на беларускай мове і спасылкі на рэлізы музычнага праекта Nevrida.` },
  },
  ru: {
    navigation: { tales: "сказки Невриды", about: "о нас", rider: "райдер", contacts: "контакты" },
    music: { heading: "Слушать песню", other: "остальное", pending: "Ссылка появится позже" },
    lyrics: { show: "текст песни", hide: "скрыть текст" },
    footer: { contacts: "Контакты", socials: "Соц. сети", copyright: "© Nevrida" },
    accessibility: { home: "Nevrida — главная", menu: "Открыть меню", languages: "Выбрать язык", number: "Номер", skip: "К основному содержимому" },
    reserved: { heading: "Страница в разработке", tales: "Проект сказок Невриды", about: "О нас", body: "Материалы для этой страницы ещё готовятся." },
    seo: { homeTitle: "Nevrida — официальный сайт", homeDescription: "Nevrida — песни, истории и сказки, тексты и музыкальные релизы.", songDescription: (title: string) => `${title} — оригинальный текст песни на белорусском языке и ссылки на музыкальные релизы Nevrida.` },
  },
  en: {
    navigation: { tales: "Nevrida tales", about: "about", rider: "rider", contacts: "contacts" },
    music: { heading: "Listen to the song", other: "more", pending: "Link coming soon" },
    lyrics: { show: "song lyrics", hide: "hide lyrics" },
    footer: { contacts: "Contacts", socials: "Social media", copyright: "© Nevrida" },
    accessibility: { home: "Nevrida — home", menu: "Open menu", languages: "Choose language", number: "Track number", skip: "Skip to content" },
    reserved: { heading: "Page under construction", tales: "Nevrida tales project", about: "About us", body: "Content for this page is being prepared." },
    seo: { homeTitle: "Nevrida — official website", homeDescription: "Nevrida — original songs, tales, Belarusian lyrics and music releases.", songDescription: (title: string) => `${title} — original Belarusian-language lyrics and music release links from Nevrida.` },
  },
} as const;

export function isLocale(input: string): input is Locale {
  return (locales as readonly string[]).includes(input);
}

/** Unprefixed Belarusian paths preserve all existing printed QR codes. */
export function pathFor(locale: Locale, slug?: string): string {
  const path = slug ? `/${slug}/` : "/";
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

export function languageLinks(slug?: string): Record<Locale | "x-default", string> {
  const origin = "https://nevrida.by";
  return {
    be: origin + pathFor("be", slug),
    ru: origin + pathFor("ru", slug),
    en: origin + pathFor("en", slug),
    "x-default": origin + pathFor("be", slug),
  };
}
