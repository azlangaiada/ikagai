import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidateFrontend } from '../../../utilities/revalidateFrontend'

import type { Post } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/posts/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidateFrontend({ path })
      revalidateFrontend({ tag: 'posts-sitemap' })
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/posts/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidateFrontend({ path: oldPath })
      revalidateFrontend({ tag: 'posts-sitemap' })
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/posts/${doc?.slug}`

    revalidateFrontend({ path })
    revalidateFrontend({ tag: 'posts-sitemap' })
  }

  return doc
}
