import React from 'react'
import Layout from '../components/layout/Layout'
import PageList from '../components/PageList'
import utilStyles from '../styles/utils.module.css'
import { getRecentPages } from '../lib/posts'
import Opengraph from 'components/Opengraph'

export async function getServerSideProps() {
    // const recentPages = await getRecentPages();
    return {
        props: {},
    }
}

export default function Pomodoro(props: any) {
    return (
        <Layout>
            <Opengraph title="Pomodoro" description="포모도로 로그" />
            {/* TODO
                1. 노션에 업무 일지 작성, 포모도로 기록
                2. 노션에 작성된 포모도로 기록을 토대로 포모도로 페이지에 github contribution graph와 동일한 형태로 표현
            */}

            <section className={`${utilStyles.padding1px}`}>
                <h1>404 🚧 작업중입니다</h1>
            </section>
        </Layout>
    )
}
