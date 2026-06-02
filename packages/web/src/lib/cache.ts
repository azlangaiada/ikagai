/**
 * In-memory TTL cache with tag-based invalidation.
 * Replaces Next.js unstable_cache / revalidateTag.
 */
import NodeCache from 'node-cache'

const DEFAULT_TTL = 600 // 10 minutes

const cache = new NodeCache({ stdTTL: DEFAULT_TTL, checkperiod: 60 })

// Map of tags to cache keys
const tagMap = new Map<string, Set<string>>()

export function cachedFetch<T>(
  key: string,
  tags: string[],
  fetchFn: () => Promise<T>,
  ttl = DEFAULT_TTL,
): Promise<T> {
  const cached = cache.get<T>(key)
  if (cached !== undefined) return Promise.resolve(cached)

  return fetchFn().then((data) => {
    cache.set(key, data, ttl)

    // Register tags
    for (const tag of tags) {
      if (!tagMap.has(tag)) tagMap.set(tag, new Set())
      tagMap.get(tag)!.add(key)
    }

    return data
  })
}

export function invalidateByTag(tag: string): number {
  const keys = tagMap.get(tag)
  if (!keys) return 0

  let count = 0
  for (const key of keys) {
    if (cache.del(key)) count++
  }
  tagMap.delete(tag)
  return count
}

export function invalidateByPath(path: string): number {
  // Invalidate any cache key that starts with the path
  const allKeys = cache.keys()
  let count = 0
  for (const key of allKeys) {
    if (key.startsWith(`page:${path}`) || key === `page:${path}`) {
      cache.del(key)
      count++
    }
  }
  return count
}

export function invalidateAll(): void {
  cache.flushAll()
  tagMap.clear()
}
