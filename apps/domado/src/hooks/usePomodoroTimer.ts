import { useEffect, useRef, useState } from 'react'

import { getTimeInfo } from '../components/pomodoro'

type TimerStatus = 'restart' | 'running' | 'finish' | 'paused'

interface UsePomodoroTimerProps {
  pomodoroMinutes: number
  restMinutes: number
}

const STORAGE_KEY_TODAY_INFO = 'domado_today_info'

// 오늘 날짜를 YYYY-MM-DD 형식으로 반환
function getTodayKey(): string {
  return new Date().toISOString().split('T')[0]
}

function loadTodayInfo(): { count: number; date: string } {
  if (typeof window === 'undefined') {
    return { count: 0, date: getTodayKey() }
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY_TODAY_INFO)
    if (saved) {
      const data = JSON.parse(saved)
      const today = getTodayKey()

      if (data.date === today) {
        return data
      }
    }
  } catch (error) {
    console.warn('Failed to load today info from localStorage:', error)
  }

  return { count: 0, date: getTodayKey() }
}

function saveTodayInfo(count: number): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    const data = { count, date: getTodayKey() }
    localStorage.setItem(STORAGE_KEY_TODAY_INFO, JSON.stringify(data))
  } catch (error) {
    console.warn('Failed to save today info to localStorage:', error)
  }
}

export function usePomodoroTimer({ pomodoroMinutes, restMinutes }: UsePomodoroTimerProps) {
  const initialTimeInfo = getTimeInfo(pomodoroMinutes, restMinutes)
  const [status, setStatus] = useState<TimerStatus>('paused')
  const [isRest, setIsRest] = useState(false)
  const [todayInfo, setTodayInfo] = useState(loadTodayInfo)
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
        setTodayInfo(prev => {
          const newCount = prev.count + 1
          saveTodayInfo(newCount)
          return { ...prev, count: newCount }
        })
      }
      setIsRest(prev => !prev)
      setStatus('paused')
    }
  }, [status, isRest, pomodoroMinutes, restMinutes])

  // 날짜가 바뀌면 뽀모도로 개수 초기화
  useEffect(() => {
    const today = getTodayKey()
    if (todayInfo.date !== today) {
      setTodayInfo({ count: 0, date: today })
      saveTodayInfo(0)
    }
  }, [todayInfo.date])

  // todayInfo가 변경될 때마다 localStorage에 저장 (수동으로 count를 변경하는 경우 대비)
  useEffect(() => {
    saveTodayInfo(todayInfo.count)
  }, [todayInfo.count])

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

