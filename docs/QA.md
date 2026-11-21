# QA — обновлённый проект с локализацией

## Проверено локально без доступа к npm registry

- `npm run check:content`: **PASS**, 8 песен, 10 корневых QR-адресов, 3 языковых набора URL, static export.
- TypeScript parser/transpile (глобальный TypeScript): **PASS** для 28 исходников `.ts/.tsx`; проверяет синтаксис, **не** typechecking Next.
- CSS (tinycss2): **PASS**, ошибок парсинга нет.
- Отдельное автономное HTML/CSS-превью структуры: проверены 360 / 390 / 768 / 1024 / 1440 px; горизонтального переполнения нет.
- В автономном превью проверено открытие/закрытие native `<details>` мобильного меню и переключателя языков, наличие ссылок на `/ru/intro/` и `/en/intro/`.

## Не подтверждено — перед публикацией обязательно

- Полная сборка `npm run build`: установку Next.js нельзя выполнить в этом окружении, так как npm registry недоступен (offline cache `ENOTCACHED`). Это **не** является пройденным E2E.
- `pixel-perfect` соответствие Figma: оригинальные иллюстрации (8 desktop + 8 mobile), логотипы/декор и лицензированный Columbina AltCap пока отсутствуют в поставке.
- Проверка HTML, metadata, canonical/hreflang и sitemap на **реальном** `out/` после установки Next-зависимостей.
- Проверка официального email и будущих ссылок на релизы владельцем сайта.

## Локальный smoke-test после `npm install`

```bash
npm run check:content
npm run build
for path in intro ru/intro en/intro zhahi ru/zhahi en/zhahi nevrida1 ru/nevrida1 en/nevrida2; do
  test -f "out/$path/index.html" || echo "MISSING out/$path/index.html"
done
ls -l out/sitemap.xml out/robots.txt out/CNAME
```

На готовых страницах убедиться:

- `out/intro/index.html`: `<html lang="be">`, canonical `https://nevrida.by/intro/`.
- `out/ru/intro/index.html`: `<html lang="ru">`, canonical `https://nevrida.by/ru/intro/`.
- `out/en/intro/index.html`: `<html lang="en">`, canonical `https://nevrida.by/en/intro/`.
- Каждая версия содержит `hreflang="be"`, `ru`, `en`, `x-default`.
- `/nevrida1/`, `/nevrida2/`, `/` помечены `noindex` до финального контента.

После деплоя проверить все 10 старых QR-адресов (200), 16 локализованных песенных маршрутов (200), CNAME и мобильное меню. Пушить в production только после этого.
