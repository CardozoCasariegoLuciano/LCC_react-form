/* eslint-disable no-magic-numbers */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  ignorePatterns: ['node_modules/', 'dist/'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'linebreak-style': ['error', 'unix'],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': ['error', { before: false, after: true }],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 3, maxBOF: 0 }],
    'no-multi-spaces': 'error',
    'no-trailing-spaces': 'error',
    'space-in-parens': ['error', 'never'],
    'no-dupe-else-if': 'error',
    'no-duplicate-imports': 'error',
    'default-case': 'error',
    'no-magic-numbers': [
      'error',
      {
        ignoreDefaultValues: true,
        ignoreArrayIndexes: true,
        ignoreClassFieldInitialValues: true,
      },
    ],
    'no-nested-ternary': 'error',
    'no-var': 'error',
    'prefer-template': 'error',
    'require-await': 'error',
    'no-console': 'error',

    '@typescript-eslint/no-unused-vars': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
  },
};
