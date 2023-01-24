import type { NextPage } from 'next'
import Head from 'next/head'
import NewSafe from '@/components/welcome/NewSafe'

const Welcome: NextPage = () => {
  return (
    <>
      <Head>
        <title>ThunderCore Safe – Welcome</title>
      </Head>

      <NewSafe />
    </>
  )
}

export default Welcome
