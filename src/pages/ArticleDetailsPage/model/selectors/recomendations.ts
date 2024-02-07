import { type StateSchema } from 'app/providers/StoreProvider'

export const getArticleRecommendationIsLoading = (state: StateSchema): boolean | undefined =>
  state.articleDetailsPage?.recommendations.isLoading

export const getArticleRecommendationError = (state: StateSchema): string | undefined =>
  state.articleDetailsPage?.recommendations.error
