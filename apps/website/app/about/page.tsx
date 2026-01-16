import Image from 'next/image'
import React from 'react'

import StickyClassAdder from '../../components/StickyClassAdder'

import MDXContent from '@/components/MDXContent'
import Opengraph from '@/components/Opengraph'
import { getMarkdown } from '@/lib/markdown'

import '../../styles/prism-one-light.css'

export default async function About() {
  const readme = await getMarkdown()

  return (
    <>
      <Opengraph title="About Young" description="young's resume" />

      <MDXContent source={readme ?? ''} />

      <Image priority src="/profile.jpeg" height={480} width={320} alt={'Portrait of Younggeun Oh'} className="pb-[7px]" />

      <StickyClassAdder />
    </>
  )
}
