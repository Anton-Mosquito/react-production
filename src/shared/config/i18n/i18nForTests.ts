import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n
  .use(initReactI18next)
  .init({
    lng: 'ru',
    fallbackLng: 'ru',
    debug: false,
    interpolation: {
      escapeValue: false // not needed for react!!
    },
    resources: { ru: { translations: {} } }
  })
  .catch(error => { console.error('Error initializing i18nStub:', error) })

export default i18n
