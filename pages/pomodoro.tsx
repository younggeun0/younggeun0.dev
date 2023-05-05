import React, { useEffect } from 'react'
import Layout from '../components/layout/Layout'
import utilStyles from '../styles/utils.module.css'
import Opengraph from 'components/Opengraph'
import PomodoroCounter from 'components/PomodoroCounter'
import { useSession } from 'next-auth/react'
// import { Heatmap } from 'contribution-heatmap'

export async function getServerSideProps() {
    // TODO, 모든 뽀모도로 가져와서 히트맵으로 표현
    // const allPomodoros = getAllPomododoro()

    return {
        props: {},
    }
}

interface PomodoroProps {}

export default function Pomodoro(props: PomodoroProps) {
    const { data: session } = useSession()

    useEffect(() => {
        ;(async () => {
            try {
                // await fetch('/api/pomodoro', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({
                //         type: 'work',
                //     }),
                // })
                // TODO, 등록 성공하면 스낵바?로 표현하기
            } catch (e) {
                alert(e)
            }
        })()
    }, [])

    return (
        <Layout>
            <Opengraph title="Pomodoro" description="포모도로 로그" />
            <section className={`${utilStyles.padding1px}`}>
                <h1 className="utilStyles.heading2Xl">🍅 Logs</h1>

                {/* TODO 노션에 작성된 포모도로 기록을 토대로 포모도로 페이지에 github contribution graph와 동일한 형태로 표현 */}
                {/* <Heatmap
                    colour={['#ebedf0', '#c6e48b', '#40c463', '#30a14e', '#216e39']}
                    // squareNumber={5}
                    count={[3, 2, 20, 1, 14]}
                    squareGap="4px"
                    squareSize="15px"
                /> */}

                {!session && <h1>404 🚧 작업중입니다</h1>}

                {/* 뽀모도로 등록 */}
                {session && <PomodoroCounter />}
            </section>
        </Layout>
    )
}
