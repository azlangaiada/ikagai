import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { payloadClient } from '@/lib/payload-client'
import { Media } from '@/components/Media'
import { PlaceholderCard } from '@/components/PlaceholderCard'

export type ServicesBlockType = {
  blockType: 'servicesBlock'
  title?: string
  description?: string
}

export const ServicesBlock: React.FC<ServicesBlockType> = ({ title, description }) => {
  const [services, setServices] = useState<unknown[]>([])
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    payloadClient
      .find('services', { limit: 100, sort: 'createdAt' })
      .then((result) => setServices(result.docs))
      .catch((err) => console.error('Failed to fetch services:', err))
      .finally(() => setFetched(true))
  }, [])

  const isEmpty = fetched && services.length === 0

  return (
    <div className="container py-16 md:py-24">
      <div className="max-w-2xl mb-12">
        {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
        {description && <p className="text-lg text-muted-foreground">{description}</p>}
      </div>
      {isEmpty ? (
        <PlaceholderCard
          title={title || 'Services Placeholder Title'}
          description={
            description ||
            'Services Placeholder Text — add Services in the Payload admin and they will appear here.'
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((raw, i) => {
            const service = raw as {
              slug?: string
              title?: string
              description?: string
              image?: unknown
            }
            return (
              <Link
                key={i}
                to={`/services/${service.slug}`}
                className="flex flex-col gap-4 border border-border p-6 rounded-lg hover:shadow-md transition-shadow group"
              >
                <div className="aspect-video relative overflow-hidden rounded-md mb-4">
                  <Media resource={service.image} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">{service.description}</p>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
