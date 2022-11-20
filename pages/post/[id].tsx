import React from "react";
import Head from "next/head";
import Layout from "../../components/layout/Layout";
import utilStyles from "../../styles/utils.module.css";
import { getSinglePageById } from "../../lib/posts";
import { GetServerSideProps } from "next/types";
import PageSubInfo from "components/PageSubInfo";
import Opengraph from "components/Opengraph";

export const getServerSideProps: GetServerSideProps = async context => {
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
