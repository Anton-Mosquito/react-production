import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Profile, type ProfileSchema } from '../types/profile'
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData'
import { updateProfileData } from '../services/updateProfileData/updateProfileData'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'

const initialState: ProfileSchema = {
  data: {
    first: '',
    lastname: '',
    age: 0,
    currency: Currency.USD,
    country: Country.Ukraine,
    city: '',
    username: '',
    avatar: '',
  },
  isLoading: false,
  error: '',
  readonly: true,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setReadOnly: (state, action: PayloadAction<boolean>) => {
      state.readonly = action.payload
    },
    cancelEdit: (state) => {
      state.readonly = true
      state.validateError = undefined
      state.form = state.data
    },
    updateProfile: (state, action: PayloadAction<Profile>) => {
      state.form = {
        ...state.data,
        ...action.payload
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.isLoading = false
        state.data = action.payload
        state.form = action.payload
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(updateProfileData.pending, (state) => {
        state.validateError = undefined
        state.isLoading = true
      })
      .addCase(updateProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.isLoading = false
        state.data = action.payload
        state.form = action.payload
        state.readonly = true
        state.validateError = undefined
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.isLoading = false
        state.validateError = action.payload
      })
  }
})

// Action creators are generated for each case reducer function
export const { actions: profileActions, reducer: profileReducer } = profileSlice
