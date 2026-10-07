import type { NextConfig } from 'next'

// GitHub Pages serves this project site from /portfolio-v2/.
export const BASE_PATH = '/portfolio-v2'

const config: NextConfig = {
  output: 'export',
  basePath: BASE_PATH,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
}

export default config
