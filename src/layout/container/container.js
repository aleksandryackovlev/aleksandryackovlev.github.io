import React from 'react';
import PropTypes from 'prop-types';

import * as style from './container.module.css';

function Container({ children }) {
  return <div className={style.container}>{children}</div>;
}

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default Container;
