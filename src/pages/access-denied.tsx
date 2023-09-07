import CustomHead from '@/enhancers/CustomHead'
import { ADMIN_TYPE, TOKEN } from '@/lib/storage-keys'
import { deleteCookie } from 'cookies-next'
import type { NextPageContext } from 'next'
import React from 'react'

const Page = () => <p>access denied</p>

Page.getLayout = (page: React.ReactElement) => {
  return (
    <>
      <CustomHead title="meta.title" />
      {page}
    </>
  )
}

export const getServerSideProps = async (context: NextPageContext) => {
  const { req, res } = context
  deleteCookie(TOKEN, { req, res })
  deleteCookie(ADMIN_TYPE, { req, res })
  return {
    redirect: {
      destination: '/login',
    },
  }
}

export default Page
