import { TOKEN } from '@/lib/storage-keys'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import React from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      retry: false,
    },
  },
})

const QueryProvider = ({
  children,
  dehydratedState,
}: {
  children: React.ReactNode
  dehydratedState: unknown
}) => {
  const router = useRouter()

  const handleRequestError = (error: unknown) => {
    const statusCode = (error as { statusCode?: number })?.statusCode

    if (statusCode === 401) {
      router.push('/access-denied')
    }
  }

  queryClient.setDefaultOptions({
    mutations: { onError: (e) => handleRequestError(e) },
    queries: { onError: (e) => handleRequestError(e) },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>{children}</Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default QueryProvider
