const path = require('node:path')

module.exports = {
  reactStrictMode: false,
  webpack: config => {
    config.resolve.alias['~'] = path.resolve(__dirname)
    return config
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  ...(process.env.CI && {
    output: "standalone"
  }),
}
