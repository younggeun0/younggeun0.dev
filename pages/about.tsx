import React from "react";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { Box, IconButton, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export default function About() {
    const { data: session, status } = useSession();
    
    return (
        <Layout home={true}>
            <Head>
                <title>About younggeun0</title>
            </Head>

            <article>
                <Box sx={{ margin: "3rem 0" }}>
                    <span className={utilStyles.headingXl}>
                        안녕하세요! 🙋🏻‍♂️
                        <br /> 개발자 오영근입니다
                        {" "}
                        <span
                            className={utilStyles.headingLg}
                            onClick={(e: any) => {
                                e.preventDefault();
                                if (session) {
                                    signOut();
                                } else {
                                    signIn();
                                }
                            }}
                        >
                            🐢
                        </span>
                    </span>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                    <Image priority src="/images/profile.jpeg" height={480} width={320} alt={"profile"} />
                </Box>
                <Box sx={{ margin: "5rem 0 0" }}>
                    <span className={utilStyles.headingXl}>Work Experience</span>
                    <hr />
                </Box>
                <Box sx={{ margin: "3rem 0" }}>
                    <span className={utilStyles.headingLg}>에버온</span>
                    <Typography variant="body2" className={utilStyles.body2}>
                        Frontend Developer
                        <br />
                        2022.03 - 현재
                    </Typography>
                    <br />
                    <Typography variant="body2" className={utilStyles.body2}>
                        <strong>Tech Stacks</strong>
                        <br />
                        React, NodeJS, PostgreSQL, Oracle
                    </Typography>
                    <br />
                    <Typography variant="body2" className={utilStyles.body2}>
                        차세대 관제 시스템을 개발중입니다
                    </Typography>
                </Box>
                {/* <hr style={{ color: "#333333"}} /> */}
                <Box sx={{ margin: "5rem 0" }}>
                    <span className={utilStyles.headingLg}>포시에스</span>
                    <Typography variant="body2" className={utilStyles.body2}>
                        Software Engineer
                        <br />
                        2019.06 - 2022.02
                    </Typography>
                    <br />
                    <Typography variant="body2" className={utilStyles.body2}>
                        <strong>Tech Stacks</strong>
                        <br />
                        HTML5, JavaScript, Java(Applet), ActionScript(Flash), Git
                    </Typography>
                    <br />
                    <Typography variant="body2" className={utilStyles.body2}>
                        OZ연구소 리포트2팀 신입 팀원으로 OZReport HTML Viewer 솔루션 개발업무를 담당했습니다
                        <ul style={{ paddingLeft: "20px" }}>
                            <li>뷰어 접근성 개선(스크린 리더)</li>
                            <li>MarkAny, SGA 바코드 솔루션 연동</li>
                            <li>뷰어 내 WYSIWYG 편집기 연동</li>
                            <li>opencv.js, zxing.js를 이용한 인감스캔 기능 개발</li>
                            <li>뷰어간 동기화하는 중계서버 모듈 개발</li>
                        </ul>
                    </Typography>
                </Box>

                <Box sx={{ margin: "5rem 0" }}>
                    <span className={utilStyles.headingLg}>미래융합정보기술</span>
                    <Typography variant="body2" className={utilStyles.body2}>
                        Intern
                        <br />
                        2018.01 - 2018.06
                    </Typography>
                    <br />
                    <Typography variant="body2" className={utilStyles.body2}>
                        인턴 사원으로 개발중이던 솔루션 QA 테스트를 수행했습니다
                    </Typography>
                </Box>

                <Box>
                    <span className={utilStyles.headingXl}>Other Experiences</span>
                    <hr />
                </Box>
                <Box sx={{ margin: "3rem 0" }}>
                    <span className={utilStyles.headingLg}>쌍용교육센터</span>
                    <Typography variant="body2" className={utilStyles.body2}>
                        Python&Java응용 SW실무개발자양성과정 수료
                        <br />
                        2018.10 - 2019.05
                    </Typography>
                </Box>

                <Box sx={{ margin: "5rem 0" }}>
                    <span className={utilStyles.headingLg}>영국 워킹홀리데이</span>
                    <Typography variant="body2" className={utilStyles.body2}>
                        YMS(Youth Mobility Scheme) Visa로 외국 생활
                        <br />
                        2015.06 - 2017.06
                    </Typography>
                    <br />
                    <Typography variant="body2" className={utilStyles.body2}>
                        직무와는 무관하지만 다양한 경험을 할 수 있었고 영어에 대한 두려움을 없애는 계기가 됐습니다
                    </Typography>
                </Box>

                <Box sx={{ margin: "5rem 0" }}>
                    <span className={utilStyles.headingLg}>동국대학교</span>
                    <Typography variant="body2" className={utilStyles.body2}>
                        멀티미디어공학과 졸업
                        <br />
                        2010.03 - 2018.08
                    </Typography>
                </Box>

                <Box sx={{ margin: "5rem 0 0" }}>
                    <span className={utilStyles.headingXl}>Contact</span>
                    <hr />
                </Box>
                <Box sx={{ display: "flex", margin: "3rem 0 5rem", justifyContent: "space-around" }}>
                    <IconButton
                        size="large"
                        color="default"
                        aria-label="email"
                        component="label"
                        onClick={() => {
                            location.href = "mailto:dureng5@gmail.com";
                        }}
                    >
                        <EmailIcon fontSize="large" />
                    </IconButton>
                    <IconButton
                        size="large"
                        color="default"
                        aria-label="github"
                        component="label"
                        onClick={() => {
                            location.href = "https://github.com/younggeun0";
                        }}
                    >
                        <GitHubIcon fontSize="large" />
                    </IconButton>
                </Box>
            </article>
        </Layout>
    );
}
