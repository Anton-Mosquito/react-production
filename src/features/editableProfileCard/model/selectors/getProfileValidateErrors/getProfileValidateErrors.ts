import { type StateSchema } from '@/app/providers/StoreProvider'
import { type ValidateProfileError } from '../../consts/consts'

export const getProfileValidateErrors = (state: StateSchema): ValidateProfileError[] =>
  state.profile?.validateError ?? []
