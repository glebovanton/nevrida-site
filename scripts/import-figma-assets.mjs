#!/usr/bin/env node
/**
 * Получение ОРИГИНАЛЬНЫХ фоновых изображений из Figma (не скриншотов страниц).
 * Запуск: FIGMA_TOKEN=... npm run assets:figma
 * Пишет public/artwork/*.png|jpg|webp и src/data/artwork.generated.json.
 * Требуется персональный токен аккаунта с доступом к файлу.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TOKEN = process.env.FIGMA_TOKEN;
const KEY = 'F8leIFIeOd92JrfLwtS647'; // Updated design copy with BE/RU/EN header
if (!TOKEN) {
  console.error('FIGMA_TOKEN не задан. См. docs/FIGMA_ASSETS.md.');
  process.exit(1);
}

const frames = [
  { slug: 'intro', desktop: '1:3230', mobile: '46:6' },
  { slug: 'zabiary-miane', desktop: '1:73', mobile: '1:6806' },
  { slug: 'taverna-dlya-syabrou', desktop: '1:2380', mobile: '46:943' },
  { slug: 'kalyhanka', desktop: '1:1305', mobile: '49:1809' },
  { slug: 'tsyabe-mala', desktop: '1:3995', mobile: '51:4866' },
  { slug: 'vouchaya-krou', desktop: '1:376', mobile: '51:4500' },
  { slug: 'zhahi', desktop: '1:679', mobile: '50:3943' },
  { slug: 'ty-geta-ya', desktop: '1:982', mobile: '50:3179' },
];

const headers = { 'X-Figma-Token': TOKEN };
async function figmaJSON(url) {
  const r = await fetch(url, { headers });
  if (!r.ok) throw new Error(`Figma ${r.status} ${url}: ${(await r.text()).slice(0,200)}`);
  return r.json();
}
function findBackground(node) {
  if (!node) return null;
  if (/^фон$/i.test((node.name ?? '').trim())) return node;
  for (const child of node.children ?? []) {
    const match = findBackground(child);
    if (match) return match;
  }
  return null;
}
function firstImageRef(node) {
  for (const fill of node?.fills ?? []) if (fill.type === 'IMAGE' && fill.imageRef) return fill.imageRef;
  for (const child of node?.children ?? []) {
    const ref = firstImageRef(child);
    if (ref) return ref;
  }
  return null;
}
function extension(mime) {
  if (mime.includes('webp')) return '.webp';
  if (mime.includes('jpeg')) return '.jpg';
  if (mime.includes('png')) return '.png';
  if (mime.includes('gif')) return '.gif';
  if (mime.includes('svg')) return '.svg';
  return '.png';
}
async function saveUrl(url, prefix) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Не удалось скачать изображение (${r.status})`);
  const ext = extension(r.headers.get('content-type') || 'image/png');
  const local = `/artwork/${prefix}${ext}`;
  const bytes = Buffer.from(await r.arrayBuffer());
  if (!bytes.length) throw new Error('Пустой файл');
  await writeFile(path.join(ROOT, 'public', local), bytes);
  return local;
}

const ids = frames.flatMap(item => [item.desktop, item.mobile]);
const nodesData = await figmaJSON(`https://api.figma.com/v1/files/${KEY}/nodes?ids=${encodeURIComponent(ids.join(','))}`);
const sources = [];
for (const frame of frames) {
  for (const type of ['desktop', 'mobile']) {
    const id = frame[type];
    const doc = nodesData.nodes?.[id]?.document;
    const background = findBackground(doc);
    if (!background) {
      console.warn(`Фон не найден: ${frame.slug}/${type} (${id})`);
      continue;
    }
    sources.push({ slug: frame.slug, type, nodeId: background.id, imageRef: firstImageRef(background) });
  }
}

const images = await figmaJSON(`https://api.figma.com/v1/files/${KEY}/images`);
const fallback = sources.filter(item => !item.imageRef || !images.meta?.images?.[item.imageRef]);
const renders = fallback.length
  ? await figmaJSON(`https://api.figma.com/v1/images/${KEY}?ids=${encodeURIComponent(fallback.map(x => x.nodeId).join(','))}&format=png&scale=1`)
  : null;

const manifest = { _common: { corners: {} }, ...Object.fromEntries(frames.map(x => [x.slug, {}])) };
await mkdir(path.join(ROOT, 'public/artwork'), { recursive: true });
for (const item of sources) {
  const raw = item.imageRef ? images.meta?.images?.[item.imageRef] : null;
  const url = raw ?? renders?.images?.[item.nodeId];
  if (!url) {
    console.warn(`Нет исходного изображения: ${item.slug}/${item.type}`);
    continue;
  }
  try {
    manifest[item.slug][item.type] = await saveUrl(url, `${item.slug}-${item.type}`);
    console.log(`${item.slug}/${item.type} -> ${manifest[item.slug][item.type]}`);
  } catch (error) {
    console.warn(`${item.slug}/${item.type}: ${error.message}`);
  }
}

// Exact nodes from the provided Figma file. Export individual assets, NEVER full page screenshots.
// If an asset is not found or the API is rate-limited, keep the CSS fallback.
const commonAssets = [
  { key: 'headerLogo', nodeId: '77:160', format: 'png' },
  { key: 'footerLogo', nodeId: '1:4949', format: 'png' },
  { key: 'topArch', nodeId: '1:97', format: 'svg' },
  { key: 'bottomArch', nodeId: '1:111', format: 'svg' },
  { key: 'corners.topLeft', nodeId: '1:91', format: 'svg' },
  { key: 'corners.topRight', nodeId: '1:94', format: 'svg' },
  { key: 'corners.bottomLeft', nodeId: '1:83', format: 'svg' },
  { key: 'corners.bottomRight', nodeId: '1:87', format: 'svg' },
];
for (const fmt of ['png', 'svg']) {
  const list = commonAssets.filter(x => x.format === fmt);
  try {
    const result = await figmaJSON(`https://api.figma.com/v1/images/${KEY}?ids=${encodeURIComponent(list.map(x => x.nodeId).join(','))}&format=${fmt}&scale=1`);
    for (const asset of list) {
      if (!result.images?.[asset.nodeId]) continue;
      const name = asset.key.replace(/([A-Z])/g,'-$1').replace(/\./g,'-').toLowerCase();
      try {
        const local = await saveUrl(result.images[asset.nodeId], name);
        if (asset.key.startsWith('corners.')) manifest._common.corners[asset.key.split('.')[1]] = local;
        else manifest._common[asset.key] = local;
        console.log(`Original Figma asset ${asset.key} -> ${local}`);
      } catch (error) { console.warn(`Asset ${asset.key}: ${error.message}`); }
    }
  } catch (error) { console.warn(`Asset export (${fmt}) unavailable: ${error.message}`); }
}
await writeFile(path.join(ROOT, 'src/data/artwork.generated.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log('Готово. Проверьте изображения и выполните npm run build.');
