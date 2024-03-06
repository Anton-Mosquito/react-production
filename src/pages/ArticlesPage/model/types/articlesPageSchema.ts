import { type EntityState } from '@reduxjs/toolkit'
import {
  type ArticleView,
  type Article,
  type ArticleType,
  type ArticleSortField
} from '@/entities/Article'
import { type SortOrder } from '@/shared/types'

export interface ArticlesPagesSchema extends EntityState<Article, string> {
  isLoading?: boolean
  error?: string

  // pagination
  page: number
  limit: number
  hasMore: boolean
  // filters
  view: ArticleView
  order: SortOrder
  sort: ArticleSortField
  search: string
  type: ArticleType

  _inited: boolean
}
