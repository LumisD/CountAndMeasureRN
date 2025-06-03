import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as RNLocalize from 'react-native-localize'

const locales = RNLocalize.getLocales()
const languageCode = locales && locales.length > 0 ? locales[0].languageCode : 'en'

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    lng: languageCode,
    fallbackLng: 'en',
    resources: {
      en: { translation: require('./en/translation.json') },
      es: { translation: require('./es/translation.json') },
      ru: { translation: require('./ru/translation.json') },
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
