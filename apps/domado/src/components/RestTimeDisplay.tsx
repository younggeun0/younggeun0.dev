import { formatRemainingTime } from './pomodoro'

interface RestTimeDisplayProps {
  remainingTime: number
}

export default function RestTimeDisplay({ remainingTime }: RestTimeDisplayProps) {
  return (
    <div
      className="absolute text-white/80"
      style={{
        top: '20%',
        transform: 'translateY(-20%)',
        fontSize: '6rem',
        userSelect: 'none',
      }}
    >
      {formatRemainingTime(remainingTime)}
    </div>
  )
}

