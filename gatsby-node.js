const path = require('path');

exports.createPages = async ({
  actions: { createPage },
  graphql,
  reporter,
}) => {
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            html
            timeToRead
            frontmatter {
              id
              date
              title
              description
              tags
              metaDescription
            }
          }
          next {
            frontmatter {
              id
              title
            }
          }
          previous {
            frontmatter {
              id
              title
            }
          }
        }
        group(field: frontmatter___tags, limit: 1000) {
          fieldValue
          edges {
            node {
              frontmatter {
                id
                date
                title
                description
                tags
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const posts = await Promise.all(
    result.data.allMarkdownRemark.edges.map(
      async ({ node: { html, frontmatter }, next, previous }) => {
        const relatedPosts = await graphql(`
        {
          allMarkdownRemark(filter: {frontmatter: {tags: {in: [${frontmatter.tags.reduce(
            (res, tag) => `${res}, "${tag}"`,
            ''
          )}"Cucumber"]}, id: {ne: "${
            frontmatter.id
          }"}}}, limit: 3, sort: {fields: frontmatter___date}) {
            edges {
              node {
                timeToRead
                frontmatter {
                  id
                  date
                  title
                  description
                }
              }
            }
          }
        }
      `);

        return {
          html,
          ...frontmatter,
          pagination: {
            previous,
            next,
          },
          relatedPosts: relatedPosts.data.allMarkdownRemark.edges,
        };
      }
    )
  );

  const count = posts.length;
  const postsPerPage = 10;

  for (let page = 0; page * postsPerPage < count; page += 1) {
    const nextPageCount = (page + 1) * postsPerPage;
    createPage({
      path: `/${page ? page + 1 : ''}`,
      component: path.resolve(__dirname, 'src/templates/blog-list.js'),
      context: {
        posts: posts.slice(
          page * postsPerPage,
          nextPageCount > count ? count : nextPageCount
        ),
        pagination: {
          current: page + 1,
          total: Math.ceil(count / postsPerPage),
        },
      },
    });
  }

  const tagPosts = result.data.allMarkdownRemark.group;

  tagPosts.forEach(({ fieldValue, edges }) => {
    createPage({
      path: `/tag/${fieldValue}`,
      component: path.resolve(__dirname, 'src/templates/blog-list.js'),
      context: {
        posts: edges.map(({ node: { frontmatter } }) => frontmatter),
        title: `Posts on tag: ${fieldValue.toLowerCase()}`,
        pagination: {
          current: 1,
          total: 1,
        },
      },
    });
  });

  posts.forEach((post) => {
    createPage({
      path: `/${post.id}`,
      component: path.resolve(__dirname, 'src/templates/blog-item.js'),
      context: post,
    });
  });
};
