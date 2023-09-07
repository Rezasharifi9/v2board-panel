import RootLayout from '@/components/layout/RootLayout'
import Content from '@/components/pages/login/Content'
import CustomHead from '@/enhancers/CustomHead'
import type { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Page = () => <Content />

Page.getLayout = (page: React.ReactElement) => {
  return (
    <RootLayout>
      <CustomHead title="login.title" />
      {page}
    </RootLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? '', ['login', 'meta'])),
    },
  }
}

export default Page
