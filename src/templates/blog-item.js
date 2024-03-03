import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight as nextIcon,
  faChevronLeft as previousIcon,
} from '@fortawesome/free-solid-svg-icons';

import Layout from '../layout';
import SEO from '../seo';

import Typography from '../ui/typography';
import Box from '../ui/box';
import Button from '../ui/button';
import Hidden from '../ui/hidden';
import Link from '../ui/link';
import { Row, Column } from '../ui/grid';

/* eslint-disable react/no-danger */
function BlogItem({
  pageContext: {
    html,
    metaDescription,
    title,
    date,
    tags,
    pagination,
    relatedPosts,
  },
}) {
  return (
    <Layout>
      <SEO title={title} description={metaDescription} />
      <Box paddingBottom="xxl">
        <Box paddingBottom="xl">
          <Typography component="title" level={1}>
            {title}
          </Typography>
          <Typography marginBottom="l" color="secondary">
            Posted on {date}
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </Box>
        <Box paddingBottom="xl" borderBottom="primary">
          {tags.map((tag) => (
            <Button type="secondary" key={tag} href={`/tag/${tag}`}>
              {tag}
            </Button>
          ))}
        </Box>
        <Box paddingTop="xl">
          <Row>
            <Column xs="6">
              {pagination.previous && (
                <Link
                  type="secondary"
                  to={`/${pagination.previous.frontmatter.id}`}
                >
                  <Row alignItems="center" justify="start" paddings="s">
                    <Column xs="auto">
                      <FontAwesomeIcon icon={previousIcon} size="lg" />
                    </Column>
                    <Column xs="auto">
                      <Typography marginBottom="none" align="left">
                        <Typography component="label" isCaps fontSize="s">
                          Previous
                        </Typography>
                      </Typography>
                      <Hidden xs sm>
                        <Box paddingTop="xs">
                          <Typography
                            marginBottom="none"
                            align="left"
                            component="title"
                            level={3}
                            fontSize="s"
                          >
                            {pagination.previous.frontmatter.title}
                          </Typography>
                        </Box>
                      </Hidden>
                    </Column>
                  </Row>
                </Link>
              )}
            </Column>
            <Column xs="6">
              {pagination.next && (
                <Link
                  type="secondary"
                  to={`/${pagination.next.frontmatter.id}`}
                >
                  <Row alignItems="center" justify="end" paddings="s">
                    <Column xs="auto">
                      <Typography marginBottom="none" align="right">
                        <Typography component="label" isCaps fontSize="s">
                          Next
                        </Typography>
                      </Typography>
                      <Hidden xs sm>
                        <Box paddingTop="xs">
                          <Typography
                            marginBottom="none"
                            align="right"
                            component="title"
                            level={3}
                            fontSize="s"
                          >
                            {pagination.next.frontmatter.title}
                          </Typography>
                        </Box>
                      </Hidden>
                    </Column>
                    <Column xs="auto">
                      <FontAwesomeIcon icon={nextIcon} size="lg" />
                    </Column>
                  </Row>
                </Link>
              )}
            </Column>
          </Row>
        </Box>
        {!!relatedPosts && !!relatedPosts.length && (
          <Box paddingTop="xl">
            <Box paddingTop="xl" borderTop="primary">
              <Typography
                component="title"
                level={2}
                fontSize="l"
                marginBottom="l"
              >
                Related posts:
              </Typography>
              <Row paddings="l" alignItems="stretch" isWrap>
                {relatedPosts.map(
                  ({
                    node: {
                      frontmatter: { id, title: postTitle, description },
                    },
                  }) => (
                    <Column key={id} xs="12" sm="12" md="4">
                      <Typography component="title" level={3} fontSize="s">
                        <Link type="secondary" to={`/${id}`}>
                          {postTitle}
                        </Link>
                      </Typography>
                      <Typography color="secondary">
                        Posted on {date}
                      </Typography>
                      <Typography>{description}</Typography>
                      <Typography align="right">
                        <Button href={`/${id}`}>Read</Button>
                      </Typography>
                    </Column>
                  )
                )}
              </Row>
            </Box>
          </Box>
        )}
      </Box>
    </Layout>
  );
}
/* eslint-enable react/no-danger */

BlogItem.propTypes = {
  pageContext: PropTypes.shape({
    html: PropTypes.string,
    title: PropTypes.string,
    metaDescription: PropTypes.string,
    date: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    pagination: PropTypes.shape({
      next: PropTypes.object,
      previous: PropTypes.object,
    }),
    relatedPosts: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default BlogItem;
