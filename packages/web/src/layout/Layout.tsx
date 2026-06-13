import React from 'react'
import { usePageData } from '@/hooks/usePageData'
import { AdminBar } from '@/components/AdminBar'
import { BackToTop } from '@/components/BackToTop'
import { WhatsAppCTA } from '@/components/WhatsAppCTA'
import { EmailCTA } from '@/components/EmailCTA'
import { AskUs } from '@/components/AskUs'

// Import Header and Footer as client components
import { HeaderClient } from '@/Header/Component.client'
import { FooterClient } from '@/Footer/FooterClient'

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const data = usePageData()

  return (
    <>
      <AdminBar adminBarProps={{ preview: data?.draft }} />
      {data?.header && <HeaderClient data={data.header} />}
      {children}
      {data?.footer && <FooterClient footer={data.footer} settings={data.settings} />}
      <WhatsAppCTA whatsappNumber={data?.settings?.whatsappNumber} />
      <EmailCTA />
      <AskUs />
      <BackToTop />
    </>
  )
}
