import React from "react";
import Head from "next/head";
import Layout from "../../components/layout/Layout";
import utilStyles from "../../styles/utils.module.css";
import { getPagesByTag, getTags } from "../../lib/posts";
import { GetStaticPaths, GetStaticProps } from "next/types";
import PageList from "components/PageList";

export const getStaticPaths: GetStaticPaths = async () => {
    const tags = await getTags();

    return {
        paths: tags.map(tag => `/posts/${tag.name}`),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async context => {
    const tagName = context.params?.tag;
    const pages = await getPagesByTag(tagName as string);

    return {
        props: {
            tagName,
            pages,
        },
    };
};

export default function Post({ tagName, pages }: any) {
    return (
        <Layout commentable={false}>
            <Head>
                <title>{tagName}</title>
            </Head>
            <section className={`${utilStyles.padding1px}`}>
                <PageList title={`[...${tagName}]`} pages={pages} />
            </section>
        </Layout>
    );
}