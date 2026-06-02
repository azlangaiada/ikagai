import type { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { revalidateSettings } from './hooks/revalidateSettings'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateSettings],
  },
  fields: [
    {
      name: 'whatsappNumber',
      type: 'text',
      label: 'WhatsApp Number',
      admin: {
        description: 'Enter the site-wide WhatsApp number (e.g., +1234567890)',
      },
    },
    {
      name: 'contactEmail',
      type: 'text',
      label: 'Contact Email (primary)',
    },
    {
      name: 'contactEmail2',
      type: 'text',
      label: 'Contact Email (secondary)',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'YouTube', value: 'youtube' },
          ],
          required: true,
        },
        {
          name: 'placeholder',
          type: 'text',
          label: 'Placeholder Text',
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon',
        },
      ],
    },
  ],
}
