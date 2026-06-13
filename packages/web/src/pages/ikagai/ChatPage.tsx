import React, { useState } from 'react'
import { X } from 'lucide-react'
import { usePageData } from '@/hooks/usePageData'
import { FormBlock } from '@/blocks/Form/Component'
import { SEO } from './_brand'
import { HomePage } from './HomePage'

// Per-person vanity slugs (e.g. /azlan) printed on individual business cards.
// They reuse this same page; the popup just greets the named person.
const PEOPLE: Record<string, string> = {
  azlan: 'Azlan Abas',
  sharil: 'Datuk Sharil Goh Fadhil',
  mubarak: 'Mubarak Mokhtar',
}

// /chat (and /azlan, /sharil, /mubarak) — the links printed on the business cards.
// Renders the homepage and auto-opens a "Send us a message" popup wired to the
// site's Contact form. Submitting emails us via the site's email setup. Closing
// the popup leaves the visitor on the normal homepage.
export const ChatPage: React.FC = () => {
  const data = usePageData()
  const s = data?.settings || {}
  const form = data?.form
  const person = data?.slug ? PEOPLE[data.slug] : undefined
  const heading = person ? `Message ${person}` : 'Send us a message'
  const [open, setOpen] = useState(true)

  return (
    <>
      <SEO
        title="Let’s talk"
        description="Send us a message — we’ll reply within one business day."
      />

      <HomePage />

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ background: 'rgba(11,44,94,0.55)' }}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={heading}
        >
          <div
            className="relative w-full max-w-[480px] rounded-2xl shadow-2xl bg-white max-h-[88vh] overflow-y-auto"
            style={{ border: '1px solid var(--line)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* header */}
            <div
              className="sticky top-0 px-5 py-4 flex items-center justify-between text-white"
              style={{ background: 'linear-gradient(135deg, var(--navy), var(--green2))' }}
            >
              <span className="font-extrabold text-lg">{heading}</span>
              <button onClick={() => setOpen(false)} aria-label="Close" className="hover:opacity-80">
                <X size={20} />
              </button>
            </div>

            {/* body */}
            <div className="p-5">
              {person && (
                <p className="mb-3 text-sm" style={{ color: 'var(--mute)' }}>
                  You’re reaching <b style={{ color: 'var(--navy)' }}>{person}</b> — we’ll reply
                  within one business day.
                </p>
              )}
              {form ? (
                <FormBlock enableIntro={false} form={form} />
              ) : (
                <p className="text-sm" style={{ color: 'var(--mute)' }}>
                  Prefer email? Write to us at{' '}
                  <a
                    href={`mailto:${s.contactEmail || 'principal@ikigai-life.online'}`}
                    style={{ color: 'var(--blue)', fontWeight: 700 }}
                  >
                    {s.contactEmail || 'principal@ikigai-life.online'}
                  </a>{' '}
                  and we’ll reply within one business day.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
