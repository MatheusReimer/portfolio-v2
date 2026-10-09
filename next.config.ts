import type { NextConfig } from 'next'

import { BASE_PATH } from './src/site'

const config: NextConfig = {
  output: 'export',
  basePath: BASE_PATH,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  // Each locale has its own root layout, so the 404 page needs its own document.
  experimental: { globalNotFound: true },
}

export default config
