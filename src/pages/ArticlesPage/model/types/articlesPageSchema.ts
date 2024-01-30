import { type EntityState } from '@reduxjs/toolkit'
import { type ArticleView, type Article } from 'entities/Article'

export interface ArticlesPagesSchema extends EntityState<Article, string> {
  isLoading?: boolean
  error?: string
  view: ArticleView
}
