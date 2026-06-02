import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

type LegacyLexicalNode = {
  type?: string
  text?: string
  children?: LegacyLexicalNode[]
  [key: string]: unknown
}

// Some legacy / seed data stores text nodes without a `type` field, which
// causes @payloadcms/richtext-lexical/react to render them as "unknown node".
// Walk the tree and normalize: any node that has a string `text` but no
// `type` gets `type: "text"` (with sensible defaults) added.
const normalizeLexical = <T,>(data: T): T => {
  const fix = (node: LegacyLexicalNode): LegacyLexicalNode => {
    if (!node || typeof node !== 'object') return node
    const next: LegacyLexicalNode = { ...node }
    if (typeof next.text === 'string' && !next.type) {
      next.type = 'text'
      next.version = (next.version as number) ?? 1
      next.format = (next.format as number) ?? 0
      next.detail = (next.detail as number) ?? 0
      next.mode = (next.mode as string) ?? 'normal'
      next.style = (next.style as string) ?? ''
    }
    if (Array.isArray(next.children)) {
      next.children = next.children.map(fix)
    }
    return next
  }
  const root = (data as { root?: LegacyLexicalNode } | null | undefined)?.root
  if (!root) return data
  return { ...(data as object), root: fix(root) } as T
}

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, data, ...rest } = props
  const normalized = data ? normalizeLexical(data) : data
  return (
    <ConvertRichText
      converters={jsxConverters}
      data={normalized}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
