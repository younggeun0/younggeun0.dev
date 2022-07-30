import React from "react";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from '../styles/utils.module.css';
import { Card, CardContent } from "@mui/material";
import { getSortedPostsData } from "lib/posts";
import Link from "next/link";
import Date from "components/date";

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
}

export default function Posts({ allPostsData }: any) {
    return (
        <Layout home={false}>
            <Head>
                <title>{siteTitle}</title>
            </Head>

            <section
                className={`${utilStyles.padding1px}`}
            >
                <h2 className={utilStyles.headingLg}>📝 Posts</h2>
                <ul className={utilStyles.list}>
                    {allPostsData.map(({ id, date, title }: any) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/posts/${id}`}>
                                <Card sx={{ boxShadow: 'none', border: "1px solid #dfdfdf" }}>
                                    <CardContent>
                                        <a className={utilStyles.headingMd}>{title}</a>
                                        <br />
                                        <small className={utilStyles.lightText}>
                                            <Date dateString={date} />
                                        </small>
                                    </CardContent>
                                </Card>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    );
}