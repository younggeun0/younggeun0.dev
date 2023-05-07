import { ThemeContext } from 'context/ThemeContext'
import dayjs from 'dayjs'
import React, { useContext, useEffect, useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { PomodoroInfo } from 'types'

const DURATIONS = [60 * 25, 60 * 5] // 웹앱 특성 상 계속 사용하지 않으므로 15분 쉬는건 우선 제외
// const DURATIONS = [5, 3] // for test

interface PomodoroTimerProps {
    todayInfo: PomodoroInfo | null | undefined
    setTodayInfo: React.Dispatch<React.SetStateAction<PomodoroInfo | null | undefined>>
}

export default function PomodoroTimer({ todayInfo, setTodayInfo }: PomodoroTimerProps) {
    const [seq, setSeq] = useState(0)
    const [status, setStatus] = useState<'play' | 'paused' | 'finished'>('paused')
    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        if (status === 'finished') {
            setSeq(s => (s + 1) % 2)
            setStatus('paused')
        }
    }, [status])

    async function updateOrCreatePomodoro() {
        try {
            await fetch('/api/pomodoro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (todayInfo) {
                setTodayInfo({
                    date: todayInfo.date,
                    count: todayInfo.count + 1,
                })
            } else {
                setTodayInfo({
                    date: dayjs().format('YYYY-MM-DD'),
                    count: 1,
                })
            }
            alert('🍅++') // TODO, Web Notification
        } catch (e) {
            alert(e)
        }
    }

    const isRest = seq === 1

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                fontSize: '3rem',
                alignItems: 'center',
                margin: '3rem 0 4rem 0',
            }}
        >
            <svg style={{ position: 'absolute' }}>
                <defs>
                    <linearGradient id="pomodoro-timer" x1="1" y1="0" x2="0" y2="0">
                        {isRest ? (
                            <stop offset="100%" stopColor={theme === 'dark' ? '#478476' : '#42b883'} />
                        ) : (
                            <>
                                <stop offset="5%" stopColor="gold" />
                                <stop offset="95%" stopColor="red" />
                            </>
                        )}
                    </linearGradient>
                </defs>
            </svg>
            <CountdownCircleTimer
                key={seq}
                isPlaying={status === 'play'}
                duration={DURATIONS[seq]}
                colors="url(#pomodoro-timer)"
                onComplete={_totalElapsedTime => {
                    if (!isRest) updateOrCreatePomodoro()
                    setStatus('finished')
                }}
                trailStrokeWidth={30}
                trailColor={theme.type === 'dark' ? '#373d47' : '#d3d3d3'}
                strokeWidth={20}
                isGrowing={isRest ? true : false}
                size={250}
            >
                {({ remainingTime }) => {
                    if (status === 'paused') {
                        return (
                            <>
                                <span
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        setStatus('play')
                                    }}
                                >
                                    {isRest ? '☕️ ' : '🔥 '}
                                    ⏯️
                                </span>
                            </>
                        )
                    } else {
                        // TODO, 브라우저 종료 시 remainingTime을 로컬 스토리지에 백업하고 다시 불러오는 기능
                        const minutes = Math.floor(remainingTime / 60)
                        const seconds = remainingTime % 60

                        return (
                            <span
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    setStatus('paused')
                                }}
                            >
                                {`${minutes}:${seconds}`}
                            </span>
                        )
                    }
                }}
            </CountdownCircleTimer>
        </div>
    )
}
