import React from 'react'
import { Link } from 'react-router-dom'

import type { Footer, Setting } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { FooterInfo } from './FooterInfo'
import { OFFICE_ADDRESS } from '@/pages/ikagai/ContactPage'

interface FooterClientProps {
  footer: Footer | null
  settings: Setting | null
}

export const FooterClient: React.FC<FooterClientProps> = ({ footer, settings }) => {
  const navItems = footer?.navItems || []
  const socialLinks = settings?.socialLinks || []
  const email = settings?.contactEmail
  const wa = settings?.whatsappNumber

  return (
    <footer className="mt-auto text-white" style={{ background: 'var(--navy)' }}>
      <div className="brand-topbar" />
      <div className="container py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="flex flex-col gap-4">
          <Link className="flex items-center bg-white rounded-md px-3 py-2 w-max" to="/">
            <Logo />
          </Link>
          <p className="text-sm font-bold" style={{ color: '#9fe7bb' }}>Better life with AI.</p>
          <p className="text-sm" style={{ color: '#cfe0f5' }}>
            Kaizen finds the value once; AI captures it forever — for Hotels, Tourism &amp; F&amp;B.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-bold">Explore</h3>
          <nav className="flex flex-col gap-2">
            {navItems.length > 0 ? (
              navItems.map(({ link }, i) => (
                <CMSLink className="text-sm hover:opacity-80" style={{ color: '#cfe0f5' }} key={i} {...link} />
              ))
            ) : (
              <>
                <Link className="text-sm hover:opacity-80" style={{ color: '#cfe0f5' }} to="/kaizen-ai">Kaizen + AI</Link>
                <Link className="text-sm hover:opacity-80" style={{ color: '#cfe0f5' }} to="/kaizen">Kaizen</Link>
                <Link className="text-sm hover:opacity-80" style={{ color: '#cfe0f5' }} to="/ai-hospitality">AI for Hospitality</Link>
                <Link className="text-sm hover:opacity-80" style={{ color: '#cfe0f5' }} to="/about">About us</Link>
                <Link className="text-sm hover:opacity-80" style={{ color: '#cfe0f5' }} to="/contact">Contact</Link>
              </>
            )}
          </nav>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-base font-bold">Get in touch</h3>
          <div className="flex gap-3">
            {wa && (
              <a href={`https://wa.me/${String(wa).replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-white hover:opacity-90"
                style={{ background: 'var(--green2)' }} aria-label="Message us on WhatsApp">
                WhatsApp
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-white hover:opacity-90"
                style={{ background: 'var(--blue)' }} aria-label="Email us">
                Email
              </a>
            )}
          </div>
          <p className="text-sm" style={{ color: '#9fb0c6' }}>{OFFICE_ADDRESS}</p>
          {socialLinks.length > 0 && (
            <div className="flex gap-4 mt-1">
              {socialLinks.map((social, i) => (
                <a key={i} href={social.url} target="_blank" rel="noopener noreferrer"
                  className="text-sm capitalize hover:opacity-80" style={{ color: '#cfe0f5' }}>
                  {social.platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs" style={{ color: '#9fb0c6' }}>
          <span>{footer?.copyright || '© 2026 ikigaAI'}</span>
          <FooterInfo />
        </div>
      </div>
    </footer>
  )
}
