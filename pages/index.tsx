import React from "react";
import Layout from "../components/layout/Layout";
import PageList from "../components/PageList";
import utilStyles from "../styles/utils.module.css";
import { getRecentPages } from "../lib/posts";
import Opengraph from "components/Opengraph";

export async function getServerSideProps() {
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
            <Opengraph title="Recent Posts" description="최근 게시글" />

            <section className={`${utilStyles.padding1px}`}>
                <PageList title="[...recent_posts🔥]" pages={recentPages} />
            </section>
        </Layout>
    );
}
