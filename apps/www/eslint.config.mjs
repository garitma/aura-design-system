import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import { plugin as shadcn } from '@shadcn/lint';
import { createAuraShadcnLintConfig } from '../../packages/registry/registry/default/lint/eslint.aura-shadcn.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      '.source/**',
      'next-env.d.ts',
    ],
  },
  ...createAuraShadcnLintConfig(shadcn),
  {
    files: ["**/*.{js,jsx,ts,tsx,mjs,cjs}"],
    rules: {
      "no-warning-comments": [
        "error",
        {
          terms: ["todo", "fixme", "hack", "xxx", "workaround"],
          location: "anywhere",
        },
      ],
    },
  },
];

export default eslintConfig;
