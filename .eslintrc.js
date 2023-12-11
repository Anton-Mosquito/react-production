module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'standard-with-typescript', 
    'plugin:react/recommended', 
    'plugin:react/jsx-runtime', 
    'eslint:recommended', 
    'plugin:@typescript-eslint/recommended', 
    'plugin:i18next/recommended', 
    'plugin:storybook/recommended'
  ],
  parser: "@typescript-eslint/parser",
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}',
        '**/src/**/*.test.{ts,tsx}'
      ],
      rules: {
        "i18next/no-literal-string": 'off'
      },
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    'react',
    'i18next'
  ],
  rules: {
    'react/jsx-indent': [2, 4],
    'react/jsx-indent-props': [2, 4],
    'no-unused-vars': 'warn',
    'no-underscore-dangle': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'warn',
    'import/no-extraneous-dependencies': 'off',
    "react/jsx-filename-extension": [2, { "extensions": [".js", ".jsx", ".tsx"] }],
    "i18next/no-literal-string": ['error', 
      { markupOnly: true, ignoreAttribute: ['data-testid', 'to'] },
    ],
    'max-len': ['error', { ignoreComments: true, code: 100}],
    //'no-param-reassign': 'off',
  },
  globals: {
    __IS_DEV__: true
  }
}
