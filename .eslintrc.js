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
        '**/src/**/*.{test,stories}.{ts,tsx}'
      ],
      rules: {
        'i18next/no-literal-string': 'off',
        'max-len': 'off'
      },
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  settings: {
    react: {
      version: "detect"
    },
  },
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
    'i18next',
    'react-hooks',
    "custom-path-checker",
    "unused-imports"
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
    'max-len': ['error', { ignoreComments: true, code: 125}],
    // 'no-param-reassign': 'off',
    // 'jsx-a11y/no-static-element-interactions': 'off',
    // 'jsx-a11y/click-events-have-key-events': 'off'
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "error", // Checks effect dependencies
    "no-undef": "off",
    'custom-path-checker/path-checker': ['error', { alias: '@' }],
    'custom-path-checker/api-imports': [
      'error', 
      { 
        alias: '@',
        testFilesPatterns: ['**/*.test.*', '**/*.story.*', '**/StoreDecorator.tsx'] 
      }
    ],
    'custom-path-checker/layer-imports': [
      'error', 
      { 
        alias: '@',
        ignoreImportPatterns: ['**/StoreProvider', '**/testing'] 
      }
    ],
    "unused-imports/no-unused-imports": "error",
    // "react/no-array-index-key": "off"
    //"arrow-body-style": 'off'
  },
  globals: {
    __IS_DEV__: true,
    __API__: true,
    __PROJECT__: true
  }
}
