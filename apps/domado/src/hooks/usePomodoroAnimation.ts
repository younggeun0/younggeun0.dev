import { useEffect, useRef } from 'react'

interface UsePomodoroAnimationProps {
  isRest: boolean
  pomodoroDuration: number
  restDuration: number
  status: 'running' | 'paused'
}

export function usePomodoroAnimation({
  isRest,
  pomodoroDuration,
  restDuration,
  status,
}: UsePomodoroAnimationProps) {
  const animationRef = useRef<Animation | null>(null)

  // 애니메이션 생성
  useEffect(() => {
    const bgTimer = document.getElementById('bg-timer')
    if (!bgTimer || !window.KeyframeEffect) return

    const animation = new Animation(
      new KeyframeEffect(
        bgTimer,
        [{ height: isRest ? '0%' : '100%' }, { height: isRest ? '100%' : '0%' }],
        {
          duration: isRest ? restDuration * 1000 : pomodoroDuration * 1000,
          fill: 'forwards',
          easing: 'linear',
        },
      ),
      document.timeline,
    )

    animationRef.current = animation

    return () => {
      if (animationRef.current) {
        animationRef.current.cancel()
      }
    }
  }, [isRest, pomodoroDuration, restDuration])

  // 애니메이션 재생/일시정지
  useEffect(() => {
    if (!animationRef.current) return

    if (status === 'running') {
      animationRef.current.play()
    } else if (status === 'paused') {
      animationRef.current.pause()
    }
  }, [status])
}

