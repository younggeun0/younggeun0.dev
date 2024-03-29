import React from "react";
import Layout from "../../components/layout/Layout";
import utilStyles from "../../styles/utils.module.css";
import { getPagesByTag, getTags } from "../../lib/posts";
import { GetStaticPaths, GetStaticProps } from "next/types";
import PageList from "components/PageList";
import Opengraph from "components/Opengraph";
import { Page } from 'types'

export const getStaticPaths: GetStaticPaths = async () => {
    const tags = await getTags()

    return {
        paths: tags.map(tag => `/posts/${encodeURIComponent(tag.name)}`),
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async context => {
    const tagName = context.params?.tag
    const pages = await getPagesByTag(tagName as string)

    return {
        props: {
            tagName,
            pages,
        },
    }
}

interface PostsProps {
    tagName: string
    pages: Page[]
}

export default function Posts({ tagName, pages }: PostsProps) {
    return (
        <Layout commentable={false}>
            <Opengraph title={`Posts about ${tagName}...`} description={`${tagName}관련 게시글`} />
            <section className={`${utilStyles.padding1px}`}>
                <PageList title={`[...${tagName}]`} pages={pages} />
            </section>
        </Layout>
    )
}
