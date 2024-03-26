import type webpack from 'webpack'
import { type BuildOptions } from '../types/config'
import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin'

interface BuildBabelLoaderProps extends Partial<BuildOptions> {
  isTSX?: boolean
}

export const buildBabelLoader = ({ isDev, isTSX }: BuildBabelLoaderProps): webpack.RuleSetRule => {
  const isProd = !isDev
  return {
    test: isTSX ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        presets: [
          '@babel/preset-react',
          '@babel/preset-env'
        ],
        plugins: [
          isTSX && isProd && [
            babelRemovePropsPlugin,
            {
              props: ['data-testid']
            }
          ],
          isDev && require.resolve('react-refresh/babel'),
          [
            '@babel/plugin-transform-typescript',
            {
              isTSX
            }
          ],
          ['@babel/plugin-transform-runtime']
        ].filter(Boolean)
      }
    }
  }
}
