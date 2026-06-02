import { NextRequest, NextResponse } from 'next/server'
import { revalidateFrontend } from '@/utilities/revalidateFrontend'
import { authorizeWebManagerRequest, buildPagePath } from '@/utilities/web-manager'

type CacheBody = {
  path?: string
  slug?: string
  tag?: string
  paths?: string[]
  tags?: string[]
}

export async function POST(request: NextRequest) {
  const auth = authorizeWebManagerRequest(request)

  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status })
  }

  let body: CacheBody

  try {
    body = (await request.json()) as CacheBody
  } catch {
    return NextResponse.json({ ok: false, error: 'Request body must be valid JSON.' }, { status: 400 })
  }

  const singlePath = body.path?.trim() || (body.slug?.trim() ? buildPagePath(body.slug.trim()) : '')
  const singleTag = body.tag?.trim()
  const isPresent = (value: string | undefined): value is string => Boolean(value)
  const paths = [singlePath, ...(body.paths || []).map((value) => value.trim())].filter(isPresent)
  const tags = [singleTag, ...(body.tags || []).map((value) => value.trim())].filter(isPresent)

  if (paths.length === 0 && tags.length === 0) {
    return NextResponse.json(
      { ok: false, error: 'Provide at least one path/slug/tag target.' },
      { status: 400 },
    )
  }

  const uniquePaths = [...new Set(paths)]
  const uniqueTags = [...new Set(tags)]

  await Promise.all(uniquePaths.map((path) => revalidateFrontend({ path })))
  await Promise.all(uniqueTags.map((tag) => revalidateFrontend({ tag })))

  return NextResponse.json({
    ok: true,
    revalidated: {
      paths: uniquePaths,
      tags: uniqueTags,
    },
  })
}
