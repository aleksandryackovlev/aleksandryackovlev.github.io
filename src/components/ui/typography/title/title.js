import { createElement } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import style from './title.module.css';

const Title = ({
  fontSize,
  className,
  level,
  isBold,
  children
}) => createElement(`h${level}`, {
  className: classNames(
    style.title,
    fontSize && style[`title_font_${fontSize}`],
    isBold && style.title_bold_yes,
    className
  ),
  children
});

Title.propTypes = {
  className: PropTypes.string,
  fontSize: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
  level: PropTypes.oneOf([1, 2, 3]),
  isBold: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired
};

Title.defaultProps = {
  level: 2,
  className: '',
  fontSize: 'l',
  isBold: false
};

export default Title;
