module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'prettier', 'plugin:jest/recommended'],
  plugins: ['prettier', 'jest'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
        semi: false,
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
  },
}
