import {
  type PayloadAction,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit'
import { type StateSchema } from 'app/providers/StoreProvider'
import {
  type ArticleDetailsRecommendationSchema
} from '../types/ArticleDetailsRecommendationSchema'
import { type Article } from 'entities/Article'
import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations'

const recommendationAdapter = createEntityAdapter({
  selectId: (article: Article) => article.id
})

export const getArticleRecommendation = recommendationAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsPage?.recommendations ?? recommendationAdapter.getInitialState()
)

const articleDetailsRecommendationSlice = createSlice({
  name: 'articleDetailsRecommendationSlice',
  initialState: recommendationAdapter.getInitialState<ArticleDetailsRecommendationSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {}
  }),
  reducers: {
    // // Can pass adapter functions directly as case reducers.  Because we're passing this
    // // as a value, `createSlice` will auto-generate the `bookAdded` action type / creator
    // bookAdded: booksAdapter.addOne,
    // booksReceived (state, action) {
    //   // Or, call them as "mutating" helpers in a case reducer
    //   booksAdapter.setAll(state, action.payload.books)
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleRecommendations.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchArticleRecommendations.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.isLoading = false
        recommendationAdapter.setAll(state, action.payload)
      })
      .addCase(fetchArticleRecommendations.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { reducer: articleDetailsRecommendationReducer } = articleDetailsRecommendationSlice
