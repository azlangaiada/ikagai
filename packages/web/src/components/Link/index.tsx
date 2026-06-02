import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { Link } from 'react-router-dom'
import React from 'react'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: any
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const { type, appearance = 'inline', children, className, label, newTab, reference, size: sizeFromProps, url } = props

  const href = type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
    ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${reference.value.slug}`
    : url

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' as const } : {}
  const isExternal = href.startsWith('http') || href.startsWith('//')

  const LinkComponent = isExternal ? 'a' : Link
  const linkProps = isExternal ? { href, ...newTabProps } : { to: href, ...newTabProps }

  if (appearance === 'inline') {
    return (
      <LinkComponent className={cn(className)} {...linkProps as any}>
        {label && label}
        {children && children}
      </LinkComponent>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <LinkComponent className={cn(className)} {...linkProps as any}>
        {label && label}
        {children && children}
      </LinkComponent>
    </Button>
  )
}
