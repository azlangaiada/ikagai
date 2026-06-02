import React from 'react'
import { Mail } from 'lucide-react'

interface EmailCTAProps {
  email?: string | null
}

// Floating email button — mailto link from site Settings.
export const EmailCTA: React.FC<EmailCTAProps> = ({ email }) => {
  if (!email) return null

  return (
    <a
      href={`mailto:${email}`}
      className="fixed bottom-[5.5rem] right-6 z-50 p-4 rounded-full shadow-lg text-white transition-colors flex items-center justify-center"
      style={{ backgroundColor: 'var(--blue)' }}
      aria-label="Email us"
    >
      <Mail size={26} />
    </a>
  )
}
