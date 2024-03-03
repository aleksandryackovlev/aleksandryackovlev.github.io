import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import * as style from './grid.module.css';

function Row({ children, alignItems, justify, isWrap, paddings }) {
  return (
    <div
      className={classNames(
        style.row,
        style[`row_alignItems_${alignItems}`],
        style[`row_justify_${justify}`],
        style[`row_paddings_${paddings}`],
        isWrap && style.row_wrap_yes
      )}
    >
      {children}
    </div>
  );
}

Row.propTypes = {
  children: PropTypes.node.isRequired,
  isWrap: PropTypes.bool,
  justify: PropTypes.oneOf([
    'start',
    'end',
    'center',
    'spaceBetween',
    'spaceAround',
  ]),
  paddings: PropTypes.oneOf(['none', 's', 'm', 'l']),
  alignItems: PropTypes.oneOf(['flex', 'start', 'end', 'center', 'stretch']),
};

Row.defaultProps = {
  isWrap: false,
  alignItems: 'flex',
  justify: 'start',
  paddings: 'none',
};

export default Row;
