import { useHeaderTheme } from '@/providers/HeaderTheme'
import { Link, useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { CMSLink } from '@/components/Link'

interface HeaderClientProps {
  data: Header | null
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const location = useLocation()

  useEffect(() => {
    setHeaderTheme(null)
  }, [location.pathname, setHeaderTheme])

  useEffect(() => {
    setTheme(headerTheme ?? null)
  }, [headerTheme])

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const navItems = data?.navItems || []

  return (
    <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-[var(--line)]">
      <div className="brand-topbar" />
      <header className="container relative" {...(theme ? { 'data-theme': theme } : {})}>
        <div className="py-4 flex items-center justify-between">
          <Link to="/" aria-label="ikigaAI home">
            <Logo loading="eager" priority="high" />
          </Link>

          {/* Desktop nav */}
          <HeaderNav data={data} />

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 -mr-2"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X size={26} style={{ color: 'var(--navy)' }} /> : <Menu size={26} style={{ color: 'var(--navy)' }} />}
          </button>
        </div>
      </header>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-[var(--line)] bg-white">
          <div className="container py-3 flex flex-col">
            {navItems.map((item, i) => (
              <CMSLink
                key={i}
                {...item.link}
                appearance="inline"
                className="py-3 text-base font-bold border-b border-[var(--line)] last:border-0 text-[var(--navy)]"
              />
            ))}
          </div>
        </nav>
      )}
    </div>
  )
}
