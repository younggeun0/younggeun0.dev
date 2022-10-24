import React from "react";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import PageList from "../components/PageList";
import utilStyles from "../styles/utils.module.css";
import { getRecentPages } from "../lib/posts";
import { siteTitle } from "./_document";

export async function getStaticProps() {
    const recentPages = await getRecentPages();

    return {
        props: {
            recentPages,
        },
    };
}

export default function Home({ recentPages }: any) {
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>

            <section className={`${utilStyles.padding1px}`}>
                <PageList title="[...recent_posts🔥]" pages={recentPages} />
            </section>
        </Layout>
    );
}
