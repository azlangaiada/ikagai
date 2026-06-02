import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { HelmetProvider, HelmetServerState } from 'react-helmet-async'
import { App } from './App'

export interface RenderResult {
  html: string
  helmet: HelmetServerState
}

export function render(url: string, context: { draft?: boolean; data?: Record<string, any> }): RenderResult {
  const helmetContext: { helmet?: HelmetServerState } = {}

  const html = renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App initialData={context.data} draft={context.draft} />
        </StaticRouter>
      </HelmetProvider>
    </React.StrictMode>,
  )

  return { html, helmet: helmetContext.helmet! }
}
