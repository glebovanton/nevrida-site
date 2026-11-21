#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';

const root = new URL('../', import.meta.url);
const read = (name) => readFileSync(new URL(name, root), 'utf8');
const songs = read('src/data/songs.ts');
const lyricSource = read('src/data/lyrics.ts');
const i18n = read('src/data/i18n.ts');
const slugs = ['intro','zabiary-miane','taverna-dlya-syabrou','kalyhanka','tsyabe-mala','vouchaya-krou','zhahi','ty-geta-ya'];
for (const slug of slugs) {
  assert(songs.includes(`slug: "${slug}"`), `Missing song slug: ${slug}`);
  assert(lyricSource.includes(`${slug}:`) || lyricSource.includes(`"${slug}":`), `Missing lyrics: ${slug}`);
}
for (const locale of ['be','ru','en']) {
  const directory = locale === 'be' ? 'src/app/(be)' : `src/app/(${locale})/${locale}`;
  for (const f of ['layout.tsx','page.tsx','[slug]/page.tsx']) {
    assert(existsSync(new URL(directory + '/' + f, root)), `Missing locale route: ${directory}/${f}`);
  }
  assert(i18n.includes(`${locale}: {`), `Missing dictionary: ${locale}`);
}
assert(i18n.includes('return locale === defaultLocale ? path : `/${locale}${path}`'), 'Existing QR routes must stay unprefixed');
assert(songs.includes('"nevrida1"') && songs.includes('"nevrida2"'), 'Reserved slugs missing');
assert.deepEqual([...songs.matchAll(/\bslug:\s*"([\w-]+)"/g)].map(m=>m[1]).sort(), [...slugs].sort());
const nextConfig = read('next.config.ts');
assert(nextConfig.includes('output: "export"') && nextConfig.includes('trailingSlash: true'), 'Static export changed');
const sitemap = read('src/app/sitemap.ts');
assert(sitemap.includes('languageLinks') && sitemap.includes('locales'), 'Localized sitemap missing');
console.log('OK: 8 songs, 10 QR routes, 3 locale variants, localized SEO and static export config.');
