import type { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import RootLayout from '@/components/layout/RootLayout'
import CustomHead from '@/enhancers/CustomHead'
import Content from '@/components/pages/view/user/Content'
import { RQ_KEYS } from '@/react-query/react-query-keys'
import { getUsers } from '@/react-query/hooks/user/useGetUsersQuery'
import { getPlans } from '@/react-query/hooks/user/useGetPlansQuery'

const Page = () => <Content />

Page.getLayout = (page: React.ReactElement) => {
  return (
    <RootLayout>
      <CustomHead title="user.title" />
      {page}
    </RootLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale ?? '', [
    'common',
    'meta',
    'table',
    'messages',
  ])

  const queryClient = new QueryClient()

  await Promise.all([
    queryClient.prefetchQuery([RQ_KEYS.GET_USERS], getUsers),
    queryClient.prefetchQuery([RQ_KEYS.GET_PLANS], getPlans),
  ])

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...translations,
    },
  }
}

export default Page
