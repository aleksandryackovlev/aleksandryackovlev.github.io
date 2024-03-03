module.exports = {
  globals: {
    __PATH_PREFIX__: true,
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-one-expression-per-line': [0],
    'react/jsx-props-no-spreading': [0],
    'no-restricted-exports': [0],
    'react/forbid-prop-types': [0],
    'react/no-children-prop': [0],
  },
};
