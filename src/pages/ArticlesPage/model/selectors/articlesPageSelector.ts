import { type StateSchema } from 'app/providers/StoreProvider'
import { ArticleView } from 'entities/Article'

export const getArticlesPageIsLoading = (state: StateSchema): boolean | undefined =>
  state.articlesPage?.isLoading

export const getArticlesPageError = (state: StateSchema): string | undefined =>
  state.articlesPage?.error

export const getArticlesPageView = (state: StateSchema): ArticleView =>
  state.articlesPage?.view ?? ArticleView.SMALL

export const getArticlesPage = (state: StateSchema): number =>
  state.articlesPage?.page ?? 1

export const getArticlesPageLimit = (state: StateSchema): number =>
  state.articlesPage?.limit ?? 9

export const getArticlesPageHasMore = (state: StateSchema): boolean | undefined =>
  state.articlesPage?.hasMore
