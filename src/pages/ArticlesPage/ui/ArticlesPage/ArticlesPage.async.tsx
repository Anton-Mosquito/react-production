import { type FC, lazy } from 'react'
import { type ArticlesPageProps } from './ArticlesPage'

export const ArticlesPageAsync = lazy<FC<ArticlesPageProps>>(async () =>
  await new Promise((resolve) => {
    setTimeout(() => { resolve(import('./ArticlesPage')) }, 1500)
  }))
