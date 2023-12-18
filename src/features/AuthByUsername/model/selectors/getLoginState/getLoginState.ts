import { type StateSchema } from 'app/providers/StoreProvider'
import { type LoginSchema } from '../../types/loginSchema'

export const getLoginState = (state: StateSchema): LoginSchema => state.loginForm
