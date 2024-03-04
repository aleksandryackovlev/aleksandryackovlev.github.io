module.exports = {
  siteMetadata: {
    title: `Personal blog by Alex Yackovlev`,
    description: `Thoughts on code`,
    author: {
      name: `Alex Yackovlev`,
      position: `Frontend developer`,
      company: `VK`,
      email: `alex@yackovlev.com`,
      social: [
        {
          icon: `github`,
          link: `https://github.com/aleksandryackovlev`,
        },
        {
          icon: `linkedin`,
          link: `https://linkedin.com/aleksandryackovlev`,
        },
      ],
    },
    siteUrl: `https://yackovlev.com`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        serialize: (page, { resolvePagePath }) => {
          return {
            url: resolvePagePath(page),
            changefreq: page.path.includes('tag/') ? `weekly` : `monthly`,
            priority: page.path.includes('tag/') ? 0.5 : 0.7,
          };
        },
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', disallow: '/' }],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              inlineCodeMarker: `÷`,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `alex-yackovlev-blog`,
        short_name: `yackovlev`,
        start_url: `/`,
        background_color: `#333333`,
        theme_color: `#333333`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
