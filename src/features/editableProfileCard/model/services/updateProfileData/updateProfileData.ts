import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from '@/app/providers/StoreProvider'
import { getProfileData } from '../../selectors/getProfileData/getProfileData'
import { validateProfileData } from '../validateProfileData/validateProfileData'
import { type Profile } from '@/entities/Profile'
import { ValidateProfileError } from '../../consts/consts'

export const updateProfileData = createAsyncThunk<
Profile,
undefined,
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
      const response = await extra.api.put<Profile>(`/profile/${formData?.id}`, formData)

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
