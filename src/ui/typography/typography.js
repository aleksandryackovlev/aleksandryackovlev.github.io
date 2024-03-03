import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import Label from './label';
import Paragraph from './paragraph';
import Title from './title';

import * as style from './typography.module.css';

function Typography({
  align,
  color,
  isInline,
  isNoWrap,
  isCaps,
  isTruncate,
  className,
  component,
  marginBottom,
  ...rest
}) {
  const componentClassNames = classNames(
    style.typography,
    align && style[`typography_align_${align}`],
    color && style[`typography_color_${color}`],
    marginBottom && style[`typography_marginBottom_${marginBottom}`],
    isInline && style.typography_inline_yes,
    isCaps && style.typography_upper_yes,
    isNoWrap && style.typography_noWrap_yes,
    isTruncate && style.typography_truncate_yes,
    className
  );

  switch (component) {
    case 'label':
      return <Label className={componentClassNames} {...rest} />;
    case 'title':
      return <Title className={componentClassNames} {...rest} />;
    case 'paragraph':
      return <Paragraph className={componentClassNames} {...rest} />;
    default:
      return <div className={componentClassNames}>{rest.children}</div>;
  }
}

Typography.propTypes = {
  align: PropTypes.oneOf(['left', 'right', 'center', 'justify']),
  color: PropTypes.oneOf(['inherit', 'normal', 'primary', 'secondary']),
  marginBottom: PropTypes.oneOf(['none', 'xs', 's', 'm', 'l', 'xl']),
  isInline: PropTypes.bool,
  isNoWrap: PropTypes.bool,
  isCaps: PropTypes.bool,
  isTruncate: PropTypes.bool,
  className: PropTypes.string,
  component: PropTypes.oneOf(['title', 'paragraph', 'label']),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

Typography.defaultProps = {
  align: null,
  color: null,
  isInline: false,
  isNoWrap: false,
  isCaps: false,
  isTruncate: false,
  marginBottom: 's',
  className: '',
  component: null,
};

export default Typography;
