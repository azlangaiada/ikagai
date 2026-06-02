import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ContentMediaBlock } from '@/blocks/ContentMedia/Component'
import { ServicesBlock } from '@/blocks/Services/Component'
import { PortfolioBlock } from '@/blocks/PortfolioBlock/Component'
import { AboutBlock } from '@/blocks/AboutBlock/Component'
import { CareerBlock } from '@/blocks/CareerBlock/Component'

// Mapping of block slugs to their corresponding React components
const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  contentMedia: ContentMediaBlock,
  servicesBlock: ServicesBlock,
  portfolioBlock: PortfolioBlock,
  aboutBlock: AboutBlock,
  careerBlock: CareerBlock,
}

// Component that iterates through and renders an array of page layout blocks
export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              const isEven = index % 2 === 0

              return (
                <section
                  className={`py-16 md:py-24 ${!isEven ? 'bg-muted/30' : 'bg-transparent'}`}
                  key={index}
                >
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </section>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
