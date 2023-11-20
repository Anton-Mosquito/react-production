import { useTranslation } from "react-i18next"

const AboutPage = () => {
  const { t } = useTranslation('about');

  return (
    <div>
      {t('O сайте')}
    </div>
  )
}

export default AboutPage