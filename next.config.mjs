// next.config.mjs
/** @type {import('next').NextConfig} */
import path from 'node:path';

const allowedDomain =
  process.env.NEXT_PUBLIC_PHOTO_URL?.replace(/^https?:\/\//, '') ||
  'moisalon-backend.jetsite.ru';

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [allowedDomain],
  },
  webpack: config => {
    config.resolve.alias['~'] = path.resolve('.', '');
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  ...(process.env.CI && {
    output: 'standalone',
  }),
};

export default nextConfig;
