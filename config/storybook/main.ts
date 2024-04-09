import type { StorybookConfig } from '@storybook/react-webpack5'
import path from 'path';
import { RuleSetRule, DefinePlugin } from 'webpack';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { BuildPath } from '../build/types/config';

const config: StorybookConfig = {
  stories: ['../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-links', {
    name: '@storybook/addon-essentials',
    options: {
      backgrounds: false
    }
  }, '@storybook/addon-onboarding', '@storybook/addon-interactions', 'storybook-addon-mock', 'storybook-addon-themes', '@storybook/addon-webpack5-compiler-swc'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {}
    }
  },
  docs: {
    autodocs: 'tag'
  },
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic',
        },
      },
    },
  }),
  webpackFinal: async (config) => {
    const paths: BuildPath = {
      build: '',
      html: '',
      entry: '',
      src: path.resolve(__dirname, '..', '..', 'src'),
      locales: '',
      buildLocales: ''
    }
  
    if (config.resolve) {
      config.resolve.modules?.push(paths.src)
      config.resolve.extensions?.push('.ts', '.tsx')
      config.resolve.alias = {
        ...config.resolve?.alias,
        '@': paths.src
      }
    }
  
    if (config.module?.rules) {
      config.module.rules = (config.module?.rules as RuleSetRule[]).map((rule) => {
        if (rule.test != null && (typeof rule.test === 'string' || rule.test instanceof RegExp)) {
          const test = rule.test.toString()
          if (test.includes('svg')) {
            return { ...rule, exclude: /\.svg$/i };
          }
        }
  
        return rule
      })
  
      config.module?.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack']
      })
  
      config.module?.rules.push(buildCssLoader(true))
    }
  
    config.plugins?.push(new DefinePlugin({
      __IS_DEV__: JSON.stringify(true),
      __API__: JSON.stringify('http://testapi.ua'),
      __PROJECT__: JSON.stringify('storybook')
    }))
  
    return config
  },
}
export default config
