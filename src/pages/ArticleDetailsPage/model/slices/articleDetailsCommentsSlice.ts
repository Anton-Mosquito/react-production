import {
  type PayloadAction,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit'
import { type StateSchema } from '@/app/providers/StoreProvider'
import { type Comment } from '@/entities/Comment'
import { type ArticleDetailsCommentSchema } from '../types/ArticleDetailsCommentsSchema'
import {
  fetchCommentsByArticleId
} from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId'

const commentsAdapter = createEntityAdapter({
  selectId: (comment: Comment) => comment.id
})

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsPage?.comments ?? commentsAdapter.getInitialState()
)

const articleDetailsCommentsSlice = createSlice({
  name: 'articleDetailsCommentsSlice',
  initialState: commentsAdapter.getInitialState<ArticleDetailsCommentSchema>({
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
      .addCase(fetchCommentsByArticleId.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchCommentsByArticleId.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        state.isLoading = false
        commentsAdapter.setAll(state, action.payload)
      })
      .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentsSlice

// type RootState = ReturnType<typeof store.getState>

// console.log(store.getState().books)
// // { ids: [], entities: {} }

// // Can create a set of memoized selectors based on the location of this entity state
// const booksSelectors = booksAdapter.getSelectors<RootState>(
//   (state) => state.books
// )

// // And then use the selectors to retrieve values
// const allBooks = booksSelectors.selectAll(store.getState())
