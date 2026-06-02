import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'visitorCount',
      type: 'number',
      label: 'Visitor Count',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Copyright',
      defaultValue: 'Copyright @2026',
    },
    {
      name: 'developedBy',
      type: 'text',
      label: 'Developed By',
      defaultValue: 'Developed by Gaia Digital Agency',
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 10,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
