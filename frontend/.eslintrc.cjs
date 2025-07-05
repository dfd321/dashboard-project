module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react-refresh', 'vitest-globals'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-undef': 'off', // TypeScript handles this
  },
  overrides: [
    {
      files: ['**/*.test.{ts,tsx}'],
      env: {
        'vitest-globals/env': true,
      },
      rules: {
        'no-redeclare': 'off',
      },
    },
  ],
};
