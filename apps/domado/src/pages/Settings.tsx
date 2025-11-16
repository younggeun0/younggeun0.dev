import { useNavigate } from '@tanstack/react-router'
import { Button, Input } from '@younggeun0/ui'
import { useState, useEffect } from 'react'

import { usePomodoroSettings } from '../hooks/usePomodoroSettings'

export default function Settings() {
  const navigate = useNavigate()
  const { pomodoroMinutes, restMinutes, updateSettings } = usePomodoroSettings()
  const [pomodoroMinutesInput, setPomodoroMinutesInput] = useState(pomodoroMinutes.toString())
  const [restMinutesInput, setRestMinutesInput] = useState(restMinutes.toString())

  useEffect(() => {
    setPomodoroMinutesInput(pomodoroMinutes.toString())
    setRestMinutesInput(restMinutes.toString())
  }, [pomodoroMinutes, restMinutes])

  const handleSave = () => {
    const pomodoro = parseInt(pomodoroMinutesInput, 10)
    const rest = parseInt(restMinutesInput, 10)

    if (pomodoro > 0 && rest > 0) {
      updateSettings(pomodoro, rest)
      navigate({ to: '/' })
    }
  }

  return (
    <div className="h-dvh bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg border border-gray-700 p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">domado 설정</h1>
          <p className="text-gray-400 text-sm">뽀모도로 시간과 휴식 시간을 설정하세요.</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="pomodoro" className="text-sm font-medium text-gray-300 block">
              뽀모도로 시간 (분)
            </label>

            {/* TODO, Input 컴포넌트 추출(monorepo) */}
            <Input
              id="pomodoro"
              type="number"
              min="1"
              value={pomodoroMinutesInput}
              onChange={e => setPomodoroMinutesInput(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 ps-2 text-base"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="rest" className="text-sm font-medium text-gray-300 block">
              휴식 시간 (분)
            </label>
            <Input
              id="rest"
              type="number"
              min="1"
              value={restMinutesInput}
              onChange={e => setRestMinutesInput(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 ps-2 text-base"
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate({ to: '/' })}
            className="px-4 py-2 border-gray-600 text-gray-300 hover:bg-gray-700 rounded-md"
          >
            취소
          </Button>
          <Button type="button" onClick={handleSave} className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md">
            저장
          </Button>
        </div>
      </div>
    </div>
  )
}
