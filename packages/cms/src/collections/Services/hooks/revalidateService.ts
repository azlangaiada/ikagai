import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidateFrontend } from '../../../utilities/revalidateFrontend'

export const revalidateService: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc.slug) {
      payload.logger.info(`Revalidating service at path: /services/${doc.slug}`)
      revalidateFrontend({ path: `/services/${doc.slug}` })
      revalidateFrontend({ tag: 'services-list' })
    }
  }
  return doc
}

export const revalidateServiceDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc.slug) {
      payload.logger.info(`Revalidating deleted service: /services/${doc.slug}`)
      revalidateFrontend({ path: `/services/${doc.slug}` })
      revalidateFrontend({ tag: 'services-list' })
    }
  }
  return doc
}
