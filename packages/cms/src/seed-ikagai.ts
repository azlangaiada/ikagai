/**
 * Idempotent ikagAI content seed — run with:
 *   pnpm --filter @ikagai/cms seed:ikagai
 * Seeds the Header/Footer/Settings globals, the two consultant Team members,
 * and the Contact form. Safe to re-run.
 */
import { getPayload } from 'payload'
import config from './payload.config'

const NAV = [
  { label: 'Home', url: '/' },
  { label: 'Kaizen + AI', url: '/kaizen-ai' },
  { label: 'Kaizen', url: '/kaizen' },
  { label: 'AI for Hospitality', url: '/ai-hospitality' },
  { label: 'About', url: '/about' },
  { label: 'Contact', url: '/contact' },
]

const navItems = NAV.map((n) => ({
  link: { type: 'custom' as const, url: n.url, label: n.label, newTab: false },
}))

const team = [
  {
    name: 'Shahril Goh Fadhil',
    role: 'Kaizen Consulting Partner',
    order: 1,
    linkedin: 'https://www.linkedin.com/in/sharilgohfadhil/',
    bio: 'Leads the Kaizen engagement with your people — Lean / Operational Excellence, KPI and point-of-entitlement analysis, root-cause and countermeasures. Finds where value leaks and frames the solution your teams will own.',
  },
  {
    name: 'Mohd Azlan Abas',
    role: 'AI Solution Build',
    order: 2,
    linkedin: 'https://www.linkedin.com/in/mohdazlanabas/',
    bio: 'Builds and runs the AI that closes the gap. Strategy plus engineering depth in one builder — Mechanical Engineer, Certified Accountant, Software Engineer and GCP Cloud Engineer. Speaks operations, numbers and code.',
  },
]

const lexical = (text: string) => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'heading',
        tag: 'h2',
        children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

const contactForm = {
  title: 'Contact',
  confirmationType: 'message' as const,
  confirmationMessage: lexical('Thank you — your message has been sent. We will reply within one business day.'),
  submitButtonLabel: 'Send message',
  fields: [
    { name: 'full-name', blockName: 'full-name', blockType: 'text' as const, label: 'Full name', required: true, width: 100 },
    { name: 'email', blockName: 'email', blockType: 'email' as const, label: 'Email', required: true, width: 100 },
    { name: 'company', blockName: 'company', blockType: 'text' as const, label: 'Company / property', required: false, width: 100 },
    { name: 'message', blockName: 'message', blockType: 'textarea' as const, label: 'What would you like to improve?', required: true, width: 100 },
  ],
}

async function run() {
  const payload = await getPayload({ config })

  payload.logger.info('Seeding ikagAI globals…')
  await payload.updateGlobal({ slug: 'header', data: { navItems } as any })
  await payload.updateGlobal({
    slug: 'footer',
    data: { copyright: '© 2026 ikagAI', developedBy: 'Developed by Gaia Digital Agency', navItems } as any,
  })
  await payload.updateGlobal({
    slug: 'settings',
    data: {
      whatsappNumber: '+601120518366',
      contactEmail: 'azlan@net1io.com',
      contactEmail2: 'sharil.fadhil@gmail.com',
      socialLinks: [
        { platform: 'linkedin', placeholder: 'Fadhil (Kaizen)', url: 'https://www.linkedin.com/in/sharilgohfadhil/' },
        { platform: 'linkedin', placeholder: 'Azlan (AI)', url: 'https://www.linkedin.com/in/mohdazlanabas/' },
      ],
    } as any,
  })

  payload.logger.info('Seeding Team…')
  for (const m of team) {
    const existing = await payload.find({ collection: 'team', where: { name: { equals: m.name } }, limit: 1 })
    if (existing.docs[0]) {
      await payload.update({ collection: 'team', id: existing.docs[0].id, data: m as any })
    } else {
      await payload.create({ collection: 'team', data: m as any })
    }
  }

  payload.logger.info('Seeding Contact form…')
  const existingForm = await payload.find({ collection: 'forms', where: { title: { equals: 'Contact' } }, limit: 1 })
  if (existingForm.docs[0]) {
    await payload.update({ collection: 'forms', id: existingForm.docs[0].id, data: contactForm as any })
  } else {
    await payload.create({ collection: 'forms', data: contactForm as any })
  }

  payload.logger.info('✅ ikagAI seed complete.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
