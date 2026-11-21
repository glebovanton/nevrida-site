#!/usr/bin/env node
/** Local preview of Next.js `output: "export"` (not a production server). */
import { createServer } from 'node:http';
import { stat, readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve('out');
const port = Number(process.env.PORT || 3000);
const mime = {
  '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8',
  '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8',
  '.svg':'image/svg+xml', '.webp':'image/webp', '.jpg':'image/jpeg',
  '.jpeg':'image/jpeg', '.png':'image/png', '.ico':'image/x-icon',
  '.xml':'application/xml; charset=utf-8', '.txt':'text/plain; charset=utf-8',
  '.woff2':'font/woff2', '.avif':'image/avif', '.map':'application/json',
};
createServer(async (req,res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, {'Allow':'GET, HEAD'});res.end();return;
  }
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let path = resolve(root, '.' + pathname);
    if (!path.startsWith(root + sep) && path !== root) {res.writeHead(403);res.end();return;}
    let meta = await stat(path).catch(() => null);
    if (meta?.isDirectory()) { path = resolve(path,'index.html'); meta = await stat(path).catch(() => null); }
    if (!meta?.isFile() && !extname(path)) {
      path = resolve(root, '.' + pathname, 'index.html');
      meta = await stat(path).catch(() => null);
    }
    if (!meta?.isFile()) {res.writeHead(404);res.end('Not found');return;}
    const headers = {'Content-Type':mime[extname(path)]||'application/octet-stream',
      'Cache-Control':extname(path)==='.html'?'no-store':'public, max-age=3600'};
    res.writeHead(200,headers);
    if (req.method==='HEAD') {res.end();return;}
    res.end(await readFile(path));
  } catch {res.writeHead(400);res.end('Bad request');}
}).listen(port, () => console.log(`Nevrida static preview: http://localhost:${port}`));
