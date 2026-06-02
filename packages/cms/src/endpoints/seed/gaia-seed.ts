import type { Payload, PayloadRequest } from 'payload'

// Helper to create properly versioned Lexical rich text
const richText = (children: any[]) => ({
  root: {
    type: 'root',
    children,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

const paragraph = (text: string) => ({
  type: 'paragraph',
  children: [{ type: 'text', text, version: 1, detail: 0, format: 0, mode: 'normal' as const, style: '' }],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  textFormat: 0,
  version: 1,
})

const heading = (text: string, tag: 'h1' | 'h2' | 'h3' = 'h1') => ({
  type: 'heading',
  tag,
  children: [{ type: 'text', text, version: 1, detail: 0, format: 0, mode: 'normal' as const, style: '' }],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  version: 1,
})

export const seedGaia = async ({ payload, req }: { payload: Payload; req: PayloadRequest }) => {
  payload.logger.info('Seeding Gaia Digital Agency data...')

  // 1. Create Media
  const media = await payload.find({
    collection: 'media',
    limit: 1,
  })
  const mediaId = media.docs[0]?.id

  // 2. Create Departments
  const deptNames = [
    'Branding',
    'Design',
    'Marketing',
    'Ad & SEO',
    'Website',
    'Social Media',
    'Content Creation',
    'Consultation',
    'Administration',
  ]
  const depts = []
  for (const name of deptNames) {
    const dept = await payload.create({
      collection: 'departments',
      context: { disableRevalidate: true },
      data: {
        name,
        description: `Our ${name} department specializes in premium digital solutions.`,
      },
    })
    depts.push(dept)
  }

  // 3. Create Services (with individual page content)
  const serviceData = [
    {
      title: 'Branding',
      slug: 'branding',
      description: 'Professional branding services to define and elevate your brand identity.',
      pageContent: 'We create cohesive brand identities that resonate with your target audience. From logo design to brand guidelines, our team ensures every touchpoint communicates your unique value proposition.',
    },
    {
      title: 'Design',
      slug: 'design',
      description: 'Creative design solutions that bring your vision to life across all media.',
      pageContent: 'Our design team crafts stunning visuals for digital and print media. We blend aesthetics with functionality to create designs that captivate audiences and drive results.',
    },
    {
      title: 'Marketing',
      slug: 'marketing',
      description: 'Strategic marketing campaigns that drive growth and engagement.',
      pageContent: 'We develop data-driven marketing strategies that connect with your audience at every stage of the customer journey. From market research to campaign execution, we deliver measurable results.',
    },
    {
      title: 'Ad & SEO',
      slug: 'ad-seo',
      description: 'Performance advertising and SEO to maximize your online visibility.',
      pageContent: 'Our advertising and SEO experts optimize your digital presence for maximum visibility and conversions. We combine paid media strategies with organic search optimization for sustainable growth.',
    },
    {
      title: 'Website',
      slug: 'website',
      description: 'Custom website development built for performance and user experience.',
      pageContent: 'We build modern, responsive websites that deliver exceptional user experiences. From e-commerce platforms to corporate sites, our development team creates solutions that scale with your business.',
    },
    {
      title: 'Social Media',
      slug: 'social-media',
      description: 'Social media management and strategy to grow your online community.',
      pageContent: 'We manage and grow your social media presence across all major platforms. Our strategies focus on community building, content creation, and engagement to strengthen your brand online.',
    },
    {
      title: 'Content Creation',
      slug: 'content-creation',
      description: 'High-quality content that tells your story and engages your audience.',
      pageContent: 'From video production to copywriting, we create compelling content that tells your brand story. Our content team produces materials that educate, entertain, and inspire action.',
    },
    {
      title: 'Consultation',
      slug: 'consultation',
      description: 'Expert digital consultation to guide your business transformation.',
      pageContent: 'Our consultants bring years of industry experience to help you navigate the digital landscape. We provide actionable insights and strategic roadmaps tailored to your business goals.',
    },
    {
      title: 'Strategy',
      slug: 'strategy',
      description: 'Comprehensive digital strategy to align your business goals with execution.',
      pageContent: 'We develop holistic digital strategies that align your business objectives with market opportunities. Our strategic planning process ensures every initiative contributes to your long-term success.',
    },
  ]
  for (const svc of serviceData) {
    await payload.create({
      collection: 'services',
      context: { disableRevalidate: true },
      data: {
        title: svc.title,
        slug: svc.slug,
        description: svc.description,
        image: mediaId,
        _status: 'published',
        hero: {
          type: 'mediumImpact',
          richText: richText([heading(svc.title)]),
          media: mediaId,
        },
        layout: [
          {
            blockType: 'content',
            columns: [
              {
                size: 'full',
                richText: richText([
                  heading(svc.title, 'h2'),
                  paragraph(svc.pageContent),
                ]),
              },
            ],
          },
        ],
      },
    })
  }

  // 4. Create Portfolio
  for (let i = 1; i <= 5; i++) {
    await payload.create({
      collection: 'portfolio',
      context: { disableRevalidate: true },
      data: {
        title: `Project ${i}`,
        description: `A showcase of our premium work for Client ${i}, focused on digital excellence.`,
        image: mediaId,
      },
    })
  }

  // 5. Create About Items
  for (let i = 1; i <= 5; i++) {
    await payload.create({
      collection: 'about-items',
      context: { disableRevalidate: true },
      data: {
        title: `Our Value ${i}`,
        description: `We believe in digital innovation and providing value ${i} to our clients globally.`,
        image: mediaId,
      },
    })
  }

  // 6. Create Team Members
  const roles = ['CEO', 'Creative Director', 'Lead Developer', 'Marketing Head', 'Content Manager']
  for (let i = 0; i < 5; i++) {
    await payload.create({
      collection: 'team',
      context: { disableRevalidate: true },
      data: {
        name: `Team Member ${i + 1}`,
        role: roles[i],
        image: mediaId,
        department: depts[i % depts.length].id,
      },
    })
  }

  // 7. Create Forms
  const consultationForm = await payload.create({
    collection: 'forms',
    context: { disableRevalidate: true },
    data: {
      title: 'Consultation Form',
      fields: [
        { name: 'name', label: 'Name', required: true, blockType: 'text' as const },
        { name: 'email', label: 'Email', required: true, blockType: 'email' as const },
        { name: 'message', label: 'Message', required: true, blockType: 'textarea' as const },
        { siteKey: '10000000-ffff-ffff-ffff-000000000001', secretKey: '0x0000000000000000000000000000000000000000', blockType: 'hCaptcha' as const },
      ],
      confirmationType: 'message' as const,
      confirmationMessage: richText([paragraph('Thank you for your inquiry!')]),
      submitButtonLabel: 'Submit',
    },
  })

  const careerForm = await payload.create({
    collection: 'forms',
    context: { disableRevalidate: true },
    data: {
      title: 'Career Application Form',
      fields: [
        { name: 'name', label: 'Name', required: true, blockType: 'text' as const },
        { name: 'email', label: 'Email', required: true, blockType: 'email' as const },
        {
          name: 'department',
          label: 'Department',
          required: true,
          blockType: 'select' as const,
          options: deptNames.map(name => ({ label: name, value: name.toLowerCase() })),
        },
        { name: 'resume', label: 'Resume (PDF)', required: true, blockType: 'file' as const },
        { name: 'message', label: 'Message', required: true, blockType: 'textarea' as const },
      ],
      confirmationType: 'message' as const,
      confirmationMessage: richText([paragraph('Application received! We will contact you soon.')]),
      submitButtonLabel: 'Apply Now',
    },
  })

  // 8. Create Pages
  await payload.create({
    collection: 'pages',
    context: { disableRevalidate: true },
    data: {
      title: 'Home',
      slug: 'home',
      _status: 'published',
      hero: {
        type: 'highImpact',
        richText: richText([heading('Elevate Your Digital Brand')]),
        media: mediaId,
      },
      layout: [
        {
          blockType: 'contentMedia',
          mediaPosition: 'right',
          richText: richText([paragraph('Welcome to Gaia Digital Agency. We transform digital ideas into premium experiences.')]),
          media: mediaId,
        },
        {
          blockType: 'contentMedia',
          mediaPosition: 'left',
          richText: richText([paragraph('Our features include cutting-edge design and strategic marketing solutions.')]),
          media: mediaId,
        },
        {
          blockType: 'contentMedia',
          mediaPosition: 'right',
          richText: richText([paragraph('Our writing team produces high-quality content that resonates with your audience and drives engagement.')]),
          media: mediaId,
        },
      ],
    },
  })

  await payload.create({
    collection: 'pages',
    context: { disableRevalidate: true },
    data: {
      title: 'Services',
      slug: 'services',
      _status: 'published',
      hero: {
        type: 'mediumImpact',
        richText: richText([heading('Services Hero Image Here')]),
        media: mediaId,
      },
      layout: [
        {
          blockType: 'servicesBlock',
          title: 'Services Placeholder Title',
          description:
            'Services Placeholder Text — replace this with a short overview of the services you offer.',
        },
        {
          blockType: 'formBlock',
          enableIntro: true,
          introContent: richText([heading('Free Consultation', 'h2')]),
          form: consultationForm.id,
        },
      ],
    },
  })

  await payload.create({
    collection: 'pages',
    context: { disableRevalidate: true },
    data: {
      title: 'Portfolio',
      slug: 'portfolio',
      _status: 'published',
      hero: {
        type: 'mediumImpact',
        richText: richText([heading('Portfolio Hero Image Here')]),
        media: mediaId,
      },
      layout: [
        {
          blockType: 'portfolioBlock',
          title: 'Portfolio Placeholder Title',
          description:
            'Portfolio Placeholder Text — replace this with a short description of your featured projects.',
        },
      ],
    },
  })

  await payload.create({
    collection: 'pages',
    context: { disableRevalidate: true },
    data: {
      title: 'About Us',
      slug: 'about',
      _status: 'published',
      hero: {
        type: 'mediumImpact',
        richText: richText([heading('About Hero Image Here')]),
        media: mediaId,
      },
      layout: [
        {
          blockType: 'aboutBlock',
          title: 'About Placeholder Title',
          description:
            'About Placeholder Text — replace this with your own company story, mission, and team highlights.',
        },
      ],
    },
  })

  await payload.create({
    collection: 'pages',
    context: { disableRevalidate: true },
    data: {
      title: 'Careers',
      slug: 'careers',
      _status: 'published',
      hero: {
        type: 'mediumImpact',
        richText: richText([heading('Careers Hero Image Here')]),
        media: mediaId,
      },
      layout: [
        {
          blockType: 'careerBlock',
          title: 'Careers Placeholder Title',
          description:
            'Careers Placeholder Text — replace this with a short pitch for why people should join your team.',
          form: careerForm.id,
        },
      ],
    },
  })

  await payload.create({
    collection: 'pages',
    context: { disableRevalidate: true },
    data: {
      title: 'Contact Us',
      slug: 'contact',
      _status: 'published',
      hero: {
        type: 'mediumImpact',
        richText: richText([heading('Contact Hero Image Here')]),
        media: mediaId,
      },
      layout: [
        {
          blockType: 'formBlock',
          enableIntro: true,
          introContent: richText([heading('Contact Form', 'h2')]),
          form: consultationForm.id,
        },
      ],
    },
  })

  await payload.create({
    collection: 'pages',
    context: { disableRevalidate: true },
    data: {
      title: 'Blog',
      slug: 'blog',
      _status: 'published',
      hero: {
        type: 'mediumImpact',
        richText: richText([heading('Blog Hero Image Here')]),
        media: mediaId,
      },
      layout: [
        {
          blockType: 'archive',
          title: 'Blog Placeholder Title',
          description:
            'Blog Placeholder Text — replace this with a short intro. Articles published below will render as cards.',
          populateBy: 'collection',
          limit: 10,
        },
      ],
    },
  })

  // Placeholder blog post so /blog renders something out of the box.
  const existingPosts = await payload.find({ collection: 'posts', limit: 1 })
  if (existingPosts.totalDocs === 0) {
    await payload.create({
      collection: 'posts',
      context: { disableRevalidate: true },
      data: {
        title: 'Blog Placeholder Title',
        slug: 'blog-placeholder',
        _status: 'published',
        heroImage: mediaId,
        content: richText([
          heading('Blog Placeholder Title', 'h2'),
          paragraph(
            'Blog Placeholder Text — replace this with your real article content once the project has been cloned from the template.',
          ),
        ]),
        meta: {
          title: 'Blog Placeholder Title',
          description: 'Blog placeholder description — replace with real SEO copy.',
        },
      },
    })
  }

  await payload.create({
    collection: 'pages',
    context: { disableRevalidate: true },
    data: {
      title: 'Coming Soon',
      slug: 'placeholder',
      _status: 'published',
      hero: {
        type: 'lowImpact',
        richText: richText([heading('Placeholder Page')]),
      },
      layout: [
        {
          blockType: 'content',
          columns: [
            {
              size: 'full',
              richText: richText([paragraph('This page is a placeholder for future content.')]),
            },
          ],
        },
      ],
    },
  })

  // 9. Update Globals
  await payload.updateGlobal({
    slug: 'settings',
    context: { disableRevalidate: true },
    data: {
      whatsappNumber: '+5281337568977',
      contactEmail: 'contact@gaiada.com',
      socialLinks: [
        { platform: 'facebook', url: 'https://www.facebook.com/gaiadigitalagency' },
        { platform: 'instagram', url: 'http://34.124.244.233/seosample/' },
        { platform: 'linkedin', url: 'https://www.linkedin.com/company/gaia-digital-agency/' },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'header',
    context: { disableRevalidate: true },
    data: {
      navItems: [
        {
          link: { type: 'custom', url: '/services', label: 'Services' },
          subItems: serviceData.map((svc) => ({
            link: { type: 'custom' as const, url: `/services/${svc.slug}`, label: svc.title },
          })),
        },
        { link: { type: 'custom', url: '/portfolio', label: 'Portfolio' } },
        { link: { type: 'custom', url: '/about', label: 'About' } },
        { link: { type: 'custom', url: '/careers', label: 'Careers' } },
        { link: { type: 'custom', url: '/blog', label: 'Blog' } },
        { link: { type: 'custom', url: '/contact', label: 'Contact' } },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    context: { disableRevalidate: true },
    data: {
      copyright: 'Copyright @2026',
      developedBy: 'Developed by Gaia Digital Agency',
      visitorCount: 1250,
      navItems: [
        { link: { type: 'custom', url: '/services', label: 'Services' } },
        { link: { type: 'custom', url: '/portfolio', label: 'Portfolio' } },
        { link: { type: 'custom', url: '/about', label: 'About' } },
        { link: { type: 'custom', url: '/careers', label: 'Careers' } },
        { link: { type: 'custom', url: '/blog', label: 'Blog' } },
        { link: { type: 'custom', url: '/contact', label: 'Contact' } },
      ],
    },
  })

  payload.logger.info('Gaia Digital Agency seeding completed successfully!')
}
