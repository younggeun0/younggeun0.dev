import { useEffect } from 'react'

import { formatRemainingTime } from '../components/pomodoro'

interface UseDocumentTitleProps {
  count: number
  remainingTime: number
}

export function useDocumentTitle({ count, remainingTime }: UseDocumentTitleProps) {
  useEffect(() => {
    const formattedTime = formatRemainingTime(remainingTime)
    document.title = `🍅 * ${count} - ${formattedTime}`
  }, [count, remainingTime])
}

