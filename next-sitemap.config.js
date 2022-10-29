/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_HOME_URL || 'https://younggeun0.dev',
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
        {
            userAgent: '*',
            allow: '/',
        },
        ],
    },
}