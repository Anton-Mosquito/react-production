import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from '@/app/providers/StoreProvider'
import { getArticlesPageInited } from '../../selectors/articlesPageSelector'
import { articlesPageActions } from '../../slices/articlesPageSlice'
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList'
import { type ArticleType, type ArticleSortField } from '@/entities/Article'
import { type SortOrder } from '@/shared/types'

export const initArticlesPage = createAsyncThunk<
void,
URLSearchParams,
ThunkConfig<string>
>(
  'articlesPage/initArticlesPage',
  async (searchParams, thunkApi) => {
    const { getState, dispatch } = thunkApi
    const inited = getArticlesPageInited(getState())

    if (inited) return

    const orderFromUrl = searchParams.get('order') as SortOrder
    const sortFromUrl = searchParams.get('sort') as ArticleSortField
    const searchFromUrl = searchParams.get('search')
    const typeFromUrl = searchParams.get('type') as ArticleType

    if (orderFromUrl) {
      dispatch(articlesPageActions.setOrder(orderFromUrl))
    }
    if (sortFromUrl) {
      dispatch(articlesPageActions.setSort(sortFromUrl))
    }
    if (searchFromUrl) {
      dispatch(articlesPageActions.setSearch(searchFromUrl))
    }
    if (typeFromUrl) {
      dispatch(articlesPageActions.setType(typeFromUrl))
    }

    dispatch(articlesPageActions.initState())
    await dispatch(fetchArticlesList({}))
  }
)
