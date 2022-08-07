import React, { Fragment, useState } from "react";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { Card, CardContent } from "@mui/material";
import { getSortedPostsData } from "lib/posts";
import Link from "next/link";
import DateComponent from "components/date";
import { format } from "date-fns";
import { useEffect } from "react";

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();

    const allPostsDataSplitByYear = allPostsData.reduce((acc: any, post: any) => {
        const year = format(new Date(post.date), "yyyy");
        // console.log(year);
        return {
            ...acc,
            [year]: acc[year] ? [...acc[year], post] : [post],
        };
    }, {});

    return {
        props: {
            allPostsDataSplitByYear,
        },
    };
}

export default function Posts({ allPostsDataSplitByYear }: any) {
    const [openState, setOpenState] = useState<any>({});

    useEffect(() => {
        const initOpenState = Object.keys(allPostsDataSplitByYear)
            .reverse()
            .reduce((acc, year, idx) => {
                return {
                    ...acc,
                    [year]: false,
                };
            }, {});

        setOpenState(initOpenState);
    }, [allPostsDataSplitByYear]);

    return (
        <Layout>
            <section className={`${utilStyles.padding1px}`}>
                {Object.keys(allPostsDataSplitByYear)
                    .reverse()
                    .map(year => {
                        return (
                            <Fragment key={year}>
                                <details
                                    open={openState[year]}
                                    onToggle={(e: any) => {
                                        setOpenState({
                                            ...openState,
                                            [year]: !openState[year],
                                        });
                                    }}
                                >
                                    <summary className={openState[year] ? utilStyles.rotateTitleBy1Deg : ""}>
                                        <span className={`${utilStyles.headingXl}`}>[{openState[year] ? "..." : ""}posts_{year}]</span>
                                    </summary>
                                    <ul onClick={e => e.preventDefault()} className={utilStyles.list} style={{ marginTop: "10px" }}>
                                        {allPostsDataSplitByYear[year].map(({ id, date, title }: any) => {
                                            return (
                                                <li className={utilStyles.listItem} key={id}>
                                                    <Link href={`/posts/${id}`}>
                                                        <Card sx={{ boxShadow: "none", border: "1px solid #dfdfdf" }}>
                                                            <CardContent>
                                                                <a className={utilStyles.headingMd}>{title}</a>
                                                                <br />
                                                                <small className={utilStyles.lightText}>
                                                                    <DateComponent dateString={date} />
                                                                </small>
                                                            </CardContent>
                                                        </Card>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </details>
                            </Fragment>
                        );
                    })}
            </section>
        </Layout>
    );
}
