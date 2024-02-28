import type webpack from 'webpack'
import { type BuildOptions } from '../types/config'
import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin'

interface BuildBabelLoaderProps extends Partial<BuildOptions> {
  isTSX?: boolean
}

export const buildBabelLoader = ({ isDev, isTSX }: BuildBabelLoaderProps): webpack.RuleSetRule => {
  return {
    test: isTSX ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-react',
          '@babel/preset-env'
        ],
        plugins: [
          [
            'i18next-extract',
            {
              locales: ['ru', 'en'],
              keyAsDefaultValue: true
            }
          ],
          isTSX && [
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
