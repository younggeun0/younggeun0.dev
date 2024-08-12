import React, { useEffect } from 'react'
import Layout from '../components/layout/Layout'
import utilStyles from '../styles/utils.module.css'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import Opengraph from 'components/Opengraph'
import GitHubIcon from '@mui/icons-material/GitHub'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import customPraseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(duration)
dayjs.extend(relativeTime)
dayjs.extend(customPraseFormat)

function calculateYearMonthDiff(from: string, to: string) {
    const startDate = dayjs(from, 'YYYY.MM')
    let endDate = null
    if (to === '현재') {
        endDate = dayjs()
    } else {
        endDate = dayjs(to, 'YYYY.MM')
    }

    const years = endDate.diff(startDate, 'year')
    const months = endDate.diff(startDate, 'month') % 12

    let message = ''
    if (years !== 0) message += `${years}년`
    if (months !== 0) message += `${months}개월`

    return message
}

function GitHubLink({ url, name }: { url: string; name: string }) {
    return (
        <div style={{ display: 'inline-block' }}>
            <a href={url} target="_blank" rel="noopener noreferrer">
                <GitHubIcon fontSize="inherit" style={{ marginRight: '0.2rem' }} />
                {name}
            </a>
        </div>
    )
}

export default function About() {
    useEffect(() => {
        const style = document.createElement('style')
        style.innerHTML = `
            @keyframes moveRight {
                0% {
                    left: -100%;
                }
                100% {
                    left: 0%;
                }
            }
        `
        document.head.appendChild(style)
        return () => {
            document.head.removeChild(style)
        }
    }, [])

    return (
        <Layout>
            <Opengraph title="About Young" description="young's resume" />

            <article>
                <Box sx={{ margin: '3rem 0' }}>
                    <span className={utilStyles.heading2Xl} style={{ cursor: 'pointer' }}>
                        안녕하세요!
                        <br />웹 개발자 오영근입니다 <span className={utilStyles.heading2Xl}>🐢</span>
                    </span>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: '320px', height: '480px', position: 'relative', overflow: 'hidden' }}>
                        <Image priority src="/images/profile.jpeg" height={480} width={320} alt={'profile'} />
                        {false && (
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: '15px',
                                    padding: '8px 0',
                                    width: '100%',
                                    background: 'rgba(255, 250, 160, 0.5)',
                                }}
                            >
                                <strong
                                    style={{
                                        position: 'relative',
                                        display: 'inline-block',
                                        whiteSpace: 'nowrap',
                                        animation: 'moveRight 5s linear infinite',
                                    }}
                                >
                                    {'HIRE ME '.repeat(15)}
                                </strong>
                            </div>
                        )}
                    </div>
                </Box>
                <Box sx={{ margin: '5rem 0 0' }}>
                    <span className={utilStyles.headingXl}>Work Experience</span>
                    <hr />
                </Box>
                <Box sx={{ margin: '3rem 0' }}>
                    <span className={utilStyles.headingLg}>메디쿼터스 Mediquitous</span>
                    <Typography variant="body2" className={utilStyles.body2}>
                        Web Developer
                        <br />
                        2022.11 ~ 현재 ({calculateYearMonthDiff('2022.11', '현재')})
                    </Typography>
                    <br />
                    <Typography variant="body2" className={utilStyles.body2}>
                        <strong>Tech Stacks</strong>
                        <br />
                        React(
                        <GitHubLink name="next.js" url="https://github.com/vercel/next.js" />
                        ), Svelte(
                        <GitHubLink name="sveltekit" url="https://github.com/sveltejs/kit" />)
                        <br />
                        Django(
                        <GitHubLink
                            name="django-rest-framework"
                            url="https://github.com/encode/django-rest-framework"
                        />
                        )
                        <br />
                        Django ORM(PostgreSQL)
                        <br />
                        Github
                    </Typography>
                    <br />
                    <Typography variant="body2" className={utilStyles.body2}>
                        일본 커머스 플랫폼 <a href="https://nugu.jp/">nugu</a> 개발중입니다.
                        <br />
                        ・ cafe24에서 자사 플랫폼으로 이관 <br />
                        &nbsp;&nbsp; ・ 어드민 게시물관리 기능 개발(
                        <GitHubLink url="https://github.com/tinymce/tinymce" name="tinymce" />,{' '}
                        <GitHubLink url="https://github.com/ajaxorg/ace" name="ace" />,{' '}
                        <GitHubLink url="https://github.com/dropzone/dropzone" name="dropzone" />) <br />
                        &nbsp;&nbsp; ・ 어드민 카테고리관리 기능 개발(
                        <GitHubLink url="https://github.com/mar10/fancytree" name="fancytree" />) <br />
                        &nbsp;&nbsp; ・ 어드민 상품관리 기능 개발 <br />
                        &nbsp;&nbsp; ・ 어드민 - 셀메이트 상품동기화 기능 개발
                        <br />・ NUGU PRO 퍼블리싱(
                        <a href="https://www.nugu.jp/product?displaygroup=3572">Bibiy</a>,{' '}
                        <a href="https://www.nugu.jp/product?displaygroup=4103">ADAM ET ROPE</a>,{' '}
                        <a href="https://www.nugu.jp/product?displaygroup=4461">DISCOAT</a>,{' '}
                        <a href="https://www.nugu.jp/product?displaygroup=5397">AMUSE</a>) <br />
                    </Typography>
                </Box>
                <Box sx={{ margin: '3rem 0' }}>
                    <span className={utilStyles.headingLg}>에버온 everon</span>
                    <Typography variant="body2" className={utilStyles.body2}>
                        Web Developer
                        <br />
                        2022.03 - 2022.10 ({calculateYearMonthDiff('2022.03', '2022.10')})
                    </Typography>
                    <br />
                    <Typography variant="body2" className={utilStyles.body2}>
                        <strong>Tech Stacks</strong>
                        <br />
                        React(
                        <GitHubLink name="react-admin" url="https://github.com/marmelab/react-admin" />,{' '}
                        <GitHubLink name="mui" url="https://mui.com/" />)
                        <br />
                        Node(
                        <GitHubLink name="express" url="https://github.com/expressjs/express" />
                        ), Spring
                        <br />
                        PostgreSQL, Oracle
                        <br />
                        GitLab
                    </Typography>
                    <br />
                    <Typography variant="body2" className={utilStyles.body2}>
                        사내에서 사용할 차세대 포털 서비스 개발을 담당했습니다.
                        <br />
                        ・ Keycloak을 이용한 SSO 구현, Dooray! 그룹웨어 연동
                        <br />
                        ・ <GitHubLink url="https://github.com/plouc/nivo" name="nivo" />를 이용한 통계 대시보드 구축
                        <br />
                        ・ 칸반보드 형태의 고객문의관리 서비스 개발
                        <br />
                        ・ Express.js 백앤드 서버 SpringBoot로 이관
                        <br />
                        ・ SCM을 SVN에서 Gitlab으로 이관
                        <br />・ 사내 스터디 개설, 운영
                    </Typography>
                </Box>
                <Box sx={{ margin: '3rem 0' }}>
                    <span className={utilStyles.headingLg}>포시에스 FORCS</span>
                    <Typography variant="body2" className={utilStyles.body2}>
                        Software Engineer
                        <br />
                        2019.06 - 2022.02 ({calculateYearMonthDiff('2019.06', '2022.02')})
                    </Typography>
                    <br />
                    <Typography variant="body2" className={utilStyles.body2}>
                        <strong>Tech Stacks</strong>
                        <br />
                        HTML5, JavaScript, Java(Applet), ActionScript(Flash), Git
                    </Typography>
                    <br />
                    <Typography variant="body2" className={utilStyles.body2}>
                        OZ연구소 리포트2팀 신입 팀원으로 OZReport HTML Viewer 솔루션 개발업무를 담당했습니다.
                        <br />
                        ・ 뷰어 내용을 스크린 리더(센스리더)로 읽을 수 있도록 접근성 개선
                        <br />
                        ・ 전자문서 출력 시 인증 바코드 솔루션 연동(MarkAny, SGA)
                        <br />
                        ・ 뷰어에 WYSIWYG 편집기(
                        <GitHubLink name="summernote" url="https://github.com/summernote/summernote" />) 임배딩 기능
                        개발
                        <br />
                        ・ WebRTC, <GitHubLink name="opencv-js" url="https://github.com/TechStark/opencv-js" />,{' '}
                        <GitHubLink name="zxing" url="https://github.com/zxing/zxing" /> 라이브러리를 이용한 인감스캔,
                        카드스캔 기능 개발
                        <br />・ 뷰어 동기화 중계서버 모듈을 개발
                    </Typography>
                </Box>

                <Box sx={{ margin: '3rem 0' }}>
                    <span className={utilStyles.headingLg}>미래융합정보기술</span>
                    <Typography variant="body2" className={utilStyles.body2}>
                        Intern
                        <br />
                        2018.01 - 2018.06 ({calculateYearMonthDiff('2018.01', '2018.06')})
                    </Typography>
                    <br />
                    <Typography variant="body2" className={utilStyles.body2}>
                        인턴 사원으로 개발중이던 솔루션 QA 업무를 수행했습니다.
                    </Typography>
                </Box>

                <Box>
                    <span className={utilStyles.headingXl}>Other Experiences</span>
                    <hr />
                </Box>
                <Box sx={{ margin: '3rem 0' }}>
                    <span className={utilStyles.headingLg}>쌍용교육센터</span>
                    <Typography variant="body2" className={utilStyles.body2}>
                        Python&Java응용 SW실무개발자양성과정 수료
                        <br />
                        2018.10 - 2019.05 ({calculateYearMonthDiff('2018.10', '2019.05')})
                    </Typography>
                </Box>

                <Box sx={{ margin: '3rem 0' }}>
                    <span className={utilStyles.headingLg}>영국 워킹홀리데이</span>
                    <Typography variant="body2" className={utilStyles.body2}>
                        YMS(Youth Mobility Scheme) Visa로 외국 생활
                        <br />
                        2015.06 - 2017.06 ({calculateYearMonthDiff('2015.06', '2017.06')})
                    </Typography>
                </Box>

                <Box sx={{ margin: '3rem 0' }}>
                    <span className={utilStyles.headingLg}>동국대학교</span>
                    <Typography variant="body2" className={utilStyles.body2}>
                        멀티미디어공학과 졸업
                        <br />
                        2010.03 - 2018.08
                    </Typography>
                </Box>
            </article>
        </Layout>
    )
}
