/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: '/docs-static',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dalla-dev.fra1.cdn.digitaloceanspaces.com',
      },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        // This rewrite is necessary to support assetPrefix only in Next 14 and below.
        // It is not necessary in Next 15.
        {
          source: '/docs-static/_next/:path*',
          destination: '/_next/:path*',
        },
      ],
    }
  },
}

export default nextConfig
