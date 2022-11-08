import React from "react";
import Layout from "../components/layout/Layout";
import utilStyles from "../styles/utils.module.css";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Opengraph from "components/Opengraph";

export default function About() {
    
    return (
        <Layout>
            <Opengraph title="About Young" description="young's resume" />

            <article>
                <Box sx={{ margin: "3rem 0" }}>
                    <span className={utilStyles.heading2Xl}>
                        안녕하세요!
                        <br />웹 개발자 오영근입니다 🐢
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
                    <span className={utilStyles.headingLg}>메디쿼터스 Mediquitous</span>
                    <Typography variant="body2" className={utilStyles.body2}>
                        Web Developer
                        <br />
                        2022.11 ~
                    </Typography>
                    <br />
                    {/* <Typography variant="body2" className={utilStyles.body2}>
                        <strong>Tech Stacks</strong>
                        <br />
                        Frontend : ReactJS(react-admin, mui)
                        <br />
                        Backend : Node.JS(Express.js), Spring
                        <br />
                        Database: PostgreSQL, Oracle
                        <br />
                        SCM: Gitlab
                    </Typography>
                    <br />
                    <Typography variant="body2" className={utilStyles.body2}>
                        사내에서 사용할 차세대 포털 서비스 개발을 담당했습니다
                        <br />
                        ・ Keycloak을 이용한 SSO 구현, Dooray! 그룹웨어 연동
                        <br />
                        ・ nivo를 이용한 통계 대시보드 구축
                        <br />
                        ・ 칸반보드 형태의 VOC 관리 서비스 개발
                        <br />
                        ・ Express.js 백앤드 서버 SpringBoot로 이관
                        <br />
                        ・ SCM을 SVN에서 Gitlab으로 이관
                        <br />
                        ・ 사내 스터디 개설, 운영
                    </Typography> */}
                </Box>
                <Box sx={{ margin: "3rem 0" }}>
                    <span className={utilStyles.headingLg}>에버온 everon</span>
                    <Typography variant="body2" className={utilStyles.body2}>
                        Web Developer
                        <br />
                        2022.03 - 2022.10
                    </Typography>
                    <br />
                    <Typography variant="body2" className={utilStyles.body2}>
                        <strong>Tech Stacks</strong>
                        <br />
                        Frontend : ReactJS(react-admin, mui)
                        <br />
                        Backend : Node.JS(Express.js), Spring
                        <br />
                        Database: PostgreSQL, Oracle
                        <br />
                        SCM: Gitlab
                    </Typography>
                    <br />
                    <Typography variant="body2" className={utilStyles.body2}>
                        사내에서 사용할 차세대 포털 서비스 개발을 담당했습니다
                        <br />
                        ・ Keycloak을 이용한 SSO 구현, Dooray! 그룹웨어 연동
                        <br />
                        ・ nivo를 이용한 통계 대시보드 구축
                        <br />
                        ・ 칸반보드 형태의 VOC 관리 서비스 개발
                        <br />
                        ・ Express.js 백앤드 서버 SpringBoot로 이관
                        <br />
                        ・ SCM을 SVN에서 Gitlab으로 이관
                        <br />
                        ・ 사내 스터디 개설, 운영
                    </Typography>
                </Box>
                <Box sx={{ margin: "5rem 0" }}>
                    <span className={utilStyles.headingLg}>포시에스 FORCS</span>
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
                        ・ 뷰어 내용을 스크린 리더(센스리더)로 읽을 수 있도록 접근성 개선
                        <br/>
                        ・ 전자문서 출력 시 인증 바코드 솔루션 연동(MarkAny, SGA)
                        <br/>
                        ・ 뷰어에 WYSIWYG 편집기(summernote.js) 임배딩 기능 개발
                        <br/>
                        ・ WebRTC, opencv.js, zxing.js 라이브러리를 이용한 인감스캔, 카드스캔 기능 개발
                        <br/>
                        ・ 뷰어 동기화 중계서버 모듈을 개발
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
            </article>
        </Layout>
    );
}
