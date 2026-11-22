import type { Locale } from "./i18n";

/** Published content pages. Keep this list separate from song data.
 * Add new editorial pages here only after their content and rendering are ready.
 * The /rider/ placeholder intentionally stays outside the indexable list.
 */
export const editorialSlugs = ["nevrida1", "nevrida2"] as const;
export type EditorialSlug = (typeof editorialSlugs)[number];

export function isEditorialSlug(value: string): value is EditorialSlug {
  return (editorialSlugs as readonly string[]).includes(value);
}

/** Owner-provided copy (BE/RU); English is an editorial translation. */
export const pages = {
  be: {
    band: {
      title: "Пра гурт Nevrida",
      paragraphs: [
        "Nevrida (Неўрыда) — беларускі калектыў, які сваёй творчасцю пагружае слухачоў у атмасферу шалёнага драйву і аўтэнтычнасці. Назва адсылае да міфічнай краіны неўраў, што існавала на тэрыторыі сучаснай Беларусі ў часы Герадота.",
        "Музыка гурта — унікальная сумесь альтэрнатыўнага року, этнічных духавых інструментаў з розных куткоў свету, сучаснай электронікі, а таксама спалучэння чыстага і народнага вакалу…",
      ],
      streams: "Слухайце Nevrida",
      storiesLink: "Казкі Неўрыды",
    },
    tales: {
      title: "Казкі Неўрыды",
      intro: [
        "Зборнік «Казкі Неўрыды» — гэта сінтэз розных відаў мастацтва: музычнага — ад беларускага фольк-рок гурта «Nevrida», літаратурнага — ад пісьменнікаў суполкі «Шуфлядка пісьменніка» і выдавецтва «Папуры», а таксама выяўленчага — ад беларускай мастачкі Ганны Дзюковай Batori.",
        "Разам мы стварылі дзіўны свет, у якім захапляльныя паданні, чароўная музыка і нерэальныя ілюстрацыі зліваюцца ў адзінае цэлае і нясуць у падарожжа па таемных казачных сцежках краіны неўраў!",
      ],
      steps: [
        { title: "КУПІЦЕ КНІГУ", text: "Усё пачынаецца з адной кнігі. Гэта не проста зборнік гісторый, а сапраўдны ключ да чароўнага свету, якога часам так не хапае ў дарослым жыцці. Асаблівы падарунак для сябе ці блізкіх, які сагрэе душу і застанецца з вамі надоўга." },
        { title: "ЧЫТАЙЦЕ РАЗАМ З ДЗЕЦЬМІ", text: "Знайдзіце ўтульны момант, абдыміцеся і пачніце чытаць. Гісторыі ў кнізе напісаны такім чынам, каб іх было цікава слухаць не толькі дарослым, але і дзецям." },
        { title: "АЖЫВІЦЕ КАЗКУ МУЗЫКАЙ", text: "Самае цікавае! Пасля кожнай казкі вы знойдзеце QR-код:", bullets: ["Бярыце смартфон", "Навядзіце камеру на код", "Слухайце і атрымлівайце асалоду!"], after: "Код вядзе на старонку з песняй, напісанай менавіта для гэтай гісторыі. Казка не заканчваецца на апошнім радку — яна пачынае гучаць!" },
      ],
      closing: "Мы стварылі гэты праект, каб чытанне ператварылася ў сапраўдную сямейную прыгоду.",
      songsTitle: "Песні да казак",
    },
  },
  ru: {
    band: {
      title: "О группе Nevrida",
      paragraphs: [
        "Nevrida (Неврида) — белорусская группа, творчество которой погружает слушателей в атмосферу безумного драйва и аутентичности. Название отсылает к мифической стране невров, существовавшей на территории современной Беларуси во времена Геродота.",
        "Музыка группы — уникальный синтез альтернативного рока, этнических духовых инструментов из разных уголков мира, современной электроники и сочетания чистого и народного вокала…",
      ],
      streams: "Слушайте Nevrida",
      storiesLink: "Сказки Невриды",
    },
    tales: {
      title: "Сказки Невриды",
      intro: [
        "Сборник «Сказки Невриды» — это синтез различных видов искусства: музыкального — от белорусской фолк-рок-группы «Nevrida», литературного — от писателей сообщества «Шуфлядка писателя» и издательства «Попурри», а также изобразительного — от белорусской художницы Анны Дюковой Batori.",
        "Вместе мы создали чудесный мир, в котором захватывающие истории, волшебная музыка и невероятные иллюстрации сливаются в единое целое и отправляют вас в путешествие по таинственным сказочным тропинкам страны Невриды!",
      ],
      steps: [
        { title: "КУПИТЕ КНИГУ", text: "Всё начинается с одной книги. Это не просто сборник историй, а настоящий ключ к волшебному миру, которого порой так не хватает во взрослой жизни. Особенный подарок для себя или близких, который согреет душу и останется с вами надолго." },
        { title: "ЧИТАЙТЕ ВМЕСТЕ С ДЕТЬМИ", text: "Найдите уютный момент, обнимитесь и начните читать. Истории в книге написаны так, чтобы их было интересно слушать не только взрослым, но и детям." },
        { title: "ОЖИВИТЕ СКАЗКУ МУЗЫКОЙ", text: "Самое интересное! После каждой сказки вы найдёте QR-код:", bullets: ["Возьмите смартфон", "Наведите камеру на код", "Слушайте и наслаждайтесь!"], after: "Код ведёт на страницу с песней, написанной специально для этой истории. Сказка не заканчивается на последней строчке — она начинает звучать!" },
      ],
      closing: "Мы создали этот проект, чтобы чтение превратилось в настоящее семейное приключение.",
      songsTitle: "Песни к сказкам",
    },
  },
  en: {
    band: {
      title: "About Nevrida",
      paragraphs: [
        "Nevrida is a Belarusian band whose music immerses listeners in a world of raw energy and authentic sound. The name refers to the mythical land of the Neuri, associated with the territory of present-day Belarus in the time of Herodotus.",
        "The band's music is a distinctive blend of alternative rock, ethnic wind instruments from around the world, contemporary electronic sounds, and a mix of clear and traditional folk vocals…",
      ],
      streams: "Listen to Nevrida",
      storiesLink: "Tales of Nevrida",
    },
    tales: {
      title: "Tales of Nevrida",
      intro: [
        "Tales of Nevrida brings together several art forms: music by the Belarusian folk-rock band Nevrida; literature by writers from the Shufliadka Pismennika community and Papuri Publishing; and visual art by Belarusian artist Hanna Dziukava (Batori).",
        "Together, we have created a wondrous world where captivating legends, enchanting music, and extraordinary illustrations become one, inviting you along the secret fairy-tale paths of the land of the Neuri!",
      ],
      steps: [
        { title: "GET THE BOOK", text: "It all begins with a book. More than a collection of stories, it is a key to a magical world that adult life can sometimes lack. A special gift for yourself or someone you love, offering warmth and memories that last." },
        { title: "READ TOGETHER WITH YOUR CHILDREN", text: "Find a cosy moment, snuggle up, and start reading. These stories are written to captivate both children and adults." },
        { title: "BRING THE TALE TO LIFE WITH MUSIC", text: "Here comes the most exciting part! After each tale, you'll find a QR code:", bullets: ["Take your smartphone", "Point the camera at the code", "Listen and enjoy!"], after: "The code takes you to a song created especially for that story. The tale doesn't end on the last page — it comes alive through music!" },
      ],
      closing: "We created this project to turn reading into a true family adventure.",
      songsTitle: "Songs from the tales",
    },
  },
} satisfies Record<Locale, {
  band: { title: string; paragraphs: string[]; streams: string; storiesLink: string };
  tales: { title: string; intro: string[]; steps: { title: string; text: string; bullets?: string[]; after?: string }[]; closing: string; songsTitle: string };
}>;

/** Official artist profiles supplied by the project owner. */
export const artistPlatforms = [
  { label: "YouTube Music", href: "https://www.youtube.com/@nevridaland/releases" },
  { label: "Spotify", href: "https://open.spotify.com/artist/5dzQUl1rpFFyUtEKEWP8zu" },
  { label: "Yandex Music", href: "https://music.yandex.by/artist/11122604" },
  { label: "VK Music", href: "https://vk.ru/artist/2136024597768909749" },
  { label: "Apple Music", href: "https://music.apple.com/ru/artist/nevrida/1557137102" },
  { label: "MTS Music", href: "https://music.mts.ru/artist/11122604" },
] as const;
