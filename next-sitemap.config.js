/** @type {import('next-sitemap').IConfig} */
const dev = process.env.NEXT_PUBLIC_ENV !== "production";
const config = {
  siteUrl: dev ? "https://redesign.moi.salon/" : "https://moi.salon/",
  generateRobotsTxt: dev ? true : false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: "/",
      },
      {
        userAgent: "undefined",
        disallow: ["/dynamic"],
      },
    ],
  },
  transform: async (config, path) => {
    const str = path.replace("/dynamic", "");
    return {
      loc: str,
    };
  },
};

module.exports = config;
