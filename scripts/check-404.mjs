import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve('out');
const html = await readFile(resolve(root, '404.html'), 'utf8');
const assert = (value, message) => { if (!value) throw new Error(message); };
assert(/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html) || /<meta\b[^>]*content=["'][^"']*noindex[^>]*name=["']robots["']/i.test(html), '404.html must contain a noindex robots meta');
assert(html.includes('/figma/404/zero-desktop.svg'), 'out/404.html does not contain the custom design. Enable experimental.globalNotFound and rebuild.');
assert(html.includes('href="/"'), '404.html is missing the homepage link');
for (const file of ['background-desktop.webp', 'background-mobile.webp', 'fern.webp', 'zero-desktop.svg', 'zero-mobile.svg', 'four.svg', 'home-ring.svg']) {
  assert((await stat(resolve(root, 'figma/404', file))).size > 0, `Missing 404 asset: ${file}`);
}
const sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8');
assert(!/<loc>[^<]*\/404(?:\.html)?\/?<\/loc>/i.test(sitemap), '404 must not be in the sitemap');
console.log('OK: custom out/404.html, noindex, homepage link, seven assets, sitemap.');
