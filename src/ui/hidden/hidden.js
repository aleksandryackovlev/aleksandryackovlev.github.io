import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import * as style from './hidden.module.css';

function Hidden({ xs, sm, md, lg, xl, children, className, as: Component }) {
  return (
    <Component
      className={classNames(
        className,
        xs && style.hidden_xs_yes,
        sm && style.hidden_sm_yes,
        md && style.hidden_md_yes,
        lg && style.hidden_lg_yes,
        xl && style.hidden_xl_yes
      )}
    >
      {children}
    </Component>
  );
}

Hidden.propTypes = {
  xs: PropTypes.bool,
  sm: PropTypes.bool,
  md: PropTypes.bool,
  lg: PropTypes.bool,
  xl: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  as: PropTypes.string,
};

Hidden.defaultProps = {
  xs: false,
  sm: false,
  md: false,
  lg: false,
  xl: false,
  className: '',
  as: 'div',
};

export default Hidden;
