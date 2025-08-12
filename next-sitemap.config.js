/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://moi.salon',
  generateRobotsTxt: false,
  transform: async (config, path) => {
    const str = path.replace('/dynamic', '')
    return {
      loc: str,
    }
  },
}

module.exports = config
