// Serves ./out under /portfolio-v2/, the way GitHub Pages does, so the
// end-to-end tests run against the exact files that get deployed.
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize, resolve } from 'node:path'

const ROOT = resolve('out')
const BASE = '/portfolio-v2'
const PORT = Number(process.env.PORT ?? 4173)
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json',
}

async function resolveFile(urlPath) {
  const rel = normalize(decodeURIComponent(urlPath.slice(BASE.length))).replace(/^[/\\]+/, '')
  const file = join(ROOT, rel)
  if (!file.startsWith(ROOT)) return null
  try {
    const s = await stat(file)
    return s.isDirectory() ? join(file, 'index.html') : file
  } catch {
    return null
  }
}

createServer(async (req, res) => {
  const path = new URL(req.url ?? '/', 'http://localhost').pathname
  if (!path.startsWith(BASE)) {
    res.writeHead(404).end('Not found')
    return
  }
  if (path === BASE) {
    res.writeHead(301, { Location: `${BASE}/` }).end()
    return
  }
  const file = await resolveFile(path)
  try {
    const body = await readFile(file ?? join(ROOT, '404.html'))
    res.writeHead(file ? 200 : 404, { 'Content-Type': TYPES[extname(file ?? '404.html')] ?? 'application/octet-stream' })
    res.end(body)
  } catch {
    res.writeHead(404).end('Not found')
  }
}).listen(PORT, () => console.log(`Serving out/ at http://localhost:${PORT}${BASE}/`))
