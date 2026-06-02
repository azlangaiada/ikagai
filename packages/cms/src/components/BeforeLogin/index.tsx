'use client'
import React, { useEffect } from 'react'

// Template defaults. Rotate these for any non-template deployment.
const TEMPLATE_EMAIL = 'admin@gaiada.com'
const TEMPLATE_PASSWORD = 'admin'

const BeforeLogin: React.FC = () => {
  useEffect(() => {
    const injectToggle = () => {
      const passwordInputs = document.querySelectorAll(
        'input[type="password"]',
      ) as NodeListOf<HTMLInputElement>

      passwordInputs.forEach((passwordInput) => {
        if (passwordInput && !passwordInput.dataset.hasToggle) {
          passwordInput.dataset.hasToggle = 'true'

          const container = (passwordInput.closest('.field-type.password') ||
            passwordInput.parentElement) as HTMLElement | null

          if (container) {
            container.style.position = 'relative'

            const toggle = document.createElement('button')
            toggle.type = 'button'
            toggle.style.position = 'absolute'
            toggle.style.right = '10px'
            toggle.style.bottom = '10px'
            toggle.style.background = 'transparent'
            toggle.style.border = 'none'
            toggle.style.cursor = 'pointer'
            toggle.style.display = 'flex'
            toggle.style.alignItems = 'center'
            toggle.style.justifyContent = 'center'
            toggle.style.zIndex = '10'
            toggle.style.padding = '5px'
            toggle.innerHTML = '👁️'
            toggle.style.color = 'var(--theme-text)'

            toggle.onclick = (e) => {
              e.preventDefault()
              e.stopPropagation()
              if (passwordInput.type === 'password') {
                passwordInput.type = 'text'
                toggle.innerHTML = '🙈'
              } else {
                passwordInput.type = 'password'
                toggle.innerHTML = '👁️'
              }
            }

            container.appendChild(toggle)
          }
        }
      })
    }

    injectToggle()
    const interval = setInterval(injectToggle, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <p>
        <b>Welcome to your dashboard!</b>
        {' This is where site admins will log in to manage your website.'}
      </p>
      <div
        style={{
          border: '1px dashed var(--theme-elevation-150, #888)',
          borderRadius: 4,
          padding: '0.75rem 1rem',
          marginTop: '0.75rem',
          background: 'var(--theme-elevation-50, rgba(0,0,0,0.03))',
          fontSize: '0.85rem',
          lineHeight: 1.5,
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
          Template default credentials
        </div>
        <div>
          <span style={{ opacity: 0.75 }}>Email:</span>{' '}
          <code>{TEMPLATE_EMAIL}</code>
        </div>
        <div>
          <span style={{ opacity: 0.75 }}>Password:</span>{' '}
          <code>{TEMPLATE_PASSWORD}</code>
        </div>
        <div style={{ opacity: 0.6, marginTop: '0.4rem', fontSize: '0.75rem' }}>
          Rotate these immediately after cloning this template for a real project.
        </div>
      </div>
    </div>
  )
}

export default BeforeLogin
