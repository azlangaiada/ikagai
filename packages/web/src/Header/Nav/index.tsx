import React, { useState, useRef, useEffect } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Link } from 'react-router-dom'
import { SearchIcon, ChevronDown } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType | null }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map((item, i) => {
        const hasSubItems = item.subItems && item.subItems.length > 0

        if (hasSubItems) {
          return <DropdownNavItem key={i} item={item} />
        }

        return <CMSLink key={i} {...item.link} appearance="link" />
      })}
      <Link to="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
}

const DropdownNavItem: React.FC<{
  item: NonNullable<HeaderType['navItems']>[number]
}> = ({ item }) => {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150)
  }

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
        onClick={() => setOpen((prev) => !prev)}
        onFocus={handleEnter}
        type="button"
      >
        <CMSLink {...item.link} appearance="link" />
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-2 bg-background border border-border rounded-md shadow-lg py-2 min-w-48 z-50"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {item.subItems?.map((subItem, j) => (
            <div key={j} className="px-1">
              <CMSLink
                {...subItem.link}
                appearance="inline"
                className="block px-3 py-2 text-sm rounded hover:bg-muted transition-colors w-full"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
