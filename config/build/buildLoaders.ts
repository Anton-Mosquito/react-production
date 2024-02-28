import type webpack from 'webpack'
import { type BuildOptions } from './types/config'
import { buildCssLoader } from './loaders/buildCssLoader'
import { buildBabelLoader } from './loaders/buildBabelLoader'

export const buildLoaders = ({ isDev }: BuildOptions): webpack.RuleSetRule[] => {
  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack']
  }

  const codeBabelLoader = buildBabelLoader({ isDev, isTSX: false })
  const tsxCdeBabelLoader = buildBabelLoader({ isDev, isTSX: true })
  const cssLoader = buildCssLoader(isDev)

  // Якщо не використовувати тайпскрипт - треба  babel-loader
  // const typescriptLoader = {
  //   test: /\.tsx?$/,
  //   use: 'ts-loader',
  //   exclude: /node_modules/
  // }

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: [
      {
        loader: 'file-loader'
      }
    ]
  }

  return [
    fileLoader,
    svgLoader,
    codeBabelLoader,
    tsxCdeBabelLoader,
    // babelLoader,
    // typescriptLoader,
    cssLoader
  ]
}
