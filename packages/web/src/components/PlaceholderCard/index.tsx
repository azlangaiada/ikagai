import React from 'react'

type PlaceholderCardProps = {
  title: string
  description: string
  className?: string
}

// Dashed-border empty-state card shown by content blocks when the CMS has no
// items yet. Same visual style across the whole site so it reads as
// "placeholder here" to editors rather than looking broken.
export const PlaceholderCard: React.FC<PlaceholderCardProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <div className={className ? `container ${className}` : 'container'}>
      <div className="border border-dashed border-border rounded-lg p-12 text-center text-muted-foreground">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}
