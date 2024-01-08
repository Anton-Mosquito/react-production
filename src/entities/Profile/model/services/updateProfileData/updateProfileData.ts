import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from 'app/providers/StoreProvider'
import { ValidateProfileError, type Profile } from '../../types/profile'
import { getProfileData } from '../../selectors/getProfileData/getProfileData'
import { validateProfileData } from '../validateProfileData/validateProfileData'

export const updateProfileData = createAsyncThunk<
Profile,
void,
ThunkConfig<ValidateProfileError[]>
>(
  'profile/updateProfileData',
  async (_, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi
    const formData = getProfileData(getState())
    const errors = validateProfileData(formData)

    if (errors.length > 0) {
      return rejectWithValue(errors)
    }

    try {
      const response = await extra.api.put<Profile>('/profile', formData)

      if (!response.data) {
        throw new Error()
      }

      return response.data
    } catch (error) {
      console.error('🚀 ~ error:', error)
      return rejectWithValue([ValidateProfileError.SERVER_ERROR])
    }
  }
)
