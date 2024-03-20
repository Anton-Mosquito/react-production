import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './LoginForm.module.scss'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { useSelector } from 'react-redux'
import { memo, useCallback } from 'react'
import { loginActions, loginReducer } from '../../model/slice/loginSlice'
import { loginByUserName } from '../../model/services/loginByUserName/loginByUserName'
import { Text, TextTheme } from '@/shared/ui/Text'
import { getLoginUserName } from '../../model/selectors/getLoginUserName/getLoginUserName'
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword'
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginLoading'
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError'
import {
  DynamicModuleLoader,
  type ReducersList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

export interface LoginFormProps {
  className?: string
  onSuccess: () => void
}

const initialReducers: ReducersList = {
  loginForm: loginReducer
}

// enum LoginErrors {
//   INCORRECT_DATA = '',
//   SERVER_ERROR = '',
// }

const LoginForm = memo(({ className, onSuccess }: LoginFormProps): JSX.Element => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const username = useSelector(getLoginUserName)
  const password = useSelector(getLoginPassword)
  const isLoading = useSelector(getLoginIsLoading)
  const error = useSelector(getLoginError)

  const onChangeUserName = useCallback((value: string) => {
    dispatch(loginActions.setUserName(value))
  }, [dispatch])

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value))
  }, [dispatch])

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUserName({ username, password }))
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess()
    }
  }, [dispatch, onSuccess, password, username])

  return (
      <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
          <div className={classNames(cls.LoginForm, {}, [className])}>
              <Text title={t('Форма авторизации')}/>
              {(Boolean(error)) && <Text text={t(error)} theme={TextTheme.ERROR}/>}
              <Input
                  type="text"
                  className={cls.input}
                  placeholder={t('Введите username')}
                  autofocus
                  onChange={onChangeUserName}
                  value={username}
          />
              <Input
                  type="text"
                  className={cls.input}
                  placeholder={t('Введите password')}
                  onChange={onChangePassword}
                  value={password}
          />
              <Button
                  className={cls.loginBtn}
                  theme={ThemeButton.OUTLINE}
                  onClick={() => { void onLoginClick() }}
                  disabled={isLoading}
            >
                  {t('Войти')}
              </Button>
          </div>
      </DynamicModuleLoader>
  )
})

LoginForm.displayName = 'LoginForm'

export default LoginForm
