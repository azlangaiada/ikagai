/**
 * Server-side data loader for SSR pages.
 * Fetches data from Payload CMS REST API and caches results.
 */
import { cachedFetch } from './lib/cache'

interface FetchOptions {
  draft?: boolean
  payloadUrl: string
}

async function fetchFromPayload(path: string, payloadUrl: string) {
  const res = await fetch(`${payloadUrl}${path}`)
  if (!res.ok) return null
  return res.json()
}

export async function fetchPageData(url: string, options: FetchOptions) {
  const { draft, payloadUrl } = options
  const [pathname, search] = url.split('?')
  const segments = pathname.split('/').filter(Boolean)

  // Home page
  if (segments.length === 0) {
    return cachedFetch('page:/', ['global_header', 'global_footer', 'global_settings'], async () => {
      const [header, footer, settings] = await Promise.all([
        fetchFromPayload('/api/globals/header?depth=1', payloadUrl),
        fetchFromPayload('/api/globals/footer?depth=1', payloadUrl),
        fetchFromPayload('/api/globals/settings?depth=1', payloadUrl),
      ])
      return { type: 'home', header, footer, settings }
    })
  }

  // ikigaAI coded marketing routes — globals + (team for About, contact form for Contact)
  // Routes whose page shows the Contact form (generic /chat + per-person vanity URLs).
  const CONTACT_FORM_ROUTES = ['contact', 'chat', 'azlan', 'sharil', 'mubarak']
  const STATIC_ROUTES = ['kaizen-ai', 'kaizen', 'ai-hospitality', 'about', ...CONTACT_FORM_ROUTES]
  if (segments.length === 1 && STATIC_ROUTES.includes(segments[0])) {
    const slug = segments[0]
    return cachedFetch(
      `page:/${slug}`,
      ['global_header', 'global_footer', 'global_settings', 'team', 'forms'],
      async () => {
        const [header, footer, settings, team, forms] = await Promise.all([
          fetchFromPayload('/api/globals/header?depth=1', payloadUrl),
          fetchFromPayload('/api/globals/footer?depth=1', payloadUrl),
          fetchFromPayload('/api/globals/settings?depth=1', payloadUrl),
          slug === 'about'
            ? fetchFromPayload('/api/team?limit=20&sort=order&depth=1', payloadUrl)
            : Promise.resolve(null),
          CONTACT_FORM_ROUTES.includes(slug)
            ? fetchFromPayload('/api/forms?where[title][equals]=Contact&limit=1&depth=1', payloadUrl)
            : Promise.resolve(null),
        ])
        return { type: 'static', slug, header, footer, settings, team, form: forms?.docs?.[0] || null }
      },
    )
  }

  // Posts listing
  if (segments[0] === 'posts' && segments.length === 1) {
    return cachedFetch('page:/posts', ['posts'], async () => {
      const [posts, header, footer, settings] = await Promise.all([
        fetchFromPayload('/api/posts?limit=12&depth=1&sort=-createdAt', payloadUrl),
        fetchFromPayload('/api/globals/header?depth=1', payloadUrl),
        fetchFromPayload('/api/globals/footer?depth=1', payloadUrl),
        fetchFromPayload('/api/globals/settings?depth=1', payloadUrl),
      ])
      return { type: 'posts', posts, header, footer, settings }
    })
  }

  // Paginated posts
  if (segments[0] === 'posts' && segments[1] === 'page' && segments[2]) {
    const pageNum = parseInt(segments[2], 10)
    return cachedFetch(`page:/posts/page/${pageNum}`, ['posts'], async () => {
      const [posts, header, footer, settings] = await Promise.all([
        fetchFromPayload(`/api/posts?limit=12&page=${pageNum}&depth=1&sort=-createdAt`, payloadUrl),
        fetchFromPayload('/api/globals/header?depth=1', payloadUrl),
        fetchFromPayload('/api/globals/footer?depth=1', payloadUrl),
        fetchFromPayload('/api/globals/settings?depth=1', payloadUrl),
      ])
      return { type: 'posts', posts, page: pageNum, header, footer, settings }
    })
  }

  // Single post
  if (segments[0] === 'posts' && segments[1]) {
    const slug = decodeURIComponent(segments[1])
    return cachedFetch(`page:/posts/${slug}`, ['posts', `posts_${slug}`], async () => {
      const [post, header, footer, settings] = await Promise.all([
        fetchFromPayload(`/api/posts?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=2${draft ? '&draft=true' : ''}`, payloadUrl),
        fetchFromPayload('/api/globals/header?depth=1', payloadUrl),
        fetchFromPayload('/api/globals/footer?depth=1', payloadUrl),
        fetchFromPayload('/api/globals/settings?depth=1', payloadUrl),
      ])
      return { type: 'post', post: post?.docs?.[0] || null, header, footer, settings }
    })
  }

  // Single service
  if (segments[0] === 'services' && segments[1]) {
    const slug = decodeURIComponent(segments[1])
    return cachedFetch(`page:/services/${slug}`, ['services', `services_${slug}`], async () => {
      const [service, header, footer, settings] = await Promise.all([
        fetchFromPayload(`/api/services?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=2${draft ? '&draft=true' : ''}`, payloadUrl),
        fetchFromPayload('/api/globals/header?depth=1', payloadUrl),
        fetchFromPayload('/api/globals/footer?depth=1', payloadUrl),
        fetchFromPayload('/api/globals/settings?depth=1', payloadUrl),
      ])
      return { type: 'service', service: service?.docs?.[0] || null, header, footer, settings }
    })
  }

  // Search
  if (segments[0] === 'search') {
    const searchParams = new URLSearchParams(search || '')
    const query = searchParams.get('q') || ''
    // Don't cache search results
    const [results, header, footer, settings] = await Promise.all([
      query ? fetchFromPayload(`/api/search?where[or][0][title][like]=${encodeURIComponent(query)}&where[or][1][slug][like]=${encodeURIComponent(query)}&limit=12&depth=1`, payloadUrl) : Promise.resolve({ docs: [], totalDocs: 0 }),
      fetchFromPayload('/api/globals/header?depth=1', payloadUrl),
      fetchFromPayload('/api/globals/footer?depth=1', payloadUrl),
      fetchFromPayload('/api/globals/settings?depth=1', payloadUrl),
    ])
    return { type: 'search', query, results, header, footer, settings }
  }

  // Dynamic page (catch-all slug)
  const slug = decodeURIComponent(segments[0])
  return cachedFetch(`page:/${slug}`, ['pages', `pages_${slug}`, 'global_header', 'global_footer', 'global_settings'], async () => {
    const [page, header, footer, settings] = await Promise.all([
      fetchFromPayload(`/api/pages?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=2${draft ? '&draft=true' : ''}`, payloadUrl),
      fetchFromPayload('/api/globals/header?depth=1', payloadUrl),
      fetchFromPayload('/api/globals/footer?depth=1', payloadUrl),
      fetchFromPayload('/api/globals/settings?depth=1', payloadUrl),
    ])
    const doc = page?.docs?.[0] || null
    return { type: 'page', page: doc, header, footer, settings, notFound: !doc }
  })
}
