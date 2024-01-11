import { type FC, lazy } from 'react'
import { type ArticleDetailsPageProps } from './ArticleDetailsPage'

export const ArticleDetailsPageAsync = lazy<FC<ArticleDetailsPageProps>>(async () =>
  await new Promise((resolve) => {
    setTimeout(() => { resolve(import('./ArticleDetailsPage')) }, 1500)
  }))
