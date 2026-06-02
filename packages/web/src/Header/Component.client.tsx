import { useHeaderTheme } from '@/providers/HeaderTheme'
import { Link, useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header | null
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const location = useLocation()

  useEffect(() => {
    setHeaderTheme(null)
  }, [location.pathname, setHeaderTheme])

  useEffect(() => {
    setTheme(headerTheme ?? null)
  }, [headerTheme])

  return (
    <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-[var(--line)]">
      <div className="brand-topbar" />
      <header className="container relative" {...(theme ? { 'data-theme': theme } : {})}>
        <div className="py-4 flex items-center justify-between">
          <Link to="/" aria-label="ikagAI home">
            <Logo loading="eager" priority="high" />
          </Link>
          <HeaderNav data={data} />
        </div>
      </header>
    </div>
  )
}
