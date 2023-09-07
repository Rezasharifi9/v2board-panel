import ErrorBoundary from '@/enhancers/ErrorBoundary'
import QueryProvider from '@/helper/query-client-provider'
import type { NextPage } from 'next'
import type { SSRConfig } from 'next-i18next'
import { appWithTranslation } from 'next-i18next'
import nextI18nextConfig from 'next-i18next.config'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import type { ReactElement, ReactNode } from 'react'
import '../styles/globals.scss'
import { ThemeProvider } from 'next-themes'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout<P> = AppProps<P> & {
  Component: NextPageWithLayout
}

const App = ({
  Component,
  pageProps: { dehydratedState, ...pageProps },
}: AppPropsWithLayout<{ dehydratedState: unknown }>) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <ErrorBoundary>
      <QueryProvider dehydratedState={dehydratedState}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
      </QueryProvider>
    </ErrorBoundary>
  )
}

export default appWithTranslation<AppPropsWithLayout<SSRConfig & { dehydratedState: unknown }>>(
  App,
  nextI18nextConfig
)
