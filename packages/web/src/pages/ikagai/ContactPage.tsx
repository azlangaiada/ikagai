import React from 'react'
import { usePageData } from '@/hooks/usePageData'
import { FormBlock } from '@/blocks/Form/Component'
import { SEO, Hero, Section, Card, Eyebrow } from './_brand'
import { Linkedin, MapPin } from 'lucide-react'

export const OFFICE_ADDRESS = 'Menara Maxis, 26th & 36th Floor, City Centre, 50088 Kuala Lumpur, Malaysia'

export const ContactPage: React.FC = () => {
  const data = usePageData()
  const s = data?.settings || {}
  const form = data?.form

  return (
    <article>
      <SEO
        title="Contact"
        description="Book a short working session on your top cost-KPI gap — and get a fixed-scope AI pilot proposal with an ROI gate."
      />

      <Hero
        eyebrow="Let’s talk"
        title={<>Turn your Kaizen findings<br />into a 6–8 week AI pilot.</>}
        subtitle="A short working session on your top cost-KPI gap → a fixed-scope pilot proposal with an ROI gate. No big-bang transformation."
      />

      <Section>
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-8">
          {/* Contact details */}
          <div>
            <Eyebrow>Reach us directly</Eyebrow>
            <p className="mt-4 text-sm" style={{ color: 'var(--mute)' }}>
              Fill in the form, or use the floating WhatsApp and Email buttons on any page.
            </p>
            <div className="mt-4 grid gap-3">
              <Card>
                <div className="flex items-start gap-3">
                  <MapPin size={20} style={{ color: 'var(--blue)' }} className="flex-none mt-0.5" />
                  <span className="text-sm" style={{ color: 'var(--ink)' }}>{OFFICE_ADDRESS}</span>
                </div>
              </Card>
              <div className="flex gap-3">
                <a href="https://www.linkedin.com/in/sharilgohfadhil/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: 'var(--blue)' }}>
                  <Linkedin size={18} /> Fadhil (Kaizen)
                </a>
                <a href="https://www.linkedin.com/in/mohdazlanabas/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: 'var(--blue)' }}>
                  <Linkedin size={18} /> Azlan (AI)
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <Eyebrow>Send a message</Eyebrow>
            <div className="mt-4">
              {form ? (
                <FormBlock enableIntro={false} form={form} />
              ) : (
                <Card>
                  <p className="text-sm" style={{ color: 'var(--mute)' }}>
                    Prefer email? Write to us at{' '}
                    <a href={`mailto:${s.contactEmail || 'principal@ikigai-life.online'}`} style={{ color: 'var(--blue)', fontWeight: 700 }}>
                      {s.contactEmail || 'principal@ikigai-life.online'}
                    </a>{' '}
                    and we’ll reply within one business day.
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </Section>
    </article>
  )
}
