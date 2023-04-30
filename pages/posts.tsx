import React from "react";
import Layout from "../components/layout/Layout";
import utilStyles from "../styles/utils.module.css";
import { getTags } from "lib/posts";
import Link from "next/link";

import { Tag } from 'types'
import Opengraph from "components/Opengraph"

export async function getStaticProps(props: any) {
    const tags = await getTags()

    return {
        props: {
            tags,
        },
    }
}

interface TagListProps {
    tags: Tag[]
}

export default function TagList({ tags }: TagListProps) {
    return (
        <Layout>
            <Opengraph title="Posts" description="태그별 게시글" />

            <section className={`${utilStyles.padding1px}`}>
                {tags.map((tag: Tag) => {
                    return (
                        <div key={tag.id} style={{ cursor: 'pointer' }}>
                            <Link href={`/posts/${encodeURIComponent(tag.name)}?page=1`}>
                                <span className={utilStyles.headingXl}>[{tag.name}]</span>
                            </Link>
                        </div>
                    )
                })}
            </section>
        </Layout>
    )
}
