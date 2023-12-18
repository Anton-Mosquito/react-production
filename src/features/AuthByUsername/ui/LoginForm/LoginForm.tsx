import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LoginForm.module.scss'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input'
import { useDispatch, useSelector } from 'react-redux'
import { memo, useCallback } from 'react'
import { loginActions } from '../../model/slice/loginSlice'
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState'
import { loginByUserName } from '../../model/services/loginByUserName/loginByUserName'
import { Text, TextTheme } from 'shared/ui/Text/Text'

interface LoginFormProps {
  className?: string
}

enum LoginErrors {
  INCORRECT_DATA = '',
  SERVER_ERROR = '',
}

const LoginForm = memo(({ className = '' }: LoginFormProps): JSX.Element => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { username, password, isLoading, error } = useSelector(getLoginState)

  const onChangeUserName = useCallback((value: string) => {
    dispatch(loginActions.setUserName(value))
  }, [dispatch])

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value))
  }, [dispatch])

  const onLoginClick = useCallback(() => {
    dispatch(loginByUserName({ username, password }))
  }, [dispatch, password, username])

  return (
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
              onClick={onLoginClick}
              disabled={isLoading}
            >
              {t('Войти')}
          </Button>
      </div>
  )
})

LoginForm.displayName = 'LoginForm'

export { LoginForm }
