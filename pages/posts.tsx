import React from "react";
import Layout from "../components/layout/Layout";
import utilStyles from "../styles/utils.module.css";
import { getTags } from "lib/posts";
import Link from "next/link";

import { useRouter } from "next/router";
import { tagObj } from "types";
import Opengraph from "components/Opengraph";

export async function getServerSideProps() {
    const tags = await getTags();
    return {
        props: {
            tags,
        },
    };
}

export default function TagList({ tags }: any) {
    const router = useRouter();

    return (
        <Layout>
            <Opengraph title="Posts" description="태그별 게시글" />

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
