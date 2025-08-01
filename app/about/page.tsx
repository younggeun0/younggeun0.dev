import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkPrism from 'remark-prism'

import { getMarkmdown } from '@/lib/markdown'
import Opengraph from 'components/Opengraph'

import '../../styles/prism-one-light.css'
import StickyClassAdder from '../../components/StickyClassAdder'

export default async function About() {
  const readme = await getMarkmdown()

  return (
    <>
      <Opengraph title="About Young" description="young's resume" />
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkPrism]}>{readme ?? ''}</ReactMarkdown>

      <Image priority src="/profile.jpeg" height={480} width={320} alt={'profile'} />

      <StickyClassAdder />
    </>
  )
}

