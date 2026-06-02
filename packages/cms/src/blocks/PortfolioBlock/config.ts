import type { Block } from 'payload'

export const PortfolioBlock: Block = {
  slug: 'portfolioBlock',
  labels: {
    singular: 'Portfolio Block',
    plural: 'Portfolio Blocks',
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
  ],
}
