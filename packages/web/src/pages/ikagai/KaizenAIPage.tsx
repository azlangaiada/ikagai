import React from 'react'
import { SEO, Hero, Section, Card, CTABand, Eyebrow, Chip } from './_brand'

const pillars = [
  {
    n: '1',
    name: 'People',
    color: 'var(--navy)',
    rows: [
      {
        kaizen: 'Vision & Mission → KPI targets: Safety · Quality · Delivery · Cost',
        ai: 'Becomes the objective function the model optimises — clear targets and guardrails.',
      },
      {
        kaizen: 'Roles, skills & workload mapped (Manpower)',
        ai: 'Demand-based scheduling and copilots that lift each person’s output.',
      },
    ],
  },
  {
    n: '2',
    name: 'Performance',
    color: 'var(--blue)',
    rows: [
      {
        kaizen: 'KPI trends + the “point of entitlement” (best achievable)',
        ai: 'Data pipeline + forecasting that tracks every KPI live vs. entitlement.',
      },
      {
        kaizen: '“Performance dip detected — investigate root cause”',
        ai: 'Anomaly detection that flags the dip the moment it starts, not months later.',
      },
    ],
  },
  {
    n: '3',
    name: 'Continuous Improvement',
    color: 'var(--green)',
    rows: [
      {
        kaizen: 'Identify gap → countermeasures → action list (who / what / when)',
        ai: 'Root-cause ML + recommendation engine that proposes and ranks the next action.',
      },
      {
        kaizen: 'Follow-up & standardise · PLAN → DO → CHECK → ACT',
        ai: 'Automated workflows + MLOps — the standard is enforced and keeps self-improving.',
      },
    ],
  },
]

const levers = [
  { t: '👥 People (Manpower)', d: 'Kaizen finds the skill/workload gap → AI gives copilots & smart scheduling.' },
  { t: '⚙️ Process (Method)', d: 'Kaizen finds the broken flow → AI optimises, forecasts & routes it.' },
  { t: '🛠️ Systems (Tools)', d: 'Kaizen finds the data/asset gap → AI connects, monitors & automates.' },
]

export const KaizenAIPage: React.FC = () => {
  return (
    <article>
      <SEO
        title="Kaizen + AI"
        description="The bridge: every Kaizen artifact is already a spec for an AI system. KPIs, root causes and action lists map one-to-one onto AI components."
      />

      <Hero
        eyebrow="The bridge"
        title={<>Every Kaizen artifact is already<br />a spec for an AI system.</>}
        subtitle="Not a hand-off, but one system. Each Kaizen pillar produces an output that maps 1:1 onto an AI component — the Kaizen exercise is the AI requirements-gathering. We add AI to the identified parts where it compounds the gain."
      />

      <Section
        eyebrow="One continuous improvement system"
        title="Kaizen sees & frames the spec → AI builds, runs & compounds it"
        sub="Read each row left-to-right: the Kaizen output, and the AI component it becomes — grouped by the three pillars People · Performance · Continuous Improvement."
      >
        <div className="grid gap-6">
          {pillars.map((p) => (
            <div key={p.name}>
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="w-7 h-7 rounded-full grid place-items-center text-sm font-extrabold text-white"
                  style={{ background: p.color }}
                >
                  {p.n}
                </span>
                <h3 className="font-extrabold text-lg uppercase tracking-wide" style={{ color: p.color }}>
                  {p.name}
                </h3>
              </div>
              <div className="grid gap-3">
                {p.rows.map((r, i) => (
                  <Card key={i} className="grid md:grid-cols-[1fr_auto_1fr] items-center gap-4">
                    <div>
                      <div className="text-xs font-extrabold uppercase tracking-wide" style={{ color: 'var(--mute)' }}>
                        Kaizen output
                      </div>
                      <p className="mt-1 text-sm" style={{ color: 'var(--ink)' }}>{r.kaizen}</p>
                    </div>
                    <div className="hidden md:block text-2xl font-black" style={{ color: 'var(--blue)' }}>→</div>
                    <div
                      className="rounded-lg p-3"
                      style={{ background: 'var(--green-soft)', border: '1px solid #bfe6cd' }}
                    >
                      <div className="text-xs font-extrabold uppercase tracking-wide" style={{ color: 'var(--green)' }}>
                        AI component
                      </div>
                      <p className="mt-1 text-sm font-semibold" style={{ color: 'var(--navy2)' }}>{r.ai}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section alt eyebrow="The three levers" title="People · Process · Systems — every day">
        <div className="grid md:grid-cols-3 gap-4">
          {levers.map((l) => (
            <Card key={l.t}>
              <div className="font-extrabold" style={{ color: 'var(--navy)' }}>{l.t}</div>
              <p className="mt-2 text-sm" style={{ color: 'var(--mute)' }}>{l.d}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Kaizen alone vs Kaizen + AI */}
      <Section eyebrow="Why unison beats hand-off" title="Kaizen alone vs. Kaizen + AI">
        <div className="grid md:grid-cols-2 gap-4">
          <Card style={{ borderColor: '#f3c9c4', background: '#fdf2f1' }}>
            <Chip tone="ghost">Kaizen alone</Chip>
            <ul className="mt-3 space-y-2 text-sm" style={{ color: 'var(--ink)' }}>
              <li>• Wins reduce overtime — but live in slides</li>
              <li>• Harder to scale across properties</li>
              <li>• May depend on manual effort to maintain</li>
              <li>• Improves once, then drifts back</li>
            </ul>
          </Card>
          <Card style={{ borderColor: '#bfe6cd', background: 'var(--green-soft)' }}>
            <Chip tone="green">Kaizen + AI — one engine</Chip>
            <ul className="mt-3 space-y-2 text-sm font-semibold" style={{ color: 'var(--navy2)' }}>
              <li>• Captured in software — runs 24/7</li>
              <li>• Scales to every room, outlet & property</li>
              <li>• Self-improving — every cycle raises the baseline ↑</li>
              <li>• Kaizen finds it once; AI captures it forever</li>
            </ul>
          </Card>
        </div>
        <div className="mt-8 rounded-2xl p-6 md:p-8" style={{ background: 'var(--blue-soft)', border: '1px solid #c9defa' }}>
          <Eyebrow>The loop</Eyebrow>
          <p className="mt-3 text-base md:text-lg font-semibold" style={{ color: 'var(--navy2)' }}>
            SEE → FIND → BUILD → ACT ↻ — Kaizen and AI run as one continuous engine, not two separate
            tools. That is ikagAI: <strong>a better life with AI.</strong>
          </p>
        </div>
      </Section>

      <CTABand />
    </article>
  )
}
