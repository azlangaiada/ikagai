import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProduction = process.env.NODE_ENV === 'production'
const PORT = parseInt(process.env.PORT || '3004', 10)
const PAYLOAD_URL = process.env.PAYLOAD_URL || 'http://localhost:4004'

async function createServer() {
  const app = express()
  app.use(cookieParser())
  app.use(express.json())

  let vite: any

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite')
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    })
    app.use(vite.middlewares)
  } else {
    app.use('/assets', express.static(path.resolve(__dirname, 'dist/client/assets'), { maxAge: '1y' }))
  }

  // In production, serve public/ via Express (dev is handled by Vite middleware).
  if (isProduction) {
    app.use(express.static(path.resolve(__dirname, 'public'), { index: false }))
  }

  // Revalidation endpoint (called by CMS hooks)
  app.post('/api/revalidate', async (req, res) => {
    const secret = process.env.REVALIDATION_SECRET
    if (!secret) {
      return res.status(503).json({ ok: false, error: 'Revalidation not configured' })
    }
    const auth = req.headers.authorization
    if (!auth || auth !== `Bearer ${secret}`) {
      return res.status(403).json({ ok: false, error: 'Invalid revalidation secret' })
    }

    const { path: pathToInvalidate, tag } = req.body || {}
    const { invalidateByPath, invalidateByTag } = await import('./src/lib/cache')

    let count = 0
    if (pathToInvalidate) count += invalidateByPath(pathToInvalidate)
    if (tag) count += invalidateByTag(tag)

    res.json({ ok: true, invalidated: count })
  })

  const loadDataModule = async () =>
    isProduction
      ? await import('./src/data-loader.js')
      : await vite.ssrLoadModule('/src/data-loader.ts')

  // Client-side page data endpoint — used by React app for SPA navigation
  app.get('/api/page-data', async (req, res) => {
    const url = (req.query.url as string) || '/'
    const draft = req.cookies?.['payload-draft'] === 'true'
    try {
      const { fetchPageData } = await loadDataModule()
      const data = await fetchPageData(url, { draft, payloadUrl: PAYLOAD_URL })
      res.json(data)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      res.status(500).json({ error: message })
    }
  })

  // Contact form — sends email to azlan@net1io.com via local Postfix.
  app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body || {}
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are required.' })
    }
    try {
      const mod = isProduction
        ? await import('./src/lib/contact.js')
        : await vite.ssrLoadModule('/src/lib/contact.ts')
      await mod.sendContactEmail({ name, email, message })
      res.json({ ok: true })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      res.status(500).json({ error: message })
    }
  })

  // "Ask Us" — stateless single-turn AI assistant (Vertex AI). One question, one answer.
  app.post('/api/ai-chat', async (req, res) => {
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      'unknown'
    try {
      const mod = isProduction
        ? await import('./src/lib/ai-chat.js')
        : await vite.ssrLoadModule('/src/lib/ai-chat.ts')
      const result = await mod.askUs(req.body?.question, ip)
      if ('error' in result) return res.status(result.status).json({ error: result.error })
      res.json(result)
    } catch {
      res.status(500).json({ error: 'Something went wrong. Please try again.' })
    }
  })

  const SLUG_REGEX = /^[a-z0-9][a-z0-9-/]*$/i

  // Preview mode
  app.get('/api/preview', (req, res) => {
    const { secret, slug, collection } = req.query
    if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) {
      return res.status(403).json({ error: 'Invalid preview secret' })
    }

    const slugStr = typeof slug === 'string' ? slug : ''
    if (slugStr && !SLUG_REGEX.test(slugStr)) {
      return res.status(400).json({ error: 'Invalid slug' })
    }

    res.cookie('payload-draft', 'true', {
      httpOnly: true,
      sameSite: 'lax',
      secure: isProduction,
      path: '/',
    })
    const redirectPath = collection === 'posts'
      ? `/posts/${slugStr}`
      : collection === 'services'
        ? `/services/${slugStr}`
        : `/${slugStr}`
    res.redirect(redirectPath)
  })

  app.get('/api/exit-preview', (req, res) => {
    res.clearCookie('payload-draft', { path: '/' })
    res.redirect('/')
  })

  // Escape </ in JSON to prevent script-tag breakout (XSS)
  const safeJson = (data: unknown) =>
    JSON.stringify(data).replace(/</g, '\\u003c')

  // SSR handler
  app.use('*', async (req, res) => {
    const url = req.originalUrl

    try {
      let template: string
      let render: (url: string, ctx: { draft: boolean; data: unknown }) => {
        html: string
        helmet?: {
          title?: { toString(): string }
          meta?: { toString(): string }
          link?: { toString(): string }
        }
      }

      if (!isProduction) {
        template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
      } else {
        template = fs.readFileSync(path.resolve(__dirname, 'dist/client/index.html'), 'utf-8')
        const mod = await import('./dist/server/entry-server.js' as string)
        render = mod.render
      }

      const draft = req.cookies['payload-draft'] === 'true'

      const { fetchPageData } = await loadDataModule()
      const pageData = await fetchPageData(url, { draft, payloadUrl: PAYLOAD_URL })

      const { html: appHtml, helmet } = render(url, { draft, data: pageData })

      const headTags = [
        helmet?.title?.toString() || '',
        helmet?.meta?.toString() || '',
        helmet?.link?.toString() || '',
      ].filter(Boolean).join('\n')

      const dataScript = `<script>window.__INITIAL_DATA__ = ${safeJson(pageData)}</script>`
      const finalHtml = template
        .replace('<!--head-tags-->', headTags + '\n' + dataScript)
        .replace('<!--ssr-outlet-->', appHtml)

      const status = (pageData as { notFound?: boolean })?.notFound ? 404 : 200
      res.status(status).set({ 'Content-Type': 'text/html' }).end(finalHtml)
    } catch (e: unknown) {
      if (!isProduction && vite?.ssrFixStacktrace) vite.ssrFixStacktrace(e)
      const err = e instanceof Error ? e : new Error(String(e))
      console.error(err.stack || err.message)
      if (isProduction) {
        res.status(500).end('Internal Server Error')
      } else {
        res.status(500).end(err.stack)
      }
    }
  })

  app.listen(PORT, () => {
    console.log(`[web] Vite SSR server running at http://localhost:${PORT}`)
    console.log(`[web] Payload CMS at ${PAYLOAD_URL}`)
  })
}

createServer()
