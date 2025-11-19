/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export for production GitHub Pages deployment
  // For development and backend-connected deployments, this should be commented out
  output: process.env.STATIC_EXPORT === 'true' ? 'export' : undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' && process.env.STATIC_EXPORT === 'true' ? '/Test' : '',
  assetPrefix: process.env.NODE_ENV === 'production' && process.env.STATIC_EXPORT === 'true' ? '/Test' : '',
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  },
}

module.exports = nextConfig
