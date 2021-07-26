import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { canonicalUrl } from 'src/pages/_document'

type Props = {
  children: ReactNode
  title?: string
  description?: string // 최대 120자
}

function PageHead({
  children,
  title = '회복 탄력성 검사',
  description = '회복 탄력성 검사를 제공하고 있어요',
}: Props) {
  const { pathname } = useRouter()

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:url" content={`${canonicalUrl}${pathname.slice(1)}`} />
        <meta property="og:site_name" content="회복 탄력성 검사" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="/favicon.ico" />
        <meta name="twitter:image:alt" content="회복 탄력성 검사" />
      </Head>
      {children}
    </>
  )
}

export default PageHead
