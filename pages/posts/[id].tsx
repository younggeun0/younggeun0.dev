import React from "react";
import Head from "next/head";
import Layout from "../../components/layout";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { GetStaticPaths, GetStaticProps } from "next/types";

export const getStaticPaths: GetStaticPaths = () => {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async context => {
    // Fetch necessary data for the blog post using params.id
    const postData = await getPostData(context.params?.id as string);
    return {
        props: {
            postData,
        },
    };
};

export default function Post({ postData }: any) {
    return (
        <Layout home={false}>
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-one-dark.min.css" />
                <title>{postData.title}</title>
            </Head>

            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            </article>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
            </div>
            <div className={utilStyles.content} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </Layout>
    );
}
