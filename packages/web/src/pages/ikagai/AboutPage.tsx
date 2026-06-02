import React from 'react'
import { usePageData } from '@/hooks/usePageData'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { SEO, Hero, Section, Card, CTABand, Eyebrow, Chip } from './_brand'

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
    bio: 'Leads the Kaizen engagement with your people — Lean / Operational Excellence, KPI and point-of-entitlement analysis, root-cause and countermeasures. Finds where value leaks and frames the solution your teams will own.',
    linkedin: 'https://www.linkedin.com/in/sharilgohfadhil/',
  },
  {
    name: 'Mohd Azlan Abas',
    role: 'AI Solution Build',
    bio: 'Builds and runs the AI that closes the gap. Strategy (ex top-tier consulting) plus engineering depth in one builder — Mechanical Engineer, Certified Accountant, Software Engineer and GCP Cloud Engineer. Speaks operations, numbers and code.',
    linkedin: 'https://www.linkedin.com/in/mohdazlanabas/',
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
        description="ikagAI pairs a Kaizen consulting partner with an AI solution builder — one team, one loop: your people plus AI."
      />

      <Hero
        eyebrow="One team, one loop"
        title={<>Your people + AI —<br />a better way of working.</>}
        subtitle="ikagAI brings together Kaizen consulting and AI delivery so improvement is found with your teams and then captured forever in software. Better every day, together."
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
              {m.bio && <p className="mt-4 text-sm" style={{ color: 'var(--mute)' }}>{m.bio}</p>}
              {m.linkedin && (
                <a href={m.linkedin} target="_blank" rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold" style={{ color: 'var(--blue)' }}>
                  Connect on LinkedIn →
                </a>
              )}
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
        <div className="mt-6 rounded-2xl p-6" style={{ background: 'var(--blue-soft)', border: '1px solid #c9defa' }}>
          <Eyebrow>Combined experience</Eyebrow>
          <p className="mt-2 text-base font-semibold" style={{ color: 'var(--navy2)' }}>
            Decades of combined Kaizen, Lean Six Sigma, operational & finance, and system-development
            experience — strategy and engineering depth, end to end.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Chip tone="ghost">Lean Six Sigma</Chip>
            <Chip tone="ghost">Operational Excellence</Chip>
            <Chip tone="ghost">Mechanical Engineer</Chip>
            <Chip tone="ghost">Certified Accountant</Chip>
            <Chip tone="ghost">Software Engineer</Chip>
            <Chip tone="ghost">GCP Cloud Engineer</Chip>
          </div>
        </div>
      </Section>

      <CTABand />
    </article>
  )
}
