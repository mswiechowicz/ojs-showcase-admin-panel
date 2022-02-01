module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'xo',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 2],
    'object-curly-spacing': ['error', 'always'],
    'capitalized-comments': ['error', 'never'],
  },
};
