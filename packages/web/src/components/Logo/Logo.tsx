import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

// ikagAI text wordmark — navy "ikag" + green "AI", no external assets.
export const Logo = (props: Props) => {
  const { className } = props

  return (
    <span
      className={clsx('inline-flex items-baseline font-extrabold tracking-tight select-none', className)}
      style={{ fontSize: '26px', lineHeight: 1 }}
      aria-label="ikagAI"
    >
      <span style={{ color: 'var(--navy)' }}>ikag</span>
      <span style={{ color: 'var(--green2)' }}>AI</span>
    </span>
  )
}
