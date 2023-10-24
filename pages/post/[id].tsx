import React from "react";
import Head from "next/head";
import Layout from "../../components/layout/Layout";
import utilStyles from "../../styles/utils.module.css";
import { getAllNotionPostIds, getSinglePageById } from "../../lib/posts";
import { GetStaticPaths, GetStaticProps } from "next/types";
import PageSubInfo from "components/PageSubInfo";
import Opengraph from "components/Opengraph";
import { IMAGE_SIZE } from 'lib/constants'
import { Page } from 'types'

export const getStaticPaths: GetStaticPaths = async () => {
    const ids = await getAllNotionPostIds()

    return {
        paths: ids.map(id => `/post/${id}`),
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async context => {
    // Fetch necessary data for the blog post using params.id
    const page = await getSinglePageById(context.params?.id as string)
    return {
        props: {
            page,
        },
    }
}

interface PostProps {
    page: Page
}

export default function Post({ page }: PostProps) {
    return (
        <Layout commentable>
            <Opengraph title={page.title} description={page.subtitle} />
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-one-dark.min.css"
                />
            </Head>

            <header style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {page.icon?.type === 'external' && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            alt={''}
                            src={page.icon.external?.url!}
                            width={IMAGE_SIZE}
                            height={IMAGE_SIZE}
                            style={{
                                display: 'inline-flex',
                                margin: 0,
                                marginRight: '15px',
                                minWidth: IMAGE_SIZE,
                                maxWidth: IMAGE_SIZE,
                                objectFit: 'contain',
                            }}
                        />
                    )}
                    {page.icon?.type === 'emoji' && (
                        <div
                            style={{
                                fontSize: IMAGE_SIZE,
                                marginRight: '15px',
                            }}
                        >
                            {page.icon.emoji}
                        </div>
                    )}
                    <h1 className={utilStyles.headingXl}>{page.title}</h1>
                </div>
                <PageSubInfo page={page} />
            </header>
            <article>
                <div className={utilStyles.content} dangerouslySetInnerHTML={{ __html: page.contentHtml }} />
            </article>
        </Layout>
    )
}
