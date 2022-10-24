import React from "react";
import Layout from "../components/layout/Layout";
import utilStyles from "../styles/utils.module.css";
import { getTags } from "lib/posts";
import Link from "next/link";
import Head from "next/head";

import { useRouter } from "next/router";
import { tagObj } from "types";

export async function getStaticProps(props: any) {
    const tags = await getTags();

    return {
        props: {
            tags,
        },
    };
}

export default function TagList({ tags }: any) {
    const router = useRouter();
    const canonicalURL = process.env.NEXT_PUBLIC_HOME_URL + router.asPath;

    return (
        <Layout>
            <Head>
                <title>Posts</title>
                <link rel="canonical" href={canonicalURL} />
            </Head>
            <section className={`${utilStyles.padding1px}`}>
                {tags.map((tag: tagObj) => {
                    return (
                        <div key={tag.id} style={{ cursor: "pointer" }}>
                            <Link href={`/posts/${tag.name}`}>
                                <span className={utilStyles.headingXl}>[{tag.name}]</span>
                            </Link>
                        </div>
                    ); 
                })}
            </section>
        </Layout>
    );
}
