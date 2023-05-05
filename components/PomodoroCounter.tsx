import React, { useEffect, useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { getAllPomododoro } from 'lib/pomodoro'

// const DURATIONS = [60 * 25, 60 * 5]
const DURATIONS = [5, 3] //[25, 5] // 웹앱 특성 상 계속 사용하지 않으므로 15분 쉬는건 우선 제외

function notifyFinished() {
    const message = 'Pomodoro Added! 🍅'
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

export default function PomodoroCounter() {
    const [seq, setSeq] = useState(0)
    const [status, setStatus] = useState<'play' | 'paused' | 'finished'>('paused')

    useEffect(() => {
        if (status === 'finished') {
            setSeq((seq + 1) % 2)
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
            // TODO, web notification 동작 여부 확인
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
                minHeight: '50vh',
            }}
        >
            <CountdownCircleTimer
                key={seq}
                isPlaying={status === 'play'}
                duration={DURATIONS[seq]}
                colors={isRest ? '#303134' : '#DF3137'}
                onComplete={_totalElapsedTime => {
                    if (!isRest) updateOrCreatePomodoro()
                    setStatus('finished')
                }}
                strokeWidth={20}
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
