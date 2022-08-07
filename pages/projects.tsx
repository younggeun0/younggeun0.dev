import React from "react";
import Layout from "../components/layout";
import utilStyles from '../styles/utils.module.css';
import { Card, CardContent, Typography } from "@mui/material";
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
            <section className={`${utilStyles.padding1px}`}>
                <div className={utilStyles.rotateTitleBy1Deg}>
                    <span className={`${utilStyles.headingXl}`}>[...projects🧑🏻‍💻]</span>
                </div>
                <ul className={utilStyles.list} style={{ marginTop: "10px" }}>
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
