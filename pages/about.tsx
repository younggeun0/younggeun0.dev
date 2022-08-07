import React, { useContext } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { Box, IconButton, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { ThemeContext } from "context/ThemeContext";

export default function About() {
    const { data: session, status } = useSession();
    const { theme } = useContext(ThemeContext);
    
    return (
        <Layout>
            <Head>
                <title>About younggeun0</title>
            </Head>

            <article>
                <Box sx={{ margin: "3rem 0" }}>
                    <span className={utilStyles.heading2Xl}>
                        안녕하세요! 🙋🏻‍♂️
                        <br /> 개발자 오영근입니다
                        {" "}
                        <span
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
                        <br/>
                        ・ 스크린 리더로 뷰어 텍스트를 읽을 수 있도록 접근성을 개선했습니다
                        <br/>
                        ・ 전자문서 출력 시 MarkAny, SGA 솔루션 바코드가 같이 출력되는 연동작업을 했습니다
                        <br/>
                        ・ 뷰어 내용을 수정가능하도록 WYSIWYG 편집기(summernote.js)를 임배딩했습니다
                        <br/>
                        ・ webrtc, opencv.js, zxing.js를 이용하여 인감스캔 기능을 개발했습니다
                        <br/>
                        ・ 뷰어 동기화를 위한 중계서버 모듈을 개발했습니다
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
                        인턴 사원으로 개발중이던 솔루션 QA 업무를 수행했습니다
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
                {theme && (
                    <Box sx={{ display: "flex", margin: "3rem 0 5rem", justifyContent: "space-around" }}>
                        <IconButton
                            size="large"
                            color="default"
                            aria-label="email"
                            component="label"
                            sx={{
                                color: theme.type === "light" ? "black" : "white",
                                opacity: 0.5,
                            }}
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
                            sx={{
                                color: theme.type === "light" ? "black" : "white",
                                opacity: 0.5,
                            }}
                            onClick={() => {
                                location.href = "https://github.com/younggeun0";
                            }}
                        >
                            <GitHubIcon fontSize="large" />
                        </IconButton>
                    </Box>
                )}
            </article>
        </Layout>
    );
}
