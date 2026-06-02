import React from 'react'
import { SEO, Hero, Section, Card, CTABand, Eyebrow, Chip, Footnote, BrandButton } from './_brand'

const industries = ['🏨 Hotels & Hospitality', '🧳 Tourism', '🍽️ Food & Beverage']

const matrix = [
  {
    kpi: '🛡️ Safety',
    cells: [
      'Incident logs, near-misses → CV safety monitoring + predictive maintenance',
      'Excursion / transport risk → weather & risk alerts, route safety scoring',
      'Food safety & hygiene (HACCP) → sensor + vision temp/hygiene compliance',
    ],
  },
  {
    kpi: '🏅 Quality',
    cells: [
      'Reviews & complaint themes → NLP review-mining + service-recovery alerts',
      'Inconsistent guest experience → personalisation + itinerary recommender',
      'Recipe / portion variability → vision consistency scoring, prep guidance',
    ],
  },
  {
    kpi: '🚚 Delivery',
    cells: [
      'Check-in queues, room readiness → demand forecast + housekeeping optimisation',
      'Schedule slips, no-shows → demand forecasting + dynamic routing',
      'Kitchen ticket / table-turn time → throughput forecasting + load balancing',
    ],
  },
  {
    kpi: '💰 Cost',
    highlight: true,
    cells: [
      'Labour & energy spend → forecast-driven staffing + energy optimisation',
      'Empty seats / underused capacity → demand forecast + dynamic pricing & yield',
      'Food waste & over-ordering → demand forecast + par-level / inventory optimisation',
    ],
  },
]

const flagship = [
  { n: '1', t: 'Intelligent Guest Response & Service Recovery', tag: 'Quality · People + Systems',
    struggle: 'Dissatisfaction surfaces only after checkout — as a public review. A generic chatbot can’t detect or fix it.',
    sol: 'Omnichannel sentiment + intent AI spots an unhappy guest mid-stay and triggers recovery before they leave — or post.', metric: 'Stop bad reviews pre-emptively' },
  { n: '2', t: 'Total Revenue & Demand Optimisation', tag: 'Revenue · Systems',
    struggle: 'Teams price rooms in isolation — F&B, spa, events & group-displacement profit is left on the table.',
    sol: 'Segment-level demand forecasting optimises profit across rooms + ancillary, with group-displacement analysis.', metric: '+5–10% RevPAR*' },
  { n: '3', t: 'Predictive Labour Forecasting & Dynamic Scheduling', tag: 'Cost · People + Process',
    struggle: 'Labour is the #1 controllable cost, yet rosters are manual & reactive — overtime and understaffing both bite.',
    sol: 'Forecasts arrivals & covers by the hour and auto-builds compliant rosters across departments.', metric: 'Labour ≈ 30–40% of revenue' },
  { n: '4', t: 'F&B Margin & Waste Intelligence', tag: 'Cost · Process + Systems',
    struggle: 'Thin F&B margins erode through over-production, waste & menu-mix blind spots no one can see in time.',
    sol: 'Forecast covers, plan production, optimise par-levels & menu engineering; vision-based waste tracking.', metric: '~50% waste cut*' },
  { n: '5', t: 'Predictive Maintenance & Energy / ESG', tag: 'Cost / Safety · Systems',
    struggle: 'Reactive maintenance fails in front of guests; energy is the biggest non-labour cost and a growing ESG liability.',
    sol: 'IoT + ML predict equipment failure (HVAC, chillers, lifts) and optimise energy use continuously.', metric: 'Cut energy + downtime' },
]

const stack = [
  { n: '1', t: 'Sources & Ingestion', d: 'Property, POS & booking systems · IoT & sensors (energy, temp, occupancy) · reviews & CRM — real-time streaming.' },
  { n: '2', t: 'Data Platform', d: 'Cloud data warehouse + governed data lake · transformation layer · reusable feature store — one trusted source of truth.' },
  { n: '3', t: 'AI / ML & GenAI', d: 'Managed ML (forecasting, anomaly detection) · LLMs + retrieval (RAG) · recommendation & pricing engines.' },
  { n: '4', t: 'Delivery & Action', d: 'Live BI dashboards (KPI vs. entitlement) · APIs & guest messaging · write-back to PMS/POS — a closed loop.' },
]

const build = [
  { p: 'P', t: 'Plan — frame & size', wk: 'Weeks 1–2', d: 'Turn the Kaizen finding into an AI use-case canvas; value-size vs. entitlement; data & systems audit; pick one high-ROI KPI.' },
  { p: 'D', t: 'Do — build the pilot', wk: 'Weeks 3–8', d: 'Data pipeline + model + integration on enterprise-grade cloud, fitting your existing property & POS systems.' },
  { p: 'C', t: 'Check — prove the value', wk: 'Weeks 3–8', d: 'Measure against the KPI baseline; A/B vs. the manual way; ROI gate before any scale spend — scale, adjust or stop.' },
  { p: 'A', t: 'Act — standardise & scale', wk: 'From week 9', d: 'Roll out across rooms / outlets / properties; MLOps keeps it accurate; the standard self-improves — Kaizen, automated.' },
]

const cases = [
  { tag: 'Cost · F&B', op: 'Lumière Hotels & Resorts — kitchen group', sol: 'AI food-waste vision: camera + smart scale identifies and values every item binned; daily analytics guide prep.',
    metrics: ['~50% food waste reduced', '2–8% food cost saved', '~12-month payback'] },
  { tag: 'Revenue · Hotel', op: 'Continental Hotels Collection — 450+ properties', sol: 'AI revenue management: ML demand forecasting sets the optimal price per room-night in real time, by segment & channel.',
    metrics: ['5–10% RevPAR uplift', '100% pricing automated', '↑ forecast accuracy'] },
  { tag: 'Guest Exp · Hotel', op: 'The Marquesa, Las Vegas — “Iris” text concierge', sol: 'AI concierge answers requests by text, recommends dining & shows, and drives on-property spend 24/7.',
    metrics: ['+37% spend by engaged guests', '24/7 instant response', '↑ loyalty & satisfaction'] },
  { tag: 'Operations · Hotel', op: 'Kingsway Hotels London — “Hugo” virtual host', sol: 'AI virtual host answers guest texts instantly and routes only exceptions to staff — no app, no download.',
    metrics: ['Majority of routine requests automated', '10k+ guest messages handled', '↓ response time; staff freed'] },
]

export const AIHospitalityPage: React.FC = () => {
  return (
    <article>
      <SEO
        title="AI for Hospitality, F&B & Tourism"
        description="From a Kaizen finding to a working AI solution — by KPI and industry. The flagship high-value systems, the production stack, and how we build them in 6–8 weeks."
      />

      <Hero
        eyebrow="Where it lands — Hotels · Tourism · F&B"
        title={<>From a Kaizen finding<br />to a working AI solution.</>}
        subtitle="Read by KPI and industry. We target the high-entitlement gap first — then build the AI that closes it and holds it 24/7."
      />

      {/* Industry matrix */}
      <Section eyebrow="The matrix" title="Finding → AI solution, by KPI & industry"
        sub="Rows are the Kaizen pillars (Safety · Quality · Delivery · Cost); each cell is finding → AI solution. In the Kaizen baseline, Cost scored lowest — the biggest entitlement gap and the highest-ROI first AI target.">
        <div className="overflow-x-auto">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-[120px_1fr_1fr_1fr] gap-2">
              <div />
              {industries.map((i) => (
                <div key={i} className="text-sm font-extrabold px-3 py-2 rounded-lg" style={{ background: 'var(--navy)', color: '#fff' }}>{i}</div>
              ))}
              {matrix.map((row) => (
                <React.Fragment key={row.kpi}>
                  <div className="text-sm font-extrabold flex items-center px-2" style={{ color: row.highlight ? 'var(--red)' : 'var(--navy)' }}>{row.kpi}</div>
                  {row.cells.map((c, idx) => (
                    <div key={idx} className="text-xs rounded-lg p-3"
                      style={{ background: row.highlight ? '#fdeceb' : '#fff', border: `1px solid ${row.highlight ? '#f3c9c4' : 'var(--line)'}`, color: 'var(--ink)' }}>
                      {c}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        <Footnote>Cost row highlighted — fastest, most measurable payback for a first pilot.</Footnote>
      </Section>

      {/* Flagship solutions */}
      <Section alt eyebrow="Flagship solutions — high value, hard to crack"
        title="Five AI systems hospitality really struggles with"
        sub="Beyond chatbots & dashboards — the high-ROI, hard-to-build systems most operators cannot crack alone. Deliberately not the low-hanging, generic fruit.">
        <div className="grid md:grid-cols-2 gap-4">
          {flagship.map((f) => (
            <Card key={f.n}>
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 flex-none rounded-full grid place-items-center text-sm font-extrabold text-white" style={{ background: 'var(--green2)' }}>{f.n}</span>
                <div>
                  <div className="font-extrabold" style={{ color: 'var(--navy)' }}>{f.t}</div>
                  <p className="mt-1 text-xs" style={{ color: 'var(--mute)' }}><strong>Struggle:</strong> {f.struggle}</p>
                  <p className="mt-2 text-sm" style={{ color: 'var(--ink)' }}>{f.sol}</p>
                  <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
                    <Chip tone="green">{f.metric}</Chip>
                    <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: 'var(--mute)' }}>{f.tag}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-6 rounded-xl p-5" style={{ background: 'var(--blue-soft)', border: '1px solid #c9defa' }}>
          <p className="text-sm font-semibold" style={{ color: 'var(--navy2)' }}>
            What all five share: ① live data from many systems · ② ML forecasting & optimisation ·
            ③ automation back into the workflow · ④ continuous retraining & governance. Off-the-shelf
            apps cover ~10%. The 90% — integration, accuracy & ownership — is the craft.
          </p>
        </div>
        <Footnote>* Industry-reported ranges — see the case studies below.</Footnote>
      </Section>

      {/* Technology stack */}
      <Section eyebrow="The technology — available now, hard to wield alone"
        title="A production AI system is a governed, multi-layer stack"
        sub="The building blocks are best-in-class and cloud-native. The difficulty is architecting, integrating, securing and operating them together.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {stack.map((s) => (
            <Card key={s.n}>
              <span className="text-xs font-extrabold" style={{ color: 'var(--blue)' }}>{s.n}</span>
              <div className="font-extrabold mt-1" style={{ color: 'var(--navy)' }}>{s.t}</div>
              <p className="mt-2 text-xs" style={{ color: 'var(--mute)' }}>{s.d}</p>
            </Card>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-3 mt-3">
          <Card style={{ background: '#f7fafc' }}>
            <div className="font-extrabold text-sm" style={{ color: 'var(--navy)' }}>⚙️ MLOps & Observability</div>
            <p className="mt-1 text-xs" style={{ color: 'var(--mute)' }}>CI/CD pipelines · model registry · drift & quality monitoring · automated retraining · evaluation & A/B.</p>
          </Card>
          <Card style={{ background: '#f7fafc' }}>
            <div className="font-extrabold text-sm" style={{ color: 'var(--navy)' }}>🔒 Security, Privacy & Compliance</div>
            <p className="mt-1 text-xs" style={{ color: 'var(--mute)' }}>IAM & least-privilege · encryption · PII handling · PDPA / GDPR · audit & lineage. You own the data.</p>
          </Card>
        </div>
        <p className="mt-4 text-sm" style={{ color: 'var(--mute)' }}>
          It takes six disciplines working as one — data engineering, ML engineering, cloud architecture,
          MLOps, security & compliance, systems integration — plus hospitality domain. That is where in-house
          attempts stall: POCs that never reach production, siloed models that silently decay, and PDPA/lock-in risk.
        </p>
      </Section>

      {/* How we build */}
      <Section alt eyebrow="How we build — de-risked, on the PDCA loop"
        title="From finding to a running AI system — in 6–8 weeks"
        sub="The build follows the same Plan → Do → Check → Act rhythm your teams already run in Kaizen, so adoption feels native, not foreign.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {build.map((b) => (
            <Card key={b.p}>
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full grid place-items-center text-sm font-extrabold text-white" style={{ background: 'var(--navy)' }}>{b.p}</span>
                <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: 'var(--green)' }}>{b.wk}</span>
              </div>
              <div className="font-extrabold mt-2 text-sm" style={{ color: 'var(--navy)' }}>{b.t}</div>
              <p className="mt-1 text-xs" style={{ color: 'var(--mute)' }}>{b.d}</p>
            </Card>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Chip tone="ghost">🎯 Focused — one KPI first</Chip>
          <Chip tone="ghost">🔒 Fixed scope & ROI gate</Chip>
          <Chip tone="ghost">📏 Tied to your Kaizen baseline</Chip>
          <Chip tone="ghost">🧩 Native PDCA fit</Chip>
        </div>
      </Section>

      {/* Case studies */}
      <Section eyebrow="Proof — case studies" title="AI automation in hospitality — real operators, real numbers"
        sub="Across the same levers we build on: Cost · Revenue · Guest Experience · Operations.">
        <div className="grid md:grid-cols-2 gap-4">
          {cases.map((c) => (
            <Card key={c.op}>
              <Chip tone="blue">{c.tag}</Chip>
              <div className="font-extrabold mt-2" style={{ color: 'var(--navy)' }}>{c.op}</div>
              <p className="mt-1 text-sm" style={{ color: 'var(--ink)' }}>{c.sol}</p>
              <ul className="mt-3 space-y-1">
                {c.metrics.map((m) => (
                  <li key={m} className="text-sm font-bold" style={{ color: 'var(--green)' }}>↑ {m}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        <Footnote>
          Case operators are pseudonyms; figures are composites of publicly reported industry deployments
          across food-waste vision, revenue management, AI concierge and virtual-host messaging —
          illustrative of typical outcomes, not guaranteed.
        </Footnote>
        <div className="mt-8 flex flex-wrap gap-3">
          <BrandButton to="/contact" variant="primary">Find my high-entitlement KPI</BrandButton>
        </div>
      </Section>

      <CTABand />
    </article>
  )
}
