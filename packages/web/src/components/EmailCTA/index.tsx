'use client'
import React, { useState } from 'react'
import { Mail, X, Send } from 'lucide-react'

export const EmailCTA: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; message?: string }>({})

  const reset = () => {
    setName('')
    setEmail('')
    setMessage('')
    setSuccess(false)
    setError(null)
    setFieldErrors({})
  }

  const validate = () => {
    const errs: { name?: string; email?: string; message?: string } = {}
    if (!name.trim()) errs.name = 'Name is required'
    if (!email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email'
    if (!message.trim()) errs.message = 'Message is required'
    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  const send = async () => {
    if (!validate()) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      const data = await res.json()
      if (!res.ok) setError(data?.error || 'Something went wrong.')
      else setSuccess(true)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-[5.75rem] right-6 z-50 flex flex-col items-end gap-2">
      {open && (
        <div
          className="flex flex-col rounded-2xl shadow-2xl overflow-hidden"
          style={{ background: '#fff', border: '1px solid var(--line)', width: 300 }}
        >
          {/* Header */}
          <div className="px-4 py-3 flex items-center justify-between text-white"
            style={{ background: 'linear-gradient(135deg, var(--navy), var(--navy2))' }}>
            <span className="font-extrabold text-sm">Send us a message</span>
            <button onClick={() => { setOpen(false); reset() }} aria-label="Close" className="hover:opacity-80">
              <X size={16} />
            </button>
          </div>

          <div className="p-4 flex flex-col gap-3">
            {success ? (
              <div className="text-sm text-center py-4" style={{ color: 'var(--navy)' }}>
                <p className="font-bold text-base mb-1">Message sent!</p>
                <p style={{ color: 'var(--mute)' }}>We'll get back to you soon.</p>
                <button onClick={reset} className="mt-3 text-xs font-bold" style={{ color: 'var(--blue)' }}>
                  Send another
                </button>
              </div>
            ) : (
              <>
                {error && (
                  <p className="text-xs rounded-lg px-3 py-2" style={{ background: '#fdeceb', color: '#a4332a' }}>{error}</p>
                )}
                <div>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={e => { setName(e.target.value); setFieldErrors(f => ({ ...f, name: undefined })) }}
                    className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                    style={{ border: `1px solid ${fieldErrors.name ? '#e53e3e' : 'var(--line)'}`, color: 'var(--ink)' }}
                  />
                  {fieldErrors.name && <p className="text-xs mt-1" style={{ color: '#e53e3e' }}>{fieldErrors.name}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setFieldErrors(f => ({ ...f, email: undefined })) }}
                    className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                    style={{ border: `1px solid ${fieldErrors.email ? '#e53e3e' : 'var(--line)'}`, color: 'var(--ink)' }}
                  />
                  {fieldErrors.email && <p className="text-xs mt-1" style={{ color: '#e53e3e' }}>{fieldErrors.email}</p>}
                </div>
                <div>
                  <textarea
                    placeholder="Your message"
                    value={message}
                    onChange={e => { setMessage(e.target.value); setFieldErrors(f => ({ ...f, message: undefined })) }}
                    rows={3}
                    className="w-full resize-none rounded-lg px-3 py-2 text-sm outline-none"
                    style={{ border: `1px solid ${fieldErrors.message ? '#e53e3e' : 'var(--line)'}`, color: 'var(--ink)' }}
                  />
                  {fieldErrors.message && <p className="text-xs mt-1" style={{ color: '#e53e3e' }}>{fieldErrors.message}</p>}
                </div>
                <button
                  onClick={send}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-sm font-bold text-white disabled:opacity-40 hover:opacity-80 transition-opacity"
                  style={{ background: 'var(--navy)' }}
                >
                  <Send size={15} />
                  {loading ? 'Sending…' : 'Send'}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(o => !o)}
        className="p-4 rounded-full shadow-lg text-white flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
        style={{ backgroundColor: 'var(--blue)' }}
        aria-label="Email us"
      >
        <Mail size={26} />
      </button>
    </div>
  )
}
