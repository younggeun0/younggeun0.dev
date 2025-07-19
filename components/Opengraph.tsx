'use client'
import Head from 'next/head'
import { usePathname } from 'next/navigation'
import React from 'react'
interface OpengraphProps {
  title?: string
  description?: string
  ogImg?: string
}

export default function Opengraph({
  title = '(younggeun0: 🐢) => dev',
  description = "developer young's webpage",
  ogImg = '/images/opengraph.jpeg',
}: OpengraphProps) {
  const pathname = usePathname()
  const canonicalURL = process.env.NEXT_PUBLIC_HOME_URL + pathname

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:url" content={canonicalURL} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImg} />

      <link rel="canonical" href={canonicalURL} />
    </Head>
  )
}
