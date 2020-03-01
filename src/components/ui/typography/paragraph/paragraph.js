import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import style from './paragraph.module.css';

const Paragraph = ({
  fontSize,
  className,
  isBold,
  children
}) => (
  <p
    className={classNames(
      style.paragraph,
      fontSize && style[`paragraph_font_${fontSize}`],
      isBold && style.paragraph_bold_yes,
      className
    )}
  >
    {children}
  </p>
);

Paragraph.propTypes = {
  className: PropTypes.string,
  fontSize: PropTypes.oneOf([
    's',
    'm',
    'l'
  ]),
  isBold: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired
};

Paragraph.defaultProps = {
  className: '',
  fontSize: 'm',
  isBold: false
};

export default Paragraph;
