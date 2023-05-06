import { ThemeContext } from 'context/ThemeContext'
import React, { useContext, useEffect, useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const DURATIONS = [60 * 25, 60 * 5] // 웹앱 특성 상 계속 사용하지 않으므로 15분 쉬는건 우선 제외
// const DURATIONS = [5, 3] // for test

function notifyFinished() {
    const message = '🍅++'

    if (!('Notification' in window)) {
        alert(message)
    } else if (Notification.permission === 'granted') {
        new Notification(message)
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification(message)
            }
        })
    }
}

export default function PomodoroTimer() {
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
            notifyFinished()
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
                            <>
                                <stop offset="5%" stopColor="gold" />
                                <stop offset="95%" stopColor="red" />
                            </>
                        ) : (
                            <stop offset="100%" stopColor={theme === 'dark' ? '#478476' : '#42b883'} />
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
                isGrowing={true}
                size={250}
            >
                {({ remainingTime }) => {
                    if (status === 'paused') {
                        return (
                            <span
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    setStatus('play')
                                }}
                            >
                                ▶️
                            </span>
                        )
                    } else {
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
