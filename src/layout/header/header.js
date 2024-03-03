import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'gatsby';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub as github,
  faLinkedin as linkedin,
  faTwitter as twitter,
} from '@fortawesome/free-brands-svg-icons';

import Typography from '../../ui/typography';
import Box from '../../ui/box';
import { Row, Column } from '../../ui/grid';

import logo from '../../images/logo.png';

import * as styles from './header.module.css';

const icons = { github, twitter, linkedin };

function Header({ author, description }) {
  return (
    <header>
      <Box paddingBottom="m">
        <Box paddingTop="m" paddingBottom="m" borderBottom="primary">
          <Row justify="spaceBetween" alignItems="center">
            <Column xs="auto">
              <Row alignItems="center" paddings="s">
                <Column xs="auto">
                  <Link to="/">
                    <img src={logo} alt={author.name} className={styles.logo} />
                  </Link>
                </Column>
                <Column xs="auto">
                  <div>
                    <Typography
                      component="label"
                      color="secondary"
                      isCaps
                      fontSize="xl"
                    >
                      {author.name}
                    </Typography>
                  </div>
                  <div>
                    <Typography component="label" fontSize="s">
                      {description}
                    </Typography>
                  </div>
                </Column>
              </Row>
            </Column>
            <Column xs="auto">
              {author.social.map(({ icon, link }) => (
                <a
                  key={link}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={`Alex Yackovlev ${icon}`}
                >
                  <FontAwesomeIcon
                    className={styles.socialIcon}
                    icon={icons[icon]}
                    size="lg"
                  />
                </a>
              ))}
            </Column>
          </Row>
        </Box>
      </Box>
    </header>
  );
}

Header.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string,
    social: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string,
        link: PropTypes.string,
      })
    ),
  }).isRequired,
  description: PropTypes.string.isRequired,
};

export default Header;
