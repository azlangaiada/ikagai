import React from 'react'
import { Helmet } from 'react-helmet-async'
import { usePageData } from '@/hooks/usePageData'
import { CollectionArchive } from '@/components/CollectionArchive'
import { Pagination } from '@/components/Pagination'

export const PostsPage: React.FC = () => {
  const data = usePageData()
  const posts = data?.posts

  return (
    <div className="pt-24 pb-24">
      <Helmet><title>Posts | Payload Website Template</title></Helmet>
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
        </div>
      </div>
      <div className="container mb-8">
        {posts?.docs && <CollectionArchive posts={posts.docs} />}
      </div>
      {posts && posts.totalPages > 1 && (
        <div className="container">
          <Pagination page={posts.page || 1} totalPages={posts.totalPages} />
        </div>
      )}
    </div>
  )
}
