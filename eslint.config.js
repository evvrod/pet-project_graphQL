import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintPluginReactCompiler from 'eslint-plugin-react-compiler';
import eslintConfigPrettier from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.Config[]} */
const patchedConfig = [
  ...compat.extends('next/core-web-vitals'),
  ...compat.extends('next/typescript'),
];

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintPluginReactCompiler.configs.recommended,
  ...patchedConfig,
  eslintConfigPrettier,
  {
    rules: {
      'no-console': 'error',
      'max-lines-per-function': [
        'error',
        {
          'max': 100,
          'skipBlankLines': true,
          'skipComments': true,
          'IIFEs': true,
        },
      ],
      'prefer-destructuring': [
        'error',
        {
          'array': true,
          'object': true,
        },
      ],
    },
  },
  {
    ignores: ['node_modules/', '.next/', 'eslint.config.js'],
  },
];
