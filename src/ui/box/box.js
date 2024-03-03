import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import * as style from './box.module.css';

const sizesPropTypes = PropTypes.oneOf([
  'none',
  'xxs',
  'xs',
  's',
  'm',
  'l',
  'xl',
  'xxl',
]);

const colorsPropTypes = PropTypes.oneOf([
  'none',
  'default',
  'primary',
  'secondary',
]);

function Box({
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  withRadius,
  background,
  children,
}) {
  return (
    <div
      className={classNames(
        padding && style[`box_padding_${padding}`],
        paddingTop && style[`box_paddingTop_${paddingTop}`],
        paddingRight && style[`box_paddingRight_${paddingRight}`],
        paddingBottom && style[`box_paddingBottom_${paddingBottom}`],
        paddingLeft && style[`box_paddingLeft_${paddingLeft}`],
        border && style[`box_border_${border}`],
        borderTop && style[`box_borderTop_${borderTop}`],
        borderRight && style[`box_borderRight_${borderRight}`],
        borderBottom && style[`box_borderBottom_${borderBottom}`],
        borderLeft && style[`box_borderLeft_${borderLeft}`],
        withRadius && style.box_radius_yes,
        background && style[`box_background_${background}`]
      )}
    >
      {children}
    </div>
  );
}

Box.propTypes = {
  padding: sizesPropTypes,
  paddingTop: sizesPropTypes,
  paddingRight: sizesPropTypes,
  paddingBottom: sizesPropTypes,
  paddingLeft: sizesPropTypes,
  border: colorsPropTypes,
  borderTop: colorsPropTypes,
  borderRight: colorsPropTypes,
  borderBottom: colorsPropTypes,
  borderLeft: colorsPropTypes,
  withRadius: PropTypes.bool,
  background: colorsPropTypes,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

Box.defaultProps = {
  padding: null,
  paddingTop: null,
  paddingRight: null,
  paddingBottom: null,
  paddingLeft: null,
  border: null,
  borderTop: null,
  borderRight: null,
  borderBottom: null,
  borderLeft: null,
  withRadius: false,
  background: 'default',
};

export default Box;
