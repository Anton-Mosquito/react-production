import path from 'path'
import { type BuildPath } from '../build/types/config'
import type webpack from 'webpack'
import { buildCssLoader } from '../build/loaders/buildCssLoader'
import { DefinePlugin, type RuleSetRule } from 'webpack'

export default ({ config }: { config: webpack.Configuration }): webpack.Configuration => {
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
          return { ...rule, exclude: /\.svg$/i }
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
}
