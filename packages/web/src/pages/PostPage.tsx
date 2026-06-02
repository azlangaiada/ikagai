import React from 'react'
import { Helmet } from 'react-helmet-async'
import { usePageData } from '@/hooks/usePageData'
import { PostHero } from '@/heros/PostHero'
import RichText from '@/components/RichText'

export const PostPage: React.FC = () => {
  const data = usePageData()
  const post = data?.post

  if (!post) return <div className="container py-28">Post not found</div>

  return (
    <article className="pt-16 pb-24">
      <Helmet>
        <title>{post.meta?.title || post.title || 'Post'} | Payload Website Template</title>
        {post.meta?.description && <meta name="description" content={post.meta.description} />}
      </Helmet>
      <PostHero post={post} />
      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText className="max-w-[48rem] mx-auto" data={post.content} enableGutter={false} />
        </div>
      </div>
    </article>
  )
}
