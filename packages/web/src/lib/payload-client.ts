/**
 * Typed HTTP client for Payload CMS REST API.
 * Replaces direct getPayload() calls used in Next.js server components.
 */

const PAYLOAD_URL = typeof window !== 'undefined'
  ? (import.meta.env.VITE_PAYLOAD_URL || '')
  : (process.env.PAYLOAD_URL || 'http://localhost:4004')

interface FindOptions {
  where?: Record<string, any>
  limit?: number
  page?: number
  sort?: string
  depth?: number
  draft?: boolean
  pagination?: boolean
  select?: Record<string, boolean>
}

interface FindResult<T = any> {
  docs: T[]
  totalDocs: number
  totalPages: number
  page: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

function buildQuery(options: FindOptions): string {
  const params = new URLSearchParams()

  if (options.limit !== undefined) params.set('limit', String(options.limit))
  if (options.page !== undefined) params.set('page', String(options.page))
  if (options.sort) params.set('sort', options.sort)
  if (options.depth !== undefined) params.set('depth', String(options.depth))
  if (options.draft) params.set('draft', 'true')
  if (options.pagination === false) params.set('pagination', 'false')

  // Build where queries
  if (options.where) {
    for (const [field, condition] of Object.entries(options.where)) {
      if (typeof condition === 'object') {
        for (const [op, value] of Object.entries(condition)) {
          params.set(`where[${field}][${op}]`, String(value))
        }
      }
    }
  }

  // Build select
  if (options.select) {
    for (const [field, include] of Object.entries(options.select)) {
      if (include) params.set(`select[${field}]`, 'true')
    }
  }

  return params.toString()
}

export const payloadClient = {
  async find<T = any>(collection: string, options: FindOptions = {}): Promise<FindResult<T>> {
    const query = buildQuery(options)
    const url = `${PAYLOAD_URL}/api/${collection}${query ? `?${query}` : ''}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Payload API error: ${res.status} ${res.statusText}`)
    return res.json()
  },

  async findBySlug<T = any>(collection: string, slug: string, options: FindOptions = {}): Promise<T | null> {
    const result = await this.find<T>(collection, {
      ...options,
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return result.docs[0] || null
  },

  async findGlobal<T = any>(slug: string, depth = 0): Promise<T> {
    const params = depth ? `?depth=${depth}` : ''
    const url = `${PAYLOAD_URL}/api/globals/${slug}${params}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Payload API error: ${res.status} ${res.statusText}`)
    return res.json()
  },

  async findByID<T = any>(collection: string, id: string | number, depth = 0): Promise<T> {
    const params = depth ? `?depth=${depth}` : ''
    const url = `${PAYLOAD_URL}/api/${collection}/${id}${params}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Payload API error: ${res.status} ${res.statusText}`)
    return res.json()
  },

  async search<T = any>(collection: string, query: string, options: FindOptions = {}): Promise<FindResult<T>> {
    return this.find<T>(collection, {
      ...options,
      where: {
        or: [
          { title: { like: query } },
          { 'meta.title': { like: query } },
          { 'meta.description': { like: query } },
          { slug: { like: query } },
        ],
      },
    })
  },

  getMediaUrl(url?: string | null): string {
    if (!url) return ''
    if (url.startsWith('http')) return url
    return `${PAYLOAD_URL}${url}`
  },
}
