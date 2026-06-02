import type { GlobalAfterChangeHook } from 'payload'

import { revalidateFrontend } from '../../utilities/revalidateFrontend'

export const revalidateSettings: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating settings`)

    revalidateFrontend({ tag: 'global_settings' })
  }

  return doc
}
