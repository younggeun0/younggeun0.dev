import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
} from '@younggeun0/ui'
import { useState, useEffect } from 'react'

interface SettingsDialogProps {
  onSave: (pomodoroMinutes: number, restMinutes: number) => void
  currentPomodoroMinutes: number
  currentRestMinutes: number
}

export default function SettingsDialog({ onSave, currentPomodoroMinutes, currentRestMinutes }: SettingsDialogProps) {
  const [open, setOpen] = useState(false)
  const [pomodoroMinutes, setPomodoroMinutes] = useState(currentPomodoroMinutes.toString())
  const [restMinutes, setRestMinutes] = useState(currentRestMinutes.toString())

  useEffect(() => {
    setPomodoroMinutes(currentPomodoroMinutes.toString())
    setRestMinutes(currentRestMinutes.toString())
  }, [currentPomodoroMinutes, currentRestMinutes])

  useEffect(() => {
    console.log('Dialog open state:', open)
  }, [open])

  const handleSave = () => {
    const pomodoro = parseInt(pomodoroMinutes, 10)
    const rest = parseInt(restMinutes, 10)

    if (pomodoro > 0 && rest > 0) {
      onSave(pomodoro, rest)
      setOpen(false)
    }
  }

  return (
    <>
      <button
        type="button"
        className="text-white/60 hover:text-white/80 transition-colors"
        title="설정"
        onClick={() => setOpen(true)}
        style={{ zIndex: '11', pointerEvents: 'auto' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">뽀모도로 설정</DialogTitle>
            <DialogDescription className="text-gray-400">뽀모도로 시간과 휴식 시간을 설정하세요.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="pomodoro" className="text-sm font-medium text-gray-300">
                뽀모도로 시간 (분)
              </label>
              <Input
                id="pomodoro"
                type="number"
                min="1"
                value={pomodoroMinutes}
                onChange={e => setPomodoroMinutes(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="rest" className="text-sm font-medium text-gray-300">
                휴식 시간 (분)
              </label>
              <Input
                id="rest"
                type="number"
                min="1"
                value={restMinutes}
                onChange={e => setRestMinutes(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              취소
            </Button>
            <Button type="button" onClick={handleSave} className="bg-red-600 text-white hover:bg-red-700">
              저장
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
