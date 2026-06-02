import React from 'react'
import { SEO, Hero, Section, Card, CTABand, Eyebrow, Chip, Footnote } from './_brand'

const pillars = [
  {
    name: 'People',
    sub: 'Vision & Mission → KPIs',
    points: ['Safety — protecting our people first', 'Quality — delivering excellence consistently', 'Delivery — meeting commitments on time', 'Cost — optimising resources efficiently'],
  },
  {
    name: 'Performance',
    sub: 'Trends & points of entitlement',
    points: ['Improving / stable / declining trend indicators', 'Point of entitlement (best achievable)', 'At-risk performance identification', 'Data-informed decision making'],
  },
  {
    name: 'Continuous Improvement',
    sub: 'The Kaizen cycle',
    points: ['Identify gaps vs. target', 'Root-cause & impact analysis', 'Countermeasures: what / who / how', 'Follow-up, standardise, sustain'],
  },
]

const cycle = [
  { t: 'PLAN & DO', d: 'Identify issues and develop countermeasures with clear action lists.' },
  { t: 'CHECK & ACT', d: 'Review results, adjust the approach, implement refined solutions.' },
  { t: 'VERIFY & RUN', d: 'Confirm effectiveness and standardise for ongoing success.' },
]

const beforeAfter = [
  { k: 'Room turnaround time (TAT)', b: '5 hrs', a: '3.2 hrs' },
  { k: 'Average room cleaning time', b: '51 min', a: '33 min' },
  { k: 'Average check-in time', b: '11 min', a: '4 min' },
  { k: 'Average check-out time', b: '13 min', a: '4 min' },
  { k: 'Linen turnaround (laundry)', b: '5 hrs', a: '2.5 hrs' },
  { k: 'Guest complaints / week', b: '406', a: '72' },
]

export const KaizenPage: React.FC = () => {
  return (
    <article>
      <SEO
        title="Kaizen"
        description="Kaizen — People, Performance, Continuous Improvement. The disciplined, data-driven method that finds where value leaks and why, before any AI is built."
      />

      <Hero
        eyebrow="People · Performance · Continuous Improvement"
        title={<>Kaizen finds where value leaks — and why.</>}
        subtitle="Kaizen is a disciplined, people-driven method for continuous improvement. Small improvements, every day, big impact — delivered with your teams by our Kaizen consulting partner. It is the essential first step: find the real problem and the solution, before a line of AI is written."
      />

      <Section eyebrow="The three pillars" title="One framework, three interconnected pillars">
        <div className="grid md:grid-cols-3 gap-4">
          {pillars.map((p) => (
            <Card key={p.name}>
              <div className="font-extrabold text-lg" style={{ color: 'var(--navy)' }}>{p.name}</div>
              <div className="text-xs font-bold uppercase tracking-wide mt-1" style={{ color: 'var(--blue)' }}>{p.sub}</div>
              <ul className="mt-3 space-y-1.5 text-sm" style={{ color: 'var(--mute)' }}>
                {p.points.map((pt) => <li key={pt}>• {pt}</li>)}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section alt eyebrow="The Kaizen cycle" title="PLAN → DO → CHECK → ACT → VERIFY → RUN"
        sub="A structured loop that ensures improvements are systematically implemented, validated and sustained. Continuous improvement is not just about actions — it is about behaviour and culture.">
        <div className="grid sm:grid-cols-3 gap-4">
          {cycle.map((c, i) => (
            <Card key={c.t}>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full grid place-items-center text-sm font-extrabold text-white" style={{ background: 'var(--green2)' }}>{i + 1}</span>
                <span className="font-extrabold" style={{ color: 'var(--navy)' }}>{c.t}</span>
              </div>
              <p className="mt-3 text-sm" style={{ color: 'var(--mute)' }}>{c.d}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Real anonymised Kaizen result */}
      <Section eyebrow="Proof — a real Kaizen result" title="Hotel housekeeping & laundry turnaround"
        sub="A hospitality Kaizen we draw on: disorganised workplaces, no standards and long maintenance turnaround were causing check-in delays, defects and complaints. Kaizen tools, 5S, a Kanban front-office↔housekeeping link and QC checklists transformed the numbers.">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-4">
          <Card className="overflow-hidden p-0">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                  <th className="text-left px-4 py-2 font-bold">Indicator</th>
                  <th className="text-right px-4 py-2 font-bold">Before</th>
                  <th className="text-right px-4 py-2 font-bold" style={{ color: '#9fe7bb' }}>After</th>
                </tr>
              </thead>
              <tbody>
                {beforeAfter.map((r, i) => (
                  <tr key={r.k} style={{ background: i % 2 ? '#fff' : '#f7fafc' }}>
                    <td className="px-4 py-2" style={{ color: 'var(--ink)' }}>{r.k}</td>
                    <td className="px-4 py-2 text-right" style={{ color: 'var(--mute)' }}>{r.b}</td>
                    <td className="px-4 py-2 text-right font-extrabold" style={{ color: 'var(--green)' }}>{r.a}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <div className="grid gap-3">
            <Card>
              <div className="text-xs font-extrabold uppercase tracking-wide" style={{ color: 'var(--mute)' }}>Root causes found</div>
              <p className="mt-1 text-sm" style={{ color: 'var(--ink)' }}>Disorganised workplaces · absent or unfollowed standards · long maintenance turnaround · no visual indicators · no continual-improvement culture.</p>
            </Card>
            <Card style={{ background: 'var(--green-soft)', borderColor: '#bfe6cd' }}>
              <div className="text-xs font-extrabold uppercase tracking-wide" style={{ color: 'var(--green)' }}>Where AI takes it next</div>
              <p className="mt-1 text-sm font-semibold" style={{ color: 'var(--navy2)' }}>Forecast room demand & housekeeping load, auto-sequence cleaning, and predict maintenance — so these gains hold 24/7 and scale to every property.</p>
            </Card>
          </div>
        </div>
        <Footnote>
          Anonymised from a publicly presented hospitality Kaizen programme — illustrative of method and
          typical gains, not a guarantee. A separate F&amp;B pre-assessment scored just 16% against a 75%
          benchmark — exactly the kind of entitlement gap Kaizen is built to close.
        </Footnote>
      </Section>

      <Section alt>
        <div className="rounded-2xl p-6 md:p-8 text-center" style={{ background: 'var(--blue-soft)', border: '1px solid #c9defa' }}>
          <div className="flex justify-center gap-2 flex-wrap">
            <Chip tone="navy">People Driven</Chip>
            <Chip tone="blue">Data Informed</Chip>
            <Chip tone="green">Continuously Improving</Chip>
          </div>
          <p className="mt-4 text-lg font-extrabold" style={{ color: 'var(--navy)' }}>Better every day — together.</p>
        </div>
      </Section>

      <CTABand />
    </article>
  )
}
