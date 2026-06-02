import type { CollectionAfterChangeHook } from 'payload'

import { revalidateFrontend } from '../utilities/revalidateFrontend'

// Payload hook that triggers frontend cache revalidation for redirects after any change
export const revalidateRedirects: CollectionAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating redirects`)

  revalidateFrontend({ tag: 'redirects' })

  return doc
}
