import type { GlobalAfterChangeHook } from 'payload'

import { revalidateFrontend } from '../../utilities/revalidateFrontend'

export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating footer`)

    revalidateFrontend({ tag: 'global_footer' })
  }

  return doc
}
