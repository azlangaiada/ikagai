import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import React, { useState, useEffect } from 'react'
import RichText from '@/components/RichText'
import { payloadClient } from '@/lib/payload-client'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PlaceholderCard } from '@/components/PlaceholderCard'

type ArchiveBlockExtra = { title?: string; description?: string }

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & ArchiveBlockExtra & { id?: string }
> = (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    title,
    description,
  } = props

  const limit = limitFromProps || 3

  const [posts, setPosts] = useState<Post[]>(() => {
    // For 'relationship' mode, we can resolve selected docs immediately.
    if (populateBy !== 'collection' && selectedDocs?.length) {
      return selectedDocs
        .map((post) => (typeof post.value === 'object' ? post.value : undefined))
        .filter(Boolean) as Post[]
    }
    return []
  })

  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    if (populateBy !== 'collection') {
      setFetched(true)
      return
    }

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    payloadClient
      .find<Post>('posts', {
        depth: 1,
        limit,
        ...(flattenedCategories && flattenedCategories.length > 0
          ? { where: { categories: { in: flattenedCategories } } }
          : {}),
      })
      .then((result) => {
        setPosts(result.docs)
      })
      .catch((err) => {
        console.error('Failed to fetch posts:', err)
      })
      .finally(() => setFetched(true))
  }, [populateBy, categories, limit])

  const showEmptyState = fetched && (!posts || posts.length === 0)

  return (
    <div id={`block-${id}`}>
      {(title || description) && (
        <div className="container mb-12">
          <div className="max-w-2xl">
            {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
            {description && <p className="text-lg text-muted-foreground">{description}</p>}
          </div>
        </div>
      )}
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      {showEmptyState ? (
        <PlaceholderCard
          title={title || 'Blog Placeholder Title'}
          description={
            description ||
            'Blog Placeholder Text — once you publish posts in the Payload admin, they will appear here automatically.'
          }
        />
      ) : (
        <CollectionArchive posts={posts} />
      )}
    </div>
  )
}
