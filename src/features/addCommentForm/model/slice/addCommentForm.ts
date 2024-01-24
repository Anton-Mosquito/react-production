import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type AddCommentFormSchema } from '../types/addCommentForm'

const initialState: AddCommentFormSchema = {
  text: '',
  error: undefined
}

export const addCommentFormSchemaSlice = createSlice({
  name: 'addCommentForm',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload
    }
  }
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchProfileData.pending, (state) => {
  //       state.error = undefined
  //       state.isLoading = true
  //     })
  //     .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
  //       state.isLoading = false
  //       state.data = action.payload
  //       state.form = action.payload
  //     })
  //     .addCase(fetchProfileData.rejected, (state, action) => {
  //       state.isLoading = false
  //       state.error = action.payload
  //     })
  // }
})

export const { actions: addCommentFormActions, reducer: addCommentFormReducer } = addCommentFormSchemaSlice
