'use client'

import React from 'react'
import { useRowLabel, type RowLabelProps } from '@payloadcms/ui'

type LexicalNode = {
  type?: string
  text?: string
  tag?: string
  children?: LexicalNode[]
}

type LexicalState = { root?: { children?: LexicalNode[] } } | null | undefined

const extractText = (node: LexicalNode): string => {
  if (typeof node?.text === 'string') return node.text
  if (Array.isArray(node?.children)) {
    return node.children.map(extractText).join('')
  }
  return ''
}

const firstHeadingOrText = (rt: LexicalState, max = 60): string | null => {
  const children = rt?.root?.children
  if (!Array.isArray(children)) return null
  // Prefer first heading; otherwise first non-empty block
  for (const node of children) {
    if (node?.type === 'heading') {
      const t = extractText(node).trim()
      if (t) return t.slice(0, max)
    }
  }
  for (const node of children) {
    const t = extractText(node).trim()
    if (t) return t.slice(0, max)
  }
  return null
}

type BlockData = {
  blockType?: string
  blockName?: string
  title?: string
  heading?: string
  richText?: LexicalState
  introContent?: LexicalState
  content?: LexicalState
  mediaPosition?: string
  populateBy?: string
  relationTo?: string | string[]
  language?: string
  style?: string
  columns?: unknown[]
}

const BLOCK_DEFAULTS: Record<string, string> = {
  cta: 'Call to Action',
  content: 'Content',
  mediaBlock: 'Media',
  archive: 'Archive',
  formBlock: 'Form',
  contentMedia: 'Content & Media',
  servicesBlock: 'Services',
  portfolioBlock: 'Portfolio',
  aboutBlock: 'About',
  careerBlock: 'Career',
  banner: 'Banner',
  code: 'Code',
}

const deriveBlockLabel = (data: BlockData): string => {
  // 1) Author-provided name overrides anything derived.
  if (data?.blockName?.trim()) return data.blockName.trim()

  // 2) Plain title/heading fields.
  if (data?.title?.trim()) return data.title.trim()
  if (data?.heading?.trim()) return data.heading.trim()

  // 3) First heading / first text from any richText-like field.
  const rtLabel =
    firstHeadingOrText(data?.richText) ||
    firstHeadingOrText(data?.introContent) ||
    firstHeadingOrText(data?.content)
  if (rtLabel) return rtLabel

  // 4) Block-type-specific fallbacks that still carry meaning.
  switch (data?.blockType) {
    case 'archive':
      if (data?.populateBy === 'collection' && data?.relationTo) {
        const rel = Array.isArray(data.relationTo) ? data.relationTo.join(', ') : data.relationTo
        return `Archive — ${rel}`
      }
      break
    case 'contentMedia':
      if (data?.mediaPosition) return `Content & Media (media ${data.mediaPosition})`
      break
    case 'content':
      if (Array.isArray(data?.columns) && data.columns.length > 0) {
        return `Content (${data.columns.length} column${data.columns.length > 1 ? 's' : ''})`
      }
      break
    case 'code':
      if (data?.language) return `Code — ${data.language}`
      break
    case 'banner':
      if (data?.style) return `Banner (${data.style})`
      break
  }

  // 5) Block-type default name.
  return (data?.blockType && BLOCK_DEFAULTS[data.blockType]) || 'Block'
}

export const BlockRowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<BlockData>()
  const label = deriveBlockLabel(data || {})
  const prefix = typeof rowNumber === 'number' ? `${rowNumber + 1}. ` : ''
  return <div>{`${prefix}${label}`}</div>
}

export const ContentColumnRowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<{
    size?: string
    richText?: LexicalState
  }>()
  const text = firstHeadingOrText(data?.richText)
  const size = data?.size ? ` (${data.size})` : ''
  const prefix = typeof rowNumber === 'number' ? `Column ${rowNumber + 1}` : 'Column'
  return <div>{`${prefix}${size}${text ? ` — ${text}` : ''}`}</div>
}
