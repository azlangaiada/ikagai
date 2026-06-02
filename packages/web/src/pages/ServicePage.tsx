import React from 'react'
import { Helmet } from 'react-helmet-async'
import { usePageData } from '@/hooks/usePageData'
import { RenderHero } from '@/heros/RenderHero'
import { RenderBlocks } from '@/blocks/RenderBlocks'

export const ServicePage: React.FC = () => {
  const data = usePageData()
  const service = data?.service

  if (!service) return <div className="container py-28">Service not found</div>

  return (
    <article className="pt-16 pb-24">
      <Helmet>
        <title>{service.meta?.title || service.title || 'Service'} | Payload Website Template</title>
        {service.meta?.description && <meta name="description" content={service.meta.description} />}
      </Helmet>
      {service.hero && <RenderHero {...service.hero} />}
      {service.layout && <RenderBlocks blocks={service.layout} />}
    </article>
  )
}
