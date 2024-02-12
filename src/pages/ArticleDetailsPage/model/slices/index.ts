import { combineReducers } from '@reduxjs/toolkit'
import { type ArticleDetailsPageSchema } from '../types'
import { articleDetailsRecommendationReducer } from './articleDetailsRecommendationSlice'
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice'
import { type ArticleDetailsCommentSchema } from '../types/ArticleDetailsCommentsSchema'
import { type ArticleDetailsRecommendationSchema } from '../types/ArticleDetailsRecommendationSchema'

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
  comments: articleDetailsCommentsReducer as unknown as ArticleDetailsCommentSchema,
  recommendations: articleDetailsRecommendationReducer as unknown as ArticleDetailsRecommendationSchema
})
