import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../layout';
import SEO from '../seo';

import Typography from '../ui/typography';
import Box from '../ui/box';
import Link from '../ui/link';
import Button from '../ui/button';
import { Row, Column } from '../ui/grid';
import Hidden from '../ui/hidden';

function BlogList({
  pageContext: {
    title: pageTitle,
    posts,
    pagination: { current, total },
  },
}) {
  return (
    <Layout>
      <SEO title={pageTitle || 'Thoughts on code'} />
      {pageTitle && (
        <Typography
          marginBottom="l"
          isBold
          component="title"
          fontSize="l"
          level={1}
        >
          {pageTitle}
        </Typography>
      )}
      <Box paddingBottom="xxl">
        {posts.map(({ id, title, date, description, tags }, index) => (
          <Box
            key={id}
            paddingTop={index ? 'm' : 'none'}
            paddingBottom="l"
            borderBottom="primary"
          >
            <Typography component="title">
              <Link type="secondary" to={`/${id}`}>
                {title}
              </Link>
            </Typography>
            <Typography color="secondary">Posted on {date}</Typography>
            <Typography component="paragraph" marginBottom="m">
              {description}
            </Typography>
            <Row justify="spaceBetween">
              <Column xs="auto">
                <Hidden xs>
                  {tags.map((tag) => (
                    <Button type="secondary" key={tag} href={`/tag/${tag}`}>
                      {tag}
                    </Button>
                  ))}
                </Hidden>
              </Column>
              <Column xs="auto">
                <Button href={`/${id}`}>Read</Button>
              </Column>
            </Row>
          </Box>
        ))}
      </Box>
      {total > 1 && (
        <Box paddingBottom="xxl">
          <Typography align="center">
            {[...Array(total - 1).keys()].map((page) => (
              <Button
                disabled={current === page + 1}
                type={current === page + 1 ? 'secondary' : 'primary'}
                href={`/${page ? page + 1 : ''}`}
              >
                {page + 1}
              </Button>
            ))}
          </Typography>
        </Box>
      )}
    </Layout>
  );
}

BlogList.propTypes = {
  pageContext: PropTypes.shape({
    title: PropTypes.string,
    posts: PropTypes.arrayOf(PropTypes.object),
    pagination: PropTypes.shape({
      current: PropTypes.number,
      total: PropTypes.number,
    }),
  }).isRequired,
};

export default BlogList;
