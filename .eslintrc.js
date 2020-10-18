/** @type import('eslint').Linter.BaseConfig */
module.exports = {
  env: {
    node: true,
    es6: true,
    'jest/globals': true
  },
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module'
  },
  parser: '@typescript-eslint/parser',
  plugins: ['jest', '@typescript-eslint', '@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off'
  }
}
