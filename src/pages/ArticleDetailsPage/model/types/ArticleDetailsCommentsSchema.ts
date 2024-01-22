import { type EntityState } from '@reduxjs/toolkit'
import { type Comment } from 'entities/Comment'

export interface ArticleDetailsCommentSchema extends EntityState<Comment, string> {
  isLoading?: boolean
  error?: string
}
