import React, { useState, useEffect } from 'react'
import { payloadClient } from '@/lib/payload-client'
import { Media } from '@/components/Media'
import { PlaceholderCard } from '@/components/PlaceholderCard'

export type PortfolioBlockType = {
  blockType: 'portfolioBlock'
  title?: string
  description?: string
}

export const PortfolioBlock: React.FC<PortfolioBlockType> = ({ title, description }) => {
  const [portfolioItems, setPortfolioItems] = useState<unknown[]>([])
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    payloadClient
      .find('portfolio', { limit: 100, sort: 'createdAt' })
      .then((result) => setPortfolioItems(result.docs))
      .catch((err) => console.error('Failed to fetch portfolio items:', err))
      .finally(() => setFetched(true))
  }, [])

  const isEmpty = fetched && portfolioItems.length === 0

  return (
    <div className="container">
      <div className="max-w-2xl mb-12">
        {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
        {description && <p className="text-lg text-muted-foreground">{description}</p>}
      </div>
      {isEmpty ? (
        <PlaceholderCard
          title={title || 'Portfolio Placeholder Title'}
          description={
            description ||
            'Portfolio Placeholder Text — add Portfolio items in the Payload admin and they will appear here.'
          }
        />
      ) : (
        <div className="flex flex-col gap-24">
          {portfolioItems.map((raw, i) => {
            const item = raw as { title?: string; description?: string; image?: unknown }
            return (
              <div
                key={i}
                className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={i % 2 !== 0 ? 'md:order-2' : 'md:order-1'}>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-lg text-muted-foreground">{item.description}</p>
                </div>
                <div
                  className={`aspect-square relative overflow-hidden rounded-lg ${i % 2 !== 0 ? 'md:order-1' : 'md:order-2'}`}
                >
                  <Media resource={item.image} fill className="object-cover" />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
