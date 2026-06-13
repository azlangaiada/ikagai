'use client'
import React, { useState } from 'react'
import { Bot, Send, X, Sparkles, RotateCcw } from 'lucide-react'

const MAX = 150

// Floating "AI" button + a stateless single-turn "Ask Us" chat panel.
// One question, one answer — then reset. No history is kept.
export const AskUs: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [answer, setAnswer] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const reset = () => {
    setQ('')
    setAnswer(null)
    setError(null)
    setLoading(false)
  }

  const ask = async () => {
    const question = q.trim()
    if (!question || loading) return
    setLoading(true)
    setError(null)
    setAnswer(null)
    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      })
      const data = await res.json()
      if (!res.ok) setError(data?.error || 'Something went wrong.')
      else setAnswer(data.answer)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating AI button — sits between the WhatsApp and Back-to-top buttons */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-[10rem] right-6 z-50 p-4 rounded-full shadow-lg text-white flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
        style={{ background: 'linear-gradient(135deg, var(--navy), var(--green2))' }}
        aria-label="Ask Us — AI assistant"
      >
        {open ? <X size={26} /> : <Bot size={26} />}
      </button>

      {open && (
        <div
          className="fixed bottom-6 right-6 z-50 w-[92vw] max-w-[360px] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          style={{ background: '#fff', border: '1px solid var(--line)', maxHeight: '78vh' }}
        >
          {/* header */}
          <div className="px-4 py-3 flex items-center justify-between text-white"
            style={{ background: 'linear-gradient(135deg, var(--navy), var(--navy2))' }}>
            <div className="flex items-center gap-2">
              <Sparkles size={18} style={{ color: '#9fe7bb' }} />
              <span className="font-extrabold">Ask Us</span>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="hover:opacity-80">
              <X size={18} />
            </button>
          </div>

          {/* body */}
          <div className="p-4 overflow-y-auto" style={{ background: '#F4F7FB' }}>
            {!answer && !error && !loading && (
              <p className="text-sm" style={{ color: 'var(--mute)' }}>
                Hi! Ask me about <b style={{ color: 'var(--navy)' }}>ikigai</b>, Kaizen, Lean, Six Sigma,
                or AI for Hotels, Tourism &amp; F&amp;B. Keep it short — one question at a time.
              </p>
            )}
            {loading && <p className="text-sm" style={{ color: 'var(--mute)' }}>Thinking…</p>}
            {error && (
              <div className="rounded-lg p-3 text-sm" style={{ background: '#fdeceb', border: '1px solid #f3c9c4', color: '#a4332a' }}>
                {error}
              </div>
            )}
            {answer && (
              <div className="rounded-lg p-3 text-sm" style={{ background: '#fff', border: '1px solid var(--line)', color: 'var(--ink)' }}>
                {answer}
              </div>
            )}
            {(answer || error) && (
              <button onClick={reset}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold" style={{ color: 'var(--blue)' }}>
                <RotateCcw size={14} /> Ask another question
              </button>
            )}
          </div>

          {/* input */}
          {!answer && (
            <div className="p-3 border-t" style={{ borderColor: 'var(--line)' }}>
              <div className="flex items-end gap-2">
                <textarea
                  value={q}
                  maxLength={MAX}
                  rows={2}
                  disabled={loading}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      ask()
                    }
                  }}
                  placeholder="Type your question…"
                  className="flex-1 resize-none rounded-lg px-3 py-2 text-sm outline-none"
                  style={{ border: '1px solid var(--line)', color: 'var(--ink)' }}
                />
                <button
                  onClick={ask}
                  disabled={loading || !q.trim()}
                  className="p-2.5 rounded-lg text-white disabled:opacity-40"
                  style={{ background: 'var(--green2)' }}
                  aria-label="Send"
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="mt-1 text-right text-[11px]" style={{ color: 'var(--mute)' }}>{q.length}/{MAX}</div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
