import React from "react";
import Head from "next/head";
import Layout from "../../components/layout/Layout";
import utilStyles from "../../styles/utils.module.css";
import { getAllNotionPostIds, getSinglePageById } from "../../lib/posts";
import { GetStaticPaths, GetStaticProps } from "next/types";
import PageSubInfo from "components/PageSubInfo";
import Opengraph from "components/Opengraph";

export const getStaticPaths: GetStaticPaths = async () => {
    const ids = await getAllNotionPostIds();

    return {
        paths: ids.map(id => `/post/${id}`),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async context => {
    // Fetch necessary data for the blog post using params.id
    const page = await getSinglePageById(context.params?.id as string);
    return {
        props: {
            page,
        },
    };
};

export default function Post({ page }: any) {
    return (
        <Layout commentable>
            <Opengraph title={page.title} description={page.subtitle} />
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-one-dark.min.css" />
            </Head>

            <header style={{ textAlign: "center" }}>
                <h1 className={utilStyles.headingXl}>{page.title}</h1>
                <PageSubInfo page={page} />
            </header>
            <article>
                <div className={utilStyles.content} dangerouslySetInnerHTML={{ __html: page.contentHtml }} />
            </article>
        </Layout>
    );
}
