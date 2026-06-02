import React from 'react'
import { MessageCircle } from 'lucide-react'

interface WhatsAppCTAProps {
  whatsappNumber?: string | null
}

// WhatsApp call-to-action button component
export const WhatsAppCTA: React.FC<WhatsAppCTAProps> = ({ whatsappNumber }) => {
  if (!whatsappNumber) return null

  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  )
}
