import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { Link } from 'gatsby';

import * as styles from './button.module.css';

function Button({ href, type, children, ...rest }) {
  return (
    <Link
      to={href}
      className={classNames(styles.button, styles[`button_type_${type}`])}
      activeClassName={styles.button_active_yes}
      {...rest}
    >
      {children}
    </Link>
  );
}

Button.propTypes = {
  href: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary']),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

Button.defaultProps = {
  type: 'primary',
};

export default Button;
