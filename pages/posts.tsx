import React, { Fragment, useState } from "react";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { Card, CardContent } from "@mui/material";
import { getSortedPostsData } from "lib/posts";
import Link from "next/link";
import DateComponent from "components/date";
import { format } from "date-fns";
import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export async function getStaticProps(props: any) {
    const allPostsData = getSortedPostsData();
    const allPostsDataSplitByTag = allPostsData.reduce((acc: any, post: any) => {
        if (post.tags) {
            post.tags.forEach((tag: string)=> {
                if (!acc[tag]) acc[tag] = [];

                acc[tag].push(post);
            });
        }
        return acc;
    }, {});
    
    const allPostsDataSplitByYear = allPostsData.reduce((acc: any, post: any) => {
        const year = format(new Date(post.date), "yyyy");
        return {
            ...acc,
            [year]: acc[year] ? [...acc[year], post] : [post],
        };
    }, {});

    return {
        props: {
            allPostsDataSplitByYear,
            allPostsDataSplitByTag,
        },
    };
}

export default function Posts({ allPostsDataSplitByYear, allPostsDataSplitByTag }: any) {
    const [openState, setOpenState] = useState<any>({});
    const router = useRouter();
    const canonicalURL = process.env.NEXT_PUBLIC_HOME_URL + router.asPath;
    const { tag } = router.query;
    // const [theme, setTheme] = useState("light");
    // useEffect(() => {
    //     if (typeof window !== "undefined") {
    //         setTheme((window as any).__theme);
    //     }
    // }, [(window as any).__theme]);

    useEffect(() => {
        const initOpenState = Object.keys(allPostsDataSplitByYear)
            .reduce((acc, year, idx) => {
                return {
                    ...acc,
                    [year]: false,
                };
            }, {});
        setOpenState(initOpenState);
    }, []);

    return (
        <Layout>
            <Head>
                <title>Young's Posts</title>
                <link rel="canonical" href={canonicalURL} />
            </Head>
            {/* TODO, Style 정리, 외부 스타일 라이브러리 사용해서 일관되게 수정할 것 */}
            {/* TODO, 모바일 환경에서 게시글 그룹 메뉴 반응형 수정 필요 */}
            {/* <aside className={`${utilStyles.categoryMenu}`}>
                <div style={{ borderBottom: `1px solid white` }}>
                    <Link href={`/posts`}>
                        All Posts
                    </Link>
                </div>
                {Object.keys(allPostsDataSplitByTag).map((tag: string, idx: number) => {
                    return (
                        <div key={idx}>
                            <Link href={`/posts?tag=${tag}`}>
                                {tag}
                            </Link>
                        </div>
                    );
                })}
            </aside> */}
            <section className={`${utilStyles.padding1px}`}>
                {tag && allPostsDataSplitByTag[tag as string] && (
                    <>
                        <div className={utilStyles.rotateTitleBy1Deg}>
                            <span className={`${utilStyles.headingXl}`}>[...{tag}]</span>
                        </div>
                        <ul onClick={e => e.preventDefault()} className={utilStyles.list} style={{ marginTop: "10px" }}>
                            {allPostsDataSplitByTag[tag as string].map(({ id, date, title }: any) => {
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
                    </>
                )}
            
                {!tag && Object.keys(allPostsDataSplitByYear)
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
