import React from "react";
import Head from "next/head";
import Layout from "../../components/layout";
import DateComp from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { getAllNotionPostIds, getSingleNotionPost } from "../../lib/posts";
import { GetStaticPaths, GetStaticProps } from "next/types";

export const getStaticPaths: GetStaticPaths = async () => {
    const ids = await getAllNotionPostIds();

    return {
        paths: ids.map(id => `/posts/${id}`),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async context => {
    // Fetch necessary data for the blog post using params.id
    const postData = await getSingleNotionPost(context.params?.id as string);
    return {
        props: {
            postData,
        },
    };
};

export default function Post({ postData }: any) {
    return (
        <Layout commentable>
            <Head>
                <meta name="description" content={postData.title} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={postData.title} />
                <meta property="og:description" content={postData.title} />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-one-dark.min.css" />
                <title>{postData.title}</title>
            </Head>

            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            </article>
            <div className={utilStyles.lightText}>
                <DateComp dateString={postData.date} />
            </div>
            <div className={utilStyles.content} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </Layout>
    );
}
