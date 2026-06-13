import React from 'react'
import { usePageData } from '@/hooks/usePageData'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { SEO, Hero, Section, Card, CTABand, Eyebrow } from './_brand'

type Member = {
  name: string
  role: string
  bio?: string
  linkedin?: string
  image?: any
}

// Coded fallback so the page is complete even before the CMS team is seeded.
const fallback: Member[] = [
  {
    name: 'Shahril Goh Fadhil',
    role: 'Kaizen Consulting Partner',
    bio: 'Shahril Goh Fadhil leads the Kaizen side of ikigaAI. Over a career in operational excellence and continuous improvement, he has guided hospitality, manufacturing and service teams to find where value really leaks — and to close the gap with their own people. He works at the gemba: mapping KPIs against the point of entitlement, running root-cause and 5-Whys analysis, and turning findings into prioritised, owned action lists. His strength is making improvement stick — embedding standard work, visual management and a daily Kaizen rhythm so gains hold long after the workshop ends. Trained in Lean and Six Sigma, he frames every engagement around Safety, Quality, Delivery and Cost, pairing disciplined method with genuine respect for the people who do the work. Fadhil builds the clear, measurable foundation that ikigaAI’s AI systems are then engineered to scale.',
  },
  {
    name: 'Azlan Abas',
    role: 'AI Solution Partner',
    bio: 'Azlan Abas builds and runs the AI that turns a Kaizen finding into a system that improves every day. He is an unusual blend of strategy and engineering — a Mechanical Engineer and Certified Accountant who is also a Software Engineer and GCP Cloud Engineer, with consulting-grade problem framing. That range lets him speak operations, numbers and code in the same conversation: sizing the value, designing the data platform, training the models, and wiring automation back into the tools teams already use. He focuses on production, not proofs-of-concept — governed data pipelines, forecasting and anomaly detection, retrieval-grounded assistants, and the MLOps and security that keep them accurate and compliant over time. Azlan delivers in focused 6–8 week pilots with a clear ROI gate, so every build is measurable, owned by the client, and ready to scale across rooms, outlets and properties.',
  },
]

const Avatar: React.FC<{ m: Member }> = ({ m }) => {
  const url = m.image && typeof m.image === 'object' ? getMediaUrl(m.image.url) : null
  if (url) {
    return <img src={url} alt={m.name} className="w-20 h-20 rounded-full object-cover" />
  }
  const initials = m.name.split(' ').map((w) => w[0]).slice(0, 2).join('')
  return (
    <div className="w-20 h-20 rounded-full grid place-items-center text-2xl font-extrabold text-white"
      style={{ background: 'linear-gradient(135deg, var(--navy), var(--green))' }}>
      {initials}
    </div>
  )
}

export const AboutPage: React.FC = () => {
  const data = usePageData()
  const docs: Member[] = data?.team?.docs?.length ? data.team.docs : fallback

  return (
    <article>
      <SEO
        title="About us"
        description="ikigaAI pairs a Kaizen consulting partner with an AI solution builder — one team, one loop: your people plus AI."
      />

      <Hero
        eyebrow="One team, one loop"
        title={<>Your people + AI —<br />a better way of working.</>}
        subtitle="ikigaAI brings together Kaizen consulting and AI delivery so improvement is found with your teams and then captured forever in software. Better every day, together."
      />

      <Section eyebrow="The consultants" title="Who you work with">
        <div className="grid md:grid-cols-2 gap-4">
          {docs.map((m) => (
            <Card key={m.name}>
              <div className="flex items-center gap-4">
                <Avatar m={m} />
                <div>
                  <div className="text-lg font-extrabold" style={{ color: 'var(--navy)' }}>{m.name}</div>
                  <div className="text-sm font-bold" style={{ color: 'var(--green)' }}>{m.role}</div>
                </div>
              </div>
              {m.bio && <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--mute)' }}>{m.bio}</p>}
            </Card>
          ))}
        </div>
      </Section>

      <Section alt eyebrow="Why this partnership wins" title="Found with your people. Built to last.">
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <p className="text-sm" style={{ color: 'var(--ink)' }}>✓ Kaizen finds & frames the gap with your people; we build & run the AI that closes it.</p>
          </Card>
          <Card>
            <p className="text-sm" style={{ color: 'var(--ink)' }}>✓ It captures the gain forever and scales across rooms, outlets & properties.</p>
          </Card>
          <Card>
            <p className="text-sm" style={{ color: 'var(--ink)' }}>✓ Same People · Process · Systems levers and PDCA loop you already trust.</p>
          </Card>
        </div>
        <div className="mt-6 rounded-2xl p-6 md:p-8" style={{ background: 'var(--blue-soft)', border: '1px solid #c9defa' }}>
          <Eyebrow>Combined experience</Eyebrow>
          <p className="mt-3 text-base md:text-lg font-semibold leading-relaxed" style={{ color: 'var(--navy2)' }}>
            Between them, Fadhil and Azlan bring decades of combined experience across management
            consulting, Lean Six Sigma and operational excellence, business improvement and change
            management, finance and accounting, and mechanical, software and cloud engineering. They
            have led improvement programmes end to end — from first diagnostic through implementation
            to successful project closure and handover — across hospitality, F&amp;B and industrial
            operations. That means ikigaAI can size the opportunity, win the buy-in of the people who
            run the floor, build the AI that captures the gain, and make the new way of working stick:
            strategy and engineering, method and delivery, in one team.
          </p>
        </div>
      </Section>

      <CTABand />
    </article>
  )
}
