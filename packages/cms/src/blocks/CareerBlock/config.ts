import type { Block } from 'payload'

export const CareerBlock: Block = {
  slug: 'careerBlock',
  labels: {
    singular: 'Career Block',
    plural: 'Career Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      label: 'Application Form',
    },
  ],
}
