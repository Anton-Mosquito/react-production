import { type ArticleDetailsCommentSchema } from './ArticleDetailsCommentsSchema'
import { type ArticleDetailsRecommendationSchema } from './ArticleDetailsRecommendationSchema'

export interface ArticleDetailsPageSchema {
  comments: ArticleDetailsCommentSchema
  recommendations: ArticleDetailsRecommendationSchema
}
