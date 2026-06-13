import React from 'react'
import { SEO, Hero, Section, Chip, Card, BrandButton, CTABand, Footnote, Eyebrow } from './_brand'

const loop = [
  { k: 'SEE', d: 'Go to the gemba. Measure what really happens.' },
  { k: 'FIND', d: 'Kaizen surfaces root causes & the solution.' },
  { k: 'BUILD', d: 'AI is added to the parts that compound the gain.' },
  { k: 'ACT', d: 'Deploy, standardise, and improve again. ↻' },
]

export const HomePage: React.FC = () => {
  return (
    <article>
      <SEO
        title="Better life with AI"
        description="ikigaAI pairs Kaizen with AI for Hospitality, Tourism and F&B. Find the solution with Kaizen, then add AI to the parts that matter — one continuous improvement engine."
      />

      <Hero
        eyebrow="ikigai + AI = ikigaAI"
        title={<>From Kaizen finding<br />to a working AI system.</>}
        subtitle={
          <>
            <strong style={{ color: '#fff' }}>Better life with AI.</strong> First we run Kaizen to
            find the real problems and the identified solution — then we add AI to the exact parts
            where it compounds the gain. Built for Hotels, Tourism and F&amp;B.
          </>
        }
        actions={
          <>
            <BrandButton to="/contact" variant="green">Book a discovery call</BrandButton>
            <BrandButton to="/kaizen-ai" variant="outline">See how it fits together</BrandButton>
          </>
        }
      />

      {/* What's in the name */}
      <Section alt eyebrow="What's in the name" title="ikigai, reimagined for the AI era">
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <div className="text-lg font-extrabold" style={{ color: 'var(--navy)' }}>生き甲斐 — ikigai</div>
            <p className="mt-2 text-sm" style={{ color: 'var(--mute)' }}>
              The Japanese idea of a life of purpose — work worth doing, done well. The same spirit
              that drives Kaizen: respect for people and relentless improvement.
            </p>
          </Card>
          <Card>
            <div className="text-lg font-extrabold" style={{ color: 'var(--navy)' }}>+ AI</div>
            <p className="mt-2 text-sm" style={{ color: 'var(--mute)' }}>
              Once Kaizen identifies the solution, AI is added only to the parts that move the
              needle — service recovery, forecasting, scheduling, margins, maintenance.
            </p>
          </Card>
          <Card style={{ borderColor: '#bfe6cd', background: 'var(--green-soft)' }}>
            <div className="text-lg font-extrabold" style={{ color: 'var(--green)' }}>= ikigaAI</div>
            <p className="mt-2 text-sm" style={{ color: 'var(--navy2)' }}>
              A better way of working — and a <strong>better life with AI</strong>. People,
              performance and continuous improvement, fused into one engine.
            </p>
          </Card>
        </div>
      </Section>

      {/* The continuous loop */}
      <Section
        eyebrow="One continuous engine"
        title="SEE → FIND → BUILD → ACT ↻"
        sub="Kaizen and AI are not a hand-off. They are one loop that keeps tightening — each cycle leaves a standard the next AI build can learn from."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loop.map((s, i) => (
            <Card key={s.k} className="relative">
              <div className="flex items-center gap-3">
                <span
                  className="w-8 h-8 rounded-full grid place-items-center text-sm font-extrabold text-white"
                  style={{ background: i < 2 ? 'var(--navy)' : 'var(--green2)' }}
                >
                  {i + 1}
                </span>
                <span className="font-extrabold tracking-wide" style={{ color: 'var(--navy)' }}>{s.k}</span>
              </div>
              <p className="mt-3 text-sm" style={{ color: 'var(--mute)' }}>{s.d}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ROI band */}
      <section style={{ background: 'linear-gradient(90deg, var(--navy), var(--navy2))' }}>
        <div className="container py-12">
          <Eyebrow light>The economics</Eyebrow>
          <div className="mt-5 grid sm:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-black" style={{ color: '#9fe7bb' }}>~10%</div>
              <div className="mt-1 text-sm" style={{ color: '#cfe0f5' }}>of the benefit, invested to build the system</div>
            </div>
            <div>
              <div className="text-4xl font-black" style={{ color: '#9fe7bb' }}>25–40%</div>
              <div className="mt-1 text-sm" style={{ color: '#cfe0f5' }}>typical improvement on the targeted metric</div>
            </div>
            <div>
              <div className="text-4xl font-black" style={{ color: '#9cc8ff' }}>2–4×</div>
              <div className="mt-1 text-sm" style={{ color: '#cfe0f5' }}>faster than improving by headcount alone</div>
            </div>
          </div>
          <Footnote>
            <span style={{ color: '#9fb0c6' }}>
              Figures illustrative — calibrated to each engagement during the Kaizen baseline, not guaranteed.
            </span>
          </Footnote>
        </div>
      </section>

      {/* Industries */}
      <Section alt eyebrow="Where we work" title="Five industries, one method">
        <div className="flex flex-wrap gap-2">
          <Chip tone="blue">Hotels &amp; Resorts</Chip>
          <Chip tone="green">Tourism &amp; Experiences</Chip>
          <Chip tone="blue">Food &amp; Beverage</Chip>
          <Chip tone="green">Banking</Chip>
          <Chip tone="blue">Data Analytics</Chip>
          <Chip tone="ghost">Safety · Quality · Delivery · Cost</Chip>
        </div>
        <p className="mt-4 max-w-3xl text-sm" style={{ color: 'var(--mute)' }}>
          See the industry matrix and the five flagship, high-value systems most operators can&apos;t
          crack alone on the <a href="/ai-hospitality" style={{ color: 'var(--blue)', fontWeight: 700 }}>AI for Hospitality</a> page.
        </p>
      </Section>

      <CTABand />
    </article>
  )
}
