import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import * as style from './label.module.css';

function Label({ fontSize, isBold, className, children }) {
  return (
    <span
      className={classNames(
        fontSize && style[`label_font_${fontSize}`],
        isBold && style.label_bold_yes,
        className
      )}
    >
      {children}
    </span>
  );
}

Label.propTypes = {
  className: PropTypes.string,
  fontSize: PropTypes.oneOf(['s', 'm', 'l', 'xl']),
  isBold: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

Label.defaultProps = {
  className: '',
  fontSize: null,
  isBold: false,
};

export default Label;
