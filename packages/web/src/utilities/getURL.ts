import canUseDOM from './canUseDOM'

export const getServerSideURL = () => {
  return process.env.VITE_SITE_URL || process.env.SITE_URL || 'http://localhost:3004'
}

export const getPayloadURL = () => {
  return process.env.PAYLOAD_URL || import.meta.env?.VITE_PAYLOAD_URL || 'http://localhost:4004'
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port
    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }
  return getServerSideURL()
}
