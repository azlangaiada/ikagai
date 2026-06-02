import React from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

// Type definition for the ContentMediaBlock component properties
export type ContentMediaBlockType = {
  blockType: 'contentMedia'
  mediaPosition: 'left' | 'right'
  richText: DefaultTypedEditorState
  media: any
}

// Component that renders a layout with content and media side-by-side
export const ContentMediaBlock: React.FC<ContentMediaBlockType> = ({
  mediaPosition,
  richText,
  media,
}) => {
  return (
    <div className="container">
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${mediaPosition === 'left' ? 'md:flex-row-reverse' : ''}`}>
        <div className={mediaPosition === 'left' ? 'md:order-2' : 'md:order-1'}>
          <RichText data={richText} enableGutter={false} />
        </div>
        <div className={mediaPosition === 'left' ? 'md:order-1' : 'md:order-2'}>
          <Media resource={media} />
        </div>
      </div>
    </div>
  )
}
