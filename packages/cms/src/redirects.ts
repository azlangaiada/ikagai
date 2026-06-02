import type { NextConfig } from 'next'

// Configures Next.js redirects to handle incompatible browsers
export const redirects: NextConfig['redirects'] = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header' as const,
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  const offeringsRedirect = {
    source: '/offerings',
    destination: '/services',
    permanent: true,
  }

  return [internetExplorerRedirect, offeringsRedirect]
}
