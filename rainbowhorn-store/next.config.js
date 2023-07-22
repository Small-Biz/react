/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'm.media-amazon.com',
          port: '',
          pathname: '/**',
        },
        {
            protocol: 'https',
            hostname: 'fieldfolio-production-images.s3.amazonaws.com',
            port: '',
            pathname: '/**',
          }
      ],
    },
  }

module.exports = nextConfig