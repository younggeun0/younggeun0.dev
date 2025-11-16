import BackgroundTimer from '../components/BackgroundTimer'
import Footer from '../components/Footer'
import RestTimeDisplay from '../components/RestTimeDisplay'
import Domado3DScene from '../components/scene/Domado3DScene'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts'
import { usePomodoroAnimation } from '../hooks/usePomodoroAnimation'
import { usePomodoroSettings } from '../hooks/usePomodoroSettings'
import { usePomodoroTimer } from '../hooks/usePomodoroTimer'

export default function Pomodoro() {
  const { pomodoroMinutes, restMinutes, updateSettings } = usePomodoroSettings()

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

  return (
    <div className="relative w-screen h-screen flex flex-col overflow-auto text-gray-600">
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
        pomodoroMinutes={pomodoroMinutes}
        restMinutes={restMinutes}
        onSettingsChange={updateSettings}
      />
    </div>
  )
}
