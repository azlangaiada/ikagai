import React from 'react'
import { Helmet } from 'react-helmet-async'
import { usePageData } from '@/hooks/usePageData'
import { RenderHero } from '@/heros/RenderHero'
import { RenderBlocks } from '@/blocks/RenderBlocks'

export const DynamicPage: React.FC = () => {
  const data = usePageData()
  const page = data?.page

  if (!page) return <div className="container py-28">Page not found</div>

  return (
    <article className="pt-16 pb-24">
      <Helmet>
        <title>{page.meta?.title || page.title || 'Page'} | Payload Website Template</title>
        {page.meta?.description && <meta name="description" content={page.meta.description} />}
      </Helmet>
      <RenderHero {...page.hero} />
      <RenderBlocks blocks={page.layout} />
    </article>
  )
}
