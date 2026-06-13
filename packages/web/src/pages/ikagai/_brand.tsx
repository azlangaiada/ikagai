import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

/**
 * Shared ikigaAI brand primitives — palette/feel ported from
 * references/kaizen-ai-deck.html. Used by all six marketing pages.
 */

export const SEO: React.FC<{ title: string; description?: string }> = ({ title, description }) => (
  <Helmet>
    <title>{title} | ikigaAI</title>
    {description && <meta name="description" content={description} />}
  </Helmet>
)

export const Eyebrow: React.FC<{ children: React.ReactNode; light?: boolean }> = ({ children, light }) => (
  <span
    className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em]"
    style={{ color: light ? '#9cc8ff' : 'var(--blue)' }}
  >
    <span className="w-2 h-2 rounded-full" style={{ background: 'var(--green2)' }} />
    {children}
  </span>
)

// Full-width navy gradient hero band.
export const Hero: React.FC<{
  eyebrow?: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  actions?: React.ReactNode
}> = ({ eyebrow, title, subtitle, actions }) => (
  <section
    className="relative"
    style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy2) 55%, #0d4f3c 140%)' }}
  >
    <div className="container py-16 md:py-24">
      {eyebrow && <Eyebrow light>{eyebrow}</Eyebrow>}
      <h1 className="mt-4 text-white font-extrabold leading-[1.05] text-3xl md:text-5xl max-w-4xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-5 text-base md:text-lg max-w-2xl" style={{ color: '#cfe0f5' }}>
          {subtitle}
        </p>
      )}
      {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
    </div>
  </section>
)

export const Section: React.FC<{
  id?: string
  eyebrow?: string
  title?: React.ReactNode
  sub?: React.ReactNode
  alt?: boolean
  children: React.ReactNode
}> = ({ id, eyebrow, title, sub, alt, children }) => (
  <section id={id} style={alt ? { background: '#FFFFFF' } : undefined}>
    <div className="container py-14 md:py-20">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {title && (
        <h2 className="mt-3 font-extrabold text-2xl md:text-3xl" style={{ color: 'var(--navy)' }}>
          {title}
        </h2>
      )}
      {sub && (
        <p className="mt-3 max-w-3xl text-[15px] md:text-base" style={{ color: 'var(--mute)' }}>
          {sub}
        </p>
      )}
      <div className={title || eyebrow || sub ? 'mt-8' : ''}>{children}</div>
    </div>
  </section>
)

type Tone = 'blue' | 'green' | 'ghost' | 'navy'
export const Chip: React.FC<{ tone?: Tone; children: React.ReactNode }> = ({ tone = 'ghost', children }) => {
  const styles: Record<Tone, React.CSSProperties> = {
    blue: { background: 'var(--blue-soft)', color: 'var(--navy2)', border: '1px solid #c9defa' },
    green: { background: 'var(--green-soft)', color: 'var(--green)', border: '1px solid #bfe6cd' },
    ghost: { background: '#fff', color: 'var(--navy2)', border: '1px solid var(--line)' },
    navy: { background: 'var(--navy)', color: '#fff' },
  }
  return (
    <span className="inline-block px-3 py-1.5 rounded-full text-xs font-extrabold" style={styles[tone]}>
      {children}
    </span>
  )
}

export const Card: React.FC<{ className?: string; children: React.ReactNode; style?: React.CSSProperties }> = ({
  className = '',
  children,
  style,
}) => (
  <div
    className={`bg-white rounded-xl p-5 ${className}`}
    style={{ border: '1px solid var(--line)', ...style }}
  >
    {children}
  </div>
)

// Primary / outline button as a react-router Link or external anchor.
export const BrandButton: React.FC<{
  to?: string
  href?: string
  variant?: 'primary' | 'outline' | 'green'
  children: React.ReactNode
}> = ({ to, href, variant = 'primary', children }) => {
  const base = 'inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-opacity hover:opacity-90'
  const styles: Record<string, React.CSSProperties> = {
    primary: { background: 'var(--green2)', color: '#fff' },
    green: { background: 'var(--green2)', color: '#fff' },
    outline: { background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,.5)' },
  }
  if (href) {
    return (
      <a href={href} className={base} style={styles[variant]}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to || '/'} className={base} style={styles[variant]}>
      {children}
    </Link>
  )
}

// Bottom call-to-action band reused across pages.
export const CTABand: React.FC = () => (
  <section style={{ background: 'linear-gradient(90deg, var(--navy), var(--navy2))' }}>
    <div className="container py-12 md:py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div>
        <h2 className="text-white font-extrabold text-2xl md:text-3xl">
          Turn your Kaizen findings into working AI.
        </h2>
        <p className="mt-2" style={{ color: '#cfe0f5' }}>
          Hotels · Tourism · F&amp;B — one continuous improvement engine.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <BrandButton to="/contact" variant="green">
          Book a discovery call
        </BrandButton>
        <BrandButton to="/kaizen-ai" variant="outline">
          See the bridge
        </BrandButton>
      </div>
    </div>
  </section>
)

// Footnote line for illustrative figures (deck convention).
export const Footnote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="mt-6 text-xs" style={{ color: 'var(--mute)' }}>
    {children}
  </p>
)
