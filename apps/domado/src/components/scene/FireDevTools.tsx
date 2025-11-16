import { useState } from 'react'

import { type FirePosition } from './CoffeeCupModel'

interface FireDevToolsProps {
  position: FirePosition
  onPositionChange: (position: FirePosition) => void
}

export default function FireDevTools({ position, onPositionChange }: FireDevToolsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const updatePosition = (axis: 'x' | 'y' | 'z', value: number) => {
    onPositionChange({
      ...position,
      [axis]: value,
    })
  }

  const copyToClipboard = () => {
    const code = `position.set(${position.x}, ${position.y}, ${position.z})`
    navigator.clipboard.writeText(code)
    alert('코드가 클립보드에 복사되었습니다!')
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-50 rounded-lg bg-orange-900 px-4 py-2 text-sm font-mono text-white shadow-lg hover:bg-orange-800"
      >
        🔥 Fire DevTools
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 w-80 rounded-lg bg-gray-900 text-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-gray-700 px-4 py-3">
        <h3 className="text-sm font-bold">🔥 Fire DevTools</h3>
        <div className="flex gap-2">
          <button onClick={copyToClipboard} className="rounded px-2 py-1 text-xs hover:bg-gray-800" title="코드 복사">
            📋
          </button>
          <button onClick={() => setIsOpen(false)} className="rounded px-2 py-1 text-xs hover:bg-gray-800">
            ✕
          </button>
        </div>
      </div>

      <div className="max-h-96 space-y-4 overflow-y-auto p-4">
        <div className="rounded bg-gray-800 p-3">
          <div className="mb-2 text-xs font-semibold text-gray-400">Fire Position Offset</div>

          <div className="space-y-3">
            {(['x', 'y', 'z'] as const).map(axis => {
              return (
                <div key={axis} className="mb-2">
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-gray-400">{axis.toUpperCase()}</span>
                    <input
                      type="number"
                      value={position[axis]}
                      onChange={e => updatePosition(axis, parseFloat(e.target.value) || 0)}
                      className="w-20 rounded bg-gray-700 px-2 py-1 text-right text-xs text-white"
                      step="0.1"
                    />
                  </div>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={position[axis]}
                    onChange={e => updatePosition(axis, parseFloat(e.target.value))}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-700 accent-orange-500"
                    style={{
                      background: `linear-gradient(to right, rgb(249 115 22) 0%, rgb(249 115 22) ${
                        ((position[axis] + 50) / 100) * 100
                      }%, rgb(55 65 81) ${((position[axis] + 50) / 100) * 100}%, rgb(55 65 81) 100%)`,
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded bg-gray-800 p-3">
          <div className="mb-2 text-xs font-semibold text-gray-400">Current Values</div>
          <div className="space-y-1 font-mono text-xs text-gray-300">
            <div>position: [{position.x.toFixed(1)}, {position.y.toFixed(1)}, {position.z.toFixed(1)}]</div>
          </div>
        </div>

        <div className="rounded bg-gray-800 p-3">
          <div className="mb-2 text-xs font-semibold text-gray-400">Debug Info</div>
          <div className="space-y-1 font-mono text-xs text-gray-300">
            <div>particleFire installed: {(window as any).__particleFireInstalled ? '✅' : '❌'}</div>
            <div className="mt-2 text-xs text-gray-400">
              💡 초록색 와이어프레임 구체가 화염 예상 위치를 표시합니다
            </div>
            <div className="mt-1 text-xs text-gray-400">
              콘솔에서 상세 디버그 정보를 확인하세요
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

