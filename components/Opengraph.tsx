import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

interface OpengraphProps {
    title?: string
    description?: string
    ogImg?: string
}

const siteTitle = '(younggeun0: 🐢) => dev'

export default function Opengraph({
    title = siteTitle,
    description = "young's blog",
    ogImg = '/images/opengraph.jpeg',
}: OpengraphProps) {
    const router = useRouter()
    const canonicalURL = process.env.NEXT_PUBLIC_HOME_URL + router.asPath

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
