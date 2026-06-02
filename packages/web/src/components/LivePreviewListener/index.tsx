import { getPayloadURL } from '@/utilities/getURL'
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import React from 'react'

export const LivePreviewListener: React.FC = () => {
  return <PayloadLivePreview refresh={() => window.location.reload()} serverURL={getPayloadURL()} />
}
