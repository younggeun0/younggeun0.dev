import React from "react";
import Layout from "../../components/layout/Layout";
import utilStyles from "../../styles/utils.module.css";
import { getPagesByTag } from "../../lib/posts";
import { GetServerSideProps } from "next/types";
import PageList from "components/PageList";
import Opengraph from "components/Opengraph";

export const getServerSideProps: GetServerSideProps = async context => {
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
            <Opengraph title={`Posts about ${tagName}...`} description={`${tagName}관련 게시글`} />
            <section className={`${utilStyles.padding1px}`}>
                <PageList title={`[...${tagName}]`} pages={pages} />
            </section>
        </Layout>
    );
}
