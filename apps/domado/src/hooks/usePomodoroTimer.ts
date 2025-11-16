import { useEffect, useRef, useState } from 'react'

import { getTimeInfo } from '../components/pomodoro'

type TimerStatus = 'restart' | 'running' | 'finish' | 'paused'

interface UsePomodoroTimerProps {
  pomodoroMinutes: number
  restMinutes: number
}

export function usePomodoroTimer({ pomodoroMinutes, restMinutes }: UsePomodoroTimerProps) {
  const initialTimeInfo = getTimeInfo(pomodoroMinutes, restMinutes)
  const [status, setStatus] = useState<TimerStatus>('paused')
  const [isRest, setIsRest] = useState(false)
  const [todayInfo, setTodayInfo] = useState({ count: 0 })
  const [remainingTime, setRemainingTime] = useState(initialTimeInfo.POMODORO_SEC)

  const countInterval = useRef<NodeJS.Timeout | null>(null)

  // 초기 시간 설정 및 설정 변경 시 업데이트
  useEffect(() => {
    const newTimeInfo = getTimeInfo(pomodoroMinutes, restMinutes)
    if (status === 'paused') {
      setRemainingTime(newTimeInfo.POMODORO_SEC)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pomodoroMinutes, restMinutes])

  // 타이머 로직
  useEffect(() => {
    if (status === 'running') {
      const interval = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 0) {
            return 0
          }
          return prev - 1
        })
      }, 1000)
      countInterval.current = interval
    } else {
      if (countInterval.current) {
        clearInterval(countInterval.current)
        countInterval.current = null
      }
    }

    return () => {
      if (countInterval.current) {
        clearInterval(countInterval.current)
      }
    }
  }, [status])

  // 타이머 완료 처리
  useEffect(() => {
    if (remainingTime <= 0 && status === 'running') {
      setStatus('finish')
    }
  }, [remainingTime, status])

  // finish 상태 처리
  useEffect(() => {
    if (status === 'finish') {
      const timeInfo = getTimeInfo(pomodoroMinutes, restMinutes)
      if (isRest) {
        setRemainingTime(timeInfo.POMODORO_SEC)
      } else {
        setRemainingTime(timeInfo.REST_SEC)
        setTodayInfo(prev => ({ count: prev.count + 1 }))
      }
      setIsRest(prev => !prev)
      setStatus('paused')
    }
  }, [status, isRest, pomodoroMinutes, restMinutes])

  const togglePlay = () => {
    setStatus(prev => (prev === 'paused' ? 'running' : 'paused'))
  }

  const timeInfo = getTimeInfo(pomodoroMinutes, restMinutes)

  return {
    status,
    isRest,
    todayInfo,
    remainingTime,
    togglePlay,
    setStatus,
    setIsRest,
    setTodayInfo,
    durations: {
      pomodoro: timeInfo.POMODORO_SEC,
      rest: timeInfo.REST_SEC,
    },
  }
}

