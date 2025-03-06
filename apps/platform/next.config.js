/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dalla-dev.fra1.cdn.digitaloceanspaces.com',
      },
    ],
  },
}

export default nextConfig
