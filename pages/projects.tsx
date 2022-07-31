import React from "react";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from '../styles/utils.module.css';
import { Box, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import { getProjectData } from "lib/posts";
import Link from "next/link";
import Date from "components/date";

export async function getStaticProps() {
    const allProjectData = getProjectData();
    return {
        props: {
            allProjectData,
        },
    };
}

export default function Projects({ allProjectData }: any) {
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>


            <section
                className={`${utilStyles.padding1px}`}
            >
                <h2 className={utilStyles.headingLg}>🧑🏻‍💻 Projects</h2>
                <ul className={utilStyles.list}>
                    {allProjectData.map(({ id, date, title }: any) => (
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
