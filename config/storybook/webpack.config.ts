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

  config.resolve!.modules?.push(paths.src)
  config.resolve!.extensions?.push('.ts', '.tsx')

  // eslint-disable-next-line no-param-reassign
  // @ts-expect-error
  config.module!.rules = config.module!.rules!.map((rule: RuleSetRule) => {
    if (rule.test && (typeof rule.test === 'string' || rule.test instanceof RegExp)) {
      const test = rule.test.toString()
      if (test.includes('svg')) {
        return { ...rule, exclude: /\.svg$/i }
      }
    }

    return rule
  })

  config.module!.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack']
  })
  config.module!.rules.push(buildCssLoader(true))

  config.plugins!.push(new DefinePlugin({
    __IS_DEV__: JSON.stringify(true),
    __API__: JSON.stringify(''),
    __PROJECT__: JSON.stringify('storybook')
  }))

  return config
}
