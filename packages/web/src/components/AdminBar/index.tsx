import type { PayloadAdminBarProps, PayloadMeUser } from '@payloadcms/admin-bar'
import { cn } from '@/utilities/ui'
import { useLocation, useNavigate } from 'react-router-dom'
import { PayloadAdminBar } from '@payloadcms/admin-bar'
import React, { useState } from 'react'
import { getClientSideURL, getPayloadURL } from '@/utilities/getURL'

const collectionLabels = {
  pages: { plural: 'Pages', singular: 'Page' },
  posts: { plural: 'Posts', singular: 'Post' },
  projects: { plural: 'Projects', singular: 'Project' },
}

export const AdminBar: React.FC<{ adminBarProps?: PayloadAdminBarProps }> = (props) => {
  const { adminBarProps } = props || {}
  const location = useLocation()
  const segments = location.pathname.split('/').filter(Boolean)
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const collection = (collectionLabels[segments?.[0] as keyof typeof collectionLabels] ? segments[0] : 'pages') as keyof typeof collectionLabels

  const onAuthChange = React.useCallback((user: PayloadMeUser) => { setShow(Boolean(user?.id)) }, [])

  return (
    <div className={cn('admin-bar', 'py-2 bg-black text-white', { block: show, hidden: !show })}>
      <div className="container">
        <PayloadAdminBar
          {...adminBarProps}
          className="py-2 text-white"
          classNames={{ controls: 'font-medium text-white', logo: 'text-white', user: 'text-white' }}
          cmsURL={getPayloadURL()}
          collectionSlug={collection}
          collectionLabels={{ plural: collectionLabels[collection]?.plural || 'Pages', singular: collectionLabels[collection]?.singular || 'Page' }}
          logo={<span>Dashboard</span>}
          onAuthChange={onAuthChange}
          onPreviewExit={() => { fetch('/api/exit-preview').then(() => { navigate('/'); window.location.reload() }) }}
          style={{ backgroundColor: 'transparent', padding: 0, position: 'relative', zIndex: 'unset' }}
        />
      </div>
    </div>
  )
}
