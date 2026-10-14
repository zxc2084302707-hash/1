import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import path from 'node:path'
import process from 'node:process'
import { Readable } from 'node:stream'
import { fileURLToPath } from 'node:url'
import start from '../dist/server/server.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const clientRoot = path.join(root, 'dist', 'client')
const host = process.env.HOST ?? '0.0.0.0'
const port = Number(process.env.PORT ?? 3000)

const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
  ['.ico', 'image/x-icon'],
  ['.woff2', 'font/woff2'],
])

async function sendStatic(pathname, response) {
  const filePath = path.resolve(clientRoot, `.${pathname}`)
  if (!filePath.startsWith(`${clientRoot}${path.sep}`)) return false

  try {
    const file = await stat(filePath)
    if (!file.isFile()) return false
    response.statusCode = 200
    response.setHeader('content-type', mimeTypes.get(path.extname(filePath)) ?? 'application/octet-stream')
    response.setHeader('cache-control', pathname.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'public, max-age=300')
    createReadStream(filePath).pipe(response)
    return true
  } catch {
    return false
  }
}

const server = createServer(async (incoming, outgoing) => {
  try {
    const requestUrl = new globalThis.URL(incoming.url ?? '/', `http://${incoming.headers.host ?? `${host}:${port}`}`)
    if (await sendStatic(requestUrl.pathname, outgoing)) return

    const request = new globalThis.Request(requestUrl, {
      method: incoming.method,
      headers: incoming.headers,
      body: incoming.method === 'GET' || incoming.method === 'HEAD' ? undefined : Readable.toWeb(incoming),
      duplex: incoming.method === 'GET' || incoming.method === 'HEAD' ? undefined : 'half',
    })
    const response = await start.fetch(request)
    outgoing.statusCode = response.status
    for (const [name, value] of response.headers) outgoing.setHeader(name, value)
    const setCookies = response.headers.getSetCookie?.() ?? []
    if (setCookies.length) outgoing.setHeader('set-cookie', setCookies)

    if (!response.body || incoming.method === 'HEAD') {
      outgoing.end()
      return
    }
    Readable.fromWeb(response.body).pipe(outgoing)
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`)
    if (!outgoing.headersSent) outgoing.statusCode = 500
    outgoing.end('Internal Server Error')
  }
})

server.listen(port, host, () => {
  process.stdout.write(`Africa Buyer AI listening on http://${host}:${port}\n`)
})

