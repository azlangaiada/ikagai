import React, { useState, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Providers } from './providers'
import { Layout } from './layout/Layout'
import { PageDataContext } from './hooks/usePageData'

// Pages
import { DynamicPage } from './pages/DynamicPage'
import { PostsPage } from './pages/PostsPage'
import { PostPage } from './pages/PostPage'
import { PostsPaginatedPage } from './pages/PostsPaginatedPage'
import { ServicePage } from './pages/ServicePage'
import { SearchPage } from './pages/SearchPage'
import { NotFoundPage } from './pages/NotFoundPage'

// ikigaAI marketing pages (coded, deck-fidelity)
import { HomePage } from './pages/ikagai/HomePage'
import { KaizenAIPage } from './pages/ikagai/KaizenAIPage'
import { KaizenPage } from './pages/ikagai/KaizenPage'
import { AIHospitalityPage } from './pages/ikagai/AIHospitalityPage'
import { AboutPage } from './pages/ikagai/AboutPage'
import { ContactPage } from './pages/ikagai/ContactPage'
import { ChatPage } from './pages/ikagai/ChatPage'

interface AppProps {
  initialData?: Record<string, any>
  draft?: boolean
}

export const App: React.FC<AppProps> = ({ initialData, draft }) => {
  const [pageData, setPageData] = useState<Record<string, any> | undefined>(initialData)
  const location = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Skip the very first render — initialData from SSR is already correct
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    // Fetch fresh data for this URL on client-side navigation
    const url = location.pathname + location.search
    fetch(`/api/page-data?url=${encodeURIComponent(url)}`)
      .then(r => r.json())
      .then(data => setPageData(data))
      .catch(() => {/* keep previous data on error */})
  }, [location.pathname, location.search])

  return (
    <PageDataContext.Provider value={pageData}>
      <Providers>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/kaizen-ai" element={<KaizenAIPage />} />
            <Route path="/kaizen" element={<KaizenPage />} />
            <Route path="/ai-hospitality" element={<AIHospitalityPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/azlan" element={<ChatPage />} />
            <Route path="/sharil" element={<ChatPage />} />
            <Route path="/mubarak" element={<ChatPage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/posts/page/:pageNumber" element={<PostsPaginatedPage />} />
            <Route path="/posts/:slug" element={<PostPage />} />
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/:slug" element={<DynamicPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Providers>
    </PageDataContext.Provider>
  )
}
