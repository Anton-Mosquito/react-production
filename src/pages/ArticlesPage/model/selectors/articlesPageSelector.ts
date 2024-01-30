import { type StateSchema } from 'app/providers/StoreProvider'
import { ArticleView } from 'entities/Article'

export const getArticlesPageIsLoading = (state: StateSchema): boolean | undefined =>
  state.articlesPage?.isLoading

export const getArticlesPageError = (state: StateSchema): string | undefined =>
  state.articlesPage?.error

export const getArticlesPageView = (state: StateSchema): ArticleView =>
  state.articlesPage?.view ?? ArticleView.SMALL
