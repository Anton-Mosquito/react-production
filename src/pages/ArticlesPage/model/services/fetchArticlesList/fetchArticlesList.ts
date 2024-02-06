import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from 'app/providers/StoreProvider'
import { ArticleType, type Article } from 'entities/Article'
import {
  getArticlesPageLimit,
  getArticlesPageNum,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType
} from '../../selectors/articlesPageSelector'
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams'

interface FetchArticleListProps {
  replace?: boolean
}

export const fetchArticlesList = createAsyncThunk<
Article[],
FetchArticleListProps,
ThunkConfig<string>
>(
  'articlesPage/fetchArticlesList',
  async (_, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi
    const limit = getArticlesPageLimit(getState())
    const sort = getArticlesPageSort(getState())
    const order = getArticlesPageOrder(getState())
    const search = getArticlesPageSearch(getState())
    const page = getArticlesPageNum(getState())
    const type = getArticlesPageType(getState())

    try {
      addQueryParams({ sort, order, search, type })
      const response = await extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
          _limit: limit,
          _page: page,
          _sort: sort,
          _order: order,
          _q: search,
          type: type === ArticleType.ALL ? undefined : type
        }
      })

      if (!response.data) {
        throw new Error()
      }

      return response.data
    } catch (error) {
      return rejectWithValue('Invalid data')
    }
  }
)
