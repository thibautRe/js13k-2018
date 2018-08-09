module.exports = {
  extends: [
    'eslint:recommended',
    'prettier',
  ],
  env: {
    browser: true,
    es6: true,
  },
  plugins: [
    'prettier',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  globals: {
    hyperapp: true,
    C: true,
    CS: true,
    HLP: true,
    __DEV__: true,
  },
  rules: {
    "prettier/prettier": ['error', {
      semi: false,
      singleQuote: true,
      trailingComma: 'all',
    }],
  },
}