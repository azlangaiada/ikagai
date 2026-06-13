import React from 'react'
import { Mail, MessageCircle, Download } from 'lucide-react'
import { usePageData } from '@/hooks/usePageData'
import { SEO } from './_brand'

const EMAIL = 'principal@ikigai-life.online'

type Person = { name: string; role: string; phone: string; img: string }

// Per-person digital business cards, served at /azlan, /sharil, /mubarak.
const PEOPLE: Record<string, Person> = {
  azlan: { name: 'Ir. Ts. Azlan Abas', role: 'Principal Engineer', phone: '+60126012560', img: '/cards/azlan.png' },
  sharil: { name: 'Datuk Sharil Goh Fadhil', role: 'Principal Consultant', phone: '+601120518366', img: '/cards/sharil.png' },
  mubarak: { name: 'Mubarak Mokhtar', role: 'Business Development Director', phone: '+60137302868', img: '/cards/mubarak.png' },
}

function vcardHref(p: Person): string {
  const v = [
    'BEGIN:VCARD', 'VERSION:3.0',
    `FN:${p.name}`,
    `TITLE:${p.role}`,
    'ORG:Ag Alchemy Consultancy Sdn Bhd',
    `TEL;TYPE=CELL:${p.phone}`,
    `EMAIL:${EMAIL}`,
    'URL:https://ikigai-life.online',
    'END:VCARD',
  ].join('\n')
  return 'data:text/vcard;charset=utf-8,' + encodeURIComponent(v)
}

const btn = 'inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-bold transition-opacity hover:opacity-90'

export const CardPage: React.FC = () => {
  const data = usePageData()
  const slug: string | undefined = data?.slug
  const person = slug ? PEOPLE[slug] : undefined

  if (!person) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p style={{ color: 'var(--mute)' }}>Card not found.</p>
      </div>
    )
  }

  const wa = person.phone.replace(/[^0-9]/g, '')

  return (
    <article style={{ background: 'var(--bg)' }}>
      <SEO title={`${person.name} — ikigAI`} description={`${person.role} · Ag Alchemy Consultancy · ikigai-life.online`} />
      {/* Link-preview image when the URL is shared */}
      <meta property="og:image" content={`https://ikigai-life.online${person.img}`} />
      <meta name="twitter:card" content="summary_large_image" />

      <div className="mx-auto max-w-[540px] px-4 py-10 flex flex-col items-center gap-6">
        {/* Business card — click anywhere to email */}
        <a href={`mailto:${EMAIL}`} aria-label={`Email ${person.name}`} className="block w-full">
          <img
            src={person.img}
            alt={`${person.name} — ikigAI business card`}
            className="w-full rounded-2xl shadow-2xl"
            style={{ border: '1px solid var(--line)' }}
          />
        </a>

        {/* Actions */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a href={`mailto:${EMAIL}`} className={btn} style={{ background: 'var(--blue)', color: '#fff' }}>
            <Mail size={18} /> Email
          </a>
          <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className={btn} style={{ background: 'var(--green2)', color: '#fff' }}>
            <MessageCircle size={18} /> WhatsApp
          </a>
          <a href={vcardHref(person)} download={`${slug}.vcf`} className={btn} style={{ border: '1px solid var(--line)', color: 'var(--navy)', background: '#fff' }}>
            <Download size={18} /> Save contact
          </a>
        </div>

        <a href={`mailto:${EMAIL}`} className="text-sm font-semibold" style={{ color: 'var(--blue)' }}>
          {EMAIL}
        </a>

        {/* Shared back */}
        <img
          src="/cards/back.png"
          alt="ikigAI"
          className="w-2/3 rounded-xl mt-2"
          style={{ border: '1px solid var(--line)', opacity: 0.95 }}
        />
      </div>
    </article>
  )
}
