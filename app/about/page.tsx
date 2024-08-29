import Image from 'next/image'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkPrism from 'remark-prism'

import { getReadmeMarkmdown } from '@/lib/markdown'
import Opengraph from 'components/Opengraph'
import '../../styles/prism-one-dark.css'

export default async function About() {
    const readme = await getReadmeMarkmdown()

    return (
        <>
            <Opengraph title="About Young" description="young's resume" />
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkPrism]}>{readme ?? ''}</ReactMarkdown>
            <Image priority src="/images/profile.jpeg" height={480} width={320} alt={'profile'} />
        </>
    )
}
