# Nevrida — Next.js static site

Перенос существующего сайта Nevrida на **Next.js 16 + React 19 + TypeScript**, **SSG** и **GitHub Pages**. Сайт остается статическим и **не требует Node-сервера на продакшене**.

## Что в этом архиве

- **Главная** (`/`, `/ru/`, `/en/`) — порт старого `nevrida/nevrida.github.io` с его **оригинальными** фотографией группы, фоном, альбомами, социальными сетями, контактами и YouTube-видео. В React вместо Vue; визуальная структура сохраняется.
- **8 страниц сказок/песен** × 3 языка: `/intro/`, `/ru/intro/`, `/en/intro/` и аналогично все остальные. Белорусский (`be`) — язык URL по умолчанию; QR-ссылки не меняются.
- **2 резервные страницы** `/nevrida1/` (проект сказок) и `/nevrida2/` («О нас») × 3 языка. Пока `noindex` и дизайн-заглушки. Райдер ещё не имеет утвержденного маршрута.
- **Общая дизайн-система**: tokens/variables в `globals.css`, типографика, `SiteHeader`, `SiteFooter`, `Brand`, `OrnateFrame`, `MusicLinks`, `MusicIcon`, `Lyrics`, `LanguageSwitcher`. Нет Tailwind и глобального state management.
- **Фигма-графика**: фоновые **8 разных иллюстраций** — WebP из PDF-экспорта Figma; **логотипы и четыре орнамента — SVG**, построенные из оригинального графического материала; **музыкальные иконки — inline SVG**; тексты и номера — HTML, а не картинка.
- SEO: правильные `html lang`, canonical, `hreflang` (`be`, `ru`, `en`, `x-default`), sitemap главных и песенных страниц, OG metadata. Заглушки исключены из индекса.

## Установка

```bash
cd /Users/ag/Documents/nevrida-site
nvm use             # .nvmrc: v26.13.1
npm install         # создаст или обновит package-lock.json
npm run check:content
npm run dev
```

Локальный адрес: `http://localhost:3000/intro/`.

**Production preview (статический)**:

```bash
npm run build       # next build → out/
npm run start       # Node.js static file preview of out/, port 3000
```

`next start` намеренно НЕ используется: `output: "export"` не запускает Next.js-сервер. Дополнительной dev-зависимости `serve` не требуется.

### Как безопасно наложить новый архив на существующий проект

У тебя уже есть рабочая директория с `.git` и `package-lock.json`. Архив **не содержит `.git`, `.env`, `node_modules`, `out/` и `package-lock.json`**. Он сохраняет их при обычной распаковке поверх текущей папки, но сначала создай ветку и убедись, что рабочее дерево чистое.

```bash
cd /Users/ag/Documents/nevrida-site
git status --short
git switch -c feat/figma-fidelity

# Распаковать содержимое архива в /Users/ag/Documents/
# (внутри архива есть папка nevrida-site/)
cd /Users/ag/Documents
unzip -o ~/Downloads/nevrida-site-figma.zip

cd nevrida-site
nvm use
npm install
npm run check:content
npm run build
npm run start
```

Если работаешь в совершенно новой папке, `npm install` также создаст lock-файл. **Коммить `package-lock.json`** — в CI будет `npm ci` и воспроизводимая установка. Пока lock-файла нет, workflow умеет выполнить `npm install` для первоначальной сборки.

## Где редактировать контент

| Что менять | Файл |
|---|---|
| Песни, slug, порядок, ссылки на сервисы | `src/data/songs.ts` |
| Полные тексты песен из Figma | `src/data/lyrics.ts` |
| Переводы интерфейса, маршруты языков | `src/data/i18n.ts` |
| Телефон, e-mail, соцсети | `src/data/site.ts` |
| Привязка иллюстрации к песне | `src/data/artwork.generated.json` |
| Глобальные дизайн-токены и responsive | `src/app/globals.css` |
| Контент старой главной | `src/components/HomePage.tsx` |

Для добавления релиза заполняешь `releaseLinks` у песни. Пустые сервисы автоматически остаются без ссылок. Lyrics разворачиваются через native `<details>`, без JS. Языковой переключатель и мобильное меню — тоже `<details>`.

## Figma, типографика и точность

Источник: [новая копия Figma](https://www.figma.com/design/f8npyRccANqXSzSipoinOy/?node-id=0-1) и **18 PDF из присланного экспорта**. Для реального изображения использован источник PDF, а не снимок готовой страницы с текстом поверх. Mobile-экраны проверены по Figma.

Визуальные ориентиры desktop — **1440 px**, mobile — **360 px**. Отступы, шапка, золотая рамка и положение блоков перенесены в responsive CSS с `rem`, `clamp()`, media queries. Мы не меняем корневой `font-size` в зависимости от экрана: пользователи могут масштабировать текст.

Ограничение: в архиве **нет оригинального веб-шрифта `Columbina AltCap`** (файл и лицензия не предоставлены). Заголовки используют стек `Columbina AltCap → Cormorant Garamond → Georgia`, но без исходного файла не будут математически pixel-perfect. Весь базовый текст — `Inter`, навигация — `Philosopher` (Google Fonts с `font-display: swap`); для полностью локальной загрузки разрешенные WOFF2 можно подключить через `next/font/local` после получения файлов с подходящей лицензией. Файлы шрифтов в ZIP **не входят**.

**Проверка:** исходные artwork-файлы, SVG, CSS, локализации, QR-пути и синтаксис TS/TSX проверены программно. Полный `next build` в текущем окружении был недоступен из-за отсутствия npm-зависимостей/доступа к реестру; его нужно выполнить локально до публикации. Финальное совпадение Chrome/Safari на desktop/mobile после установки оригинального шрифта требует локального visual QA.

## CI/CD / GitHub Pages

`.github/workflows/pages.yml`:

- Pull request в `main` → `check:content` + `build`, **без деплоя**;
- push/merge в `main` → билд `out/` и публикация через `actions/deploy-pages`;
- Node-версия только из `.nvmrc`, секреты/SSH/PAT/сервер не нужны;
- минимальные permissions, `pages:write` и `id-token:write` — только в deploy job.

**Не переключай production `nevrida.by`, пока не проверил все страницы.** Домен управляется через Hoster.by (DNS направлен на GitHub Pages); Custom domain необходимо назначить в GitHub Settings → Pages. Файл `public/CNAME` сам по себе не переносит домен при Actions deployment. Старые QR-адреса сохраняются.

## Что остаётся согласовать

1. Оригинальный лицензированный `Columbina AltCap`, чтобы совпали заголовки.
2. Уточнить e-mail из Figma/старого сайта: `nevridaland@gmal.com` сохранён буквально; **не исправляли без подтверждения**.
3. Финальные материалы для `/nevrida1/`, `/nevrida2/` и райдера.
4. Окончательные ссылки песен и языковые описания для SEO.
