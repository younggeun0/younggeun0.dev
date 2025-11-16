import BackgroundTimer from '../components/BackgroundTimer'
import Footer from '../components/Footer'
import RestTimeDisplay from '../components/RestTimeDisplay'
import Domado3DScene from '../components/scene/Domado3DScene'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts'
import { useNotification } from '../hooks/useNotification'
import { usePomodoroAnimation } from '../hooks/usePomodoroAnimation'
import { usePomodoroSettings } from '../hooks/usePomodoroSettings'
import { usePomodoroTimer } from '../hooks/usePomodoroTimer'

export default function Pomodoro() {
  const { pomodoroMinutes, restMinutes } = usePomodoroSettings()

  const {
    status,
    isRest,
    todayInfo,
    remainingTime,
    togglePlay,
    setStatus,
    setIsRest,
    setTodayInfo,
    durations,
  } = usePomodoroTimer({ pomodoroMinutes, restMinutes })

  usePomodoroAnimation({
    isRest,
    pomodoroDuration: durations.pomodoro,
    restDuration: durations.rest,
    status: status === 'running' ? 'running' : 'paused',
  })

  useKeyboardShortcuts({
    onTogglePlay: togglePlay,
    onIncrementCount: () => setTodayInfo(prev => ({ count: prev.count + 1 })),
    onSkipToRest: () => {
      setIsRest(true)
      setStatus('finish')
    },
  })

  useDocumentTitle({
    count: todayInfo.count,
    remainingTime,
  })

  // 타이머 완료 시 알림 표시 (remainingTime이 0이고 running 상태였을 때)
  const isTimerFinished = remainingTime === 0 && status === 'running'
  useNotification({
    enabled: isTimerFinished,
    title: isRest ? '휴식 시간이 끝났습니다! 🍅' : '뽀모도로가 완료되었습니다! 🎉',
    options: {
      body: isRest
        ? '다시 집중할 시간입니다. 새로운 뽀모도로를 시작하세요!'
        : `오늘 ${todayInfo.count + 1}개의 뽀모도로를 완료했습니다! 휴식을 취하세요.`,
      tag: 'pomodoro-timer',
    },
  })

  return (
    <div className="relative w-screen h-dvh flex flex-col overflow-auto text-gray-600">
      <Domado3DScene
        isRest={isRest}
        paused={status === 'paused'}
        remainingTime={remainingTime}
        pomodoroMinutes={pomodoroMinutes}
      />

      <div className="p-3 flex flex-1 flex-col items-center justify-center">
        {isRest && <RestTimeDisplay remainingTime={remainingTime} />}
        <BackgroundTimer isRest={isRest} />
      </div>

      <Footer
        isRest={isRest}
        remainingTime={remainingTime}
        todayInfo={todayInfo}
        status={status}
        onTogglePlay={togglePlay}
      />
    </div>
  )
}
