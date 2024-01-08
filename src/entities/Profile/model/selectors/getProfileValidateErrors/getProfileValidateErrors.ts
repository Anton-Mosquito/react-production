import { type StateSchema } from 'app/providers/StoreProvider'
import { type ValidateProfileError } from '../../types/profile'

export const getProfileValidateErrors = (state: StateSchema): ValidateProfileError[] =>
  state.profile?.validateError ?? []
