import type { GlobalAfterChangeHook } from 'payload'

import { revalidateFrontend } from '../../utilities/revalidateFrontend'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating header`)

    revalidateFrontend({ tag: 'global_header' })
  }

  return doc
}
