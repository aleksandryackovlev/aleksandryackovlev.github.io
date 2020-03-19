module.exports = {
  siteMetadata: {
    title: `Personal blog by Alex Yackovlev`,
    description: `Thoughts on code`,
    author: {
      name: `Alex Yackovlev`,
      position: `Frontend developer`,
      company: `Mail.ru Group`,
      email: `aleksandryackovlev@yandex.ru`,
      social: [
        {
          icon: `github`,
          link: `https://github.com/aleksandryackovlev`,
        },
        {
          icon: `twitter`,
          link: `https://twitter.com/_yackovlev`,
        },
        {
          icon: `linkedin`,
          link: `https://linkedin.com/aleksandryackovlev`,
        },
      ],
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
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
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
