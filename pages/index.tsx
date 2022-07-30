import React from "react";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import Link from "next/link";
import Date from "../components/date";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import { Card, CardContent } from "@mui/material";

export async function getStaticProps() {
    const recentPostsData = getSortedPostsData(true);
    return {
        props: {
            recentPostsData,
        },
    };
}

export default function Home({ recentPostsData }: any) {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>


            <section
                className={`${utilStyles.padding1px}`}
            >
                <h2 className={utilStyles.headingLg}>Recent Posts 🔥</h2>
                <ul className={utilStyles.list}>
                    {recentPostsData.map(({ id, date, title }: any) => (
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
