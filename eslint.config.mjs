import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import query from '@tanstack/eslint-plugin-query';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      'eslint.config.mjs',
      'src/__test__/*',
      '.next',
      'prettier.config.mjs',
    ],
  },
  ...compat.extends(
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'airbnb/whitespace',
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      react: reactPlugin,
      query,
    },

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },

    rules: {
      semi: ['error', 'always'],
      'max-depth': ['error', 3],
      'import/prefer-default-export': 'off',
      'import/no-default-export': 'error',
      '@typescript-eslint/no-floating-promises': 'off',

      'react/jsx-max-depth': ['error', { max: 3 }],

      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', ['parent', 'sibling'], 'index'],

          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
          ],

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },

          'newlines-between': 'always',
        },
      ],

      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],

      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@next/next/no-img-element': 'off',

      'no-return-await': 'off',
      '@typescript-eslint/return-await': ['error', 'in-try-catch'],

      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
  {
    files: ['src/**/*.tsx'],

    rules: {
      'max-lines-per-function': 'off',
    },
  },
  {
    files: ['src/app/**/*.tsx'],

    rules: {
      'import/no-default-export': 'off',
    },
  },
  {
    files: ['src/app/layout.tsx'],

    rules: {
      'react/jsx-max-depth': 'off',
    },
  },
];
