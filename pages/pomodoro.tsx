import React from 'react'
import Layout from '../components/layout/Layout'
import utilStyles from '../styles/utils.module.css'
import Opengraph from 'components/Opengraph'
import PomodoroTimer from 'components/PomodoroTimer'
import { useSession } from 'next-auth/react'
import { getAllPomododoroInfo } from 'lib/pomodoro'
import CalendarHeatmap from 'react-calendar-heatmap'
import { PomodoroInfo } from 'types'

export async function getServerSideProps() {
    const pomodoroInfos = await getAllPomododoroInfo()

    return {
        props: {
            pomodoroInfos,
        },
    }
}

interface PomodoroProps {
    pomodoroInfos: PomodoroInfo[]
}

export default function Pomodoro({ pomodoroInfos = [] }: PomodoroProps) {
    const { data: session } = useSession()

    return (
        <Layout>
            <Opengraph title="Pomodoro" description="뽀모도로 로그" />
            <section className={`${utilStyles.padding1px}`}>
                <h1 className="utilStyles.heading2Xl">[...🍅]</h1>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: '70%' }}>
                        <CalendarHeatmap
                            startDate={new Date('2023-04-30')}
                            endDate={new Date('2023-08-01')}
                            onClick={(value: any) => {
                                if (!value) return

                                alert(`${value.date}  🍅 * ${value.count}`)
                            }}
                            classForValue={(value: any) => {
                                let selectorNumber = 0
                                if (!value || value.count === 0) {
                                } else if (value.count > 8) {
                                    selectorNumber = 4
                                } else if (value.count > 6) {
                                    selectorNumber = 3
                                } else if (value.count > 4) {
                                    selectorNumber = 2
                                } else if (value.count > 0) {
                                    selectorNumber = 1
                                }

                                return `color-github-${selectorNumber}`
                            }}
                            values={pomodoroInfos}
                        />
                    </div>
                </div>

                {session && <PomodoroTimer />}
            </section>
        </Layout>
    )
}
