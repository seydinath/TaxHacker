import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"
import { ThemeWrapper } from "@/components/theme-provider"

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _locale = await getLocale()
  const messages = await getMessages()

  return (
    <ThemeWrapper>
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </ThemeWrapper>
  )
}

