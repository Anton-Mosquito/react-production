import { Button } from 'shared/ui/Button/Button'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

// test component
export const BugButton = (): JSX.Element => {
  const [error, setError] = useState(false)
  const { t } = useTranslation()

  const throwError = (): void => { setError(true) }

  useEffect(() => {
    if (error) {
      throw new Error()
    }
  }, [error])

  return (
      <Button
          onClick={throwError}
      // eslint-disable-next-line i18next/no-literal-string
      >
          {t('throw error')}
      </Button>
  )
}
