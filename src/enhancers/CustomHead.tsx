import { useTranslation } from 'next-i18next'
import Head from 'next/head'

interface CustomHeadProps {
  title: string
}

const CustomHead = (props: CustomHeadProps) => {
  const { t } = useTranslation()
  const trans = (key: string) => t(key, { ns: 'meta' })

  return (
    <Head>
      <title>{trans(props.title)}</title>
      <meta name="title" content={trans(props.title)} />
    </Head>
  )
}

export default CustomHead
