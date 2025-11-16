interface BackgroundTimerProps {
  isRest: boolean
}

export default function BackgroundTimer({ isRest }: BackgroundTimerProps) {
  return (
    <>
      <div
        id="bg-timer"
        className="absolute bottom-0 w-full"
        style={{
          zIndex: '-1',
          background: isRest ? '#6AFF88' : '#b22222',
        }}
      />
      <div
        className="absolute bg-gray-800 bottom-0 w-full h-full"
        style={{
          zIndex: '-2',
        }}
      />
    </>
  )
}

