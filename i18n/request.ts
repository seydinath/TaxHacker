import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'

const locales = ['en', 'fr']
const defaultLocale = 'en'

export default getRequestConfig(async (params) => {
  let locale = params.locale as string | undefined
  
  // If no locale in params, try cookies and headers
  if (!locale) {
    try {
      const cookieStore = await cookies()
      // next-intl stores locale in NEXT_INTL_LOCALE cookie with localePrefix: 'never'
      locale = cookieStore.get('NEXT_INTL_LOCALE')?.value || defaultLocale
    } catch {
      locale = defaultLocale
    }
  }
  
  // Validate locale
  if (!locales.includes(locale)) {
    locale = defaultLocale
  }

  return {
    locale: locale as string,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})


