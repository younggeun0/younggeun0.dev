import { useState } from 'react'

import { DEFAULT_REST_CONFIG, DEFAULT_WORK_CONFIG, type CameraConfig } from './CameraSetup'

interface CameraDevToolsProps {
  isRest: boolean
  onConfigChange: (isRest: boolean, config: CameraConfig) => void
}

export default function CameraDevTools({ isRest, onConfigChange }: CameraDevToolsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [workConfig, setWorkConfig] = useState<CameraConfig>(DEFAULT_WORK_CONFIG)
  const [restConfig, setRestConfig] = useState<CameraConfig>(DEFAULT_REST_CONFIG)

  const currentConfig = isRest ? restConfig : workConfig
  const setCurrentConfig = isRest ? setRestConfig : setWorkConfig

  const updatePosition = (axis: 'x' | 'y' | 'z', value: number) => {
    const newConfig = {
      ...currentConfig,
      position: [...currentConfig.position] as [number, number, number],
    }
    const index = axis === 'x' ? 0 : axis === 'y' ? 1 : 2
    newConfig.position[index] = value
    setCurrentConfig(newConfig)
    onConfigChange(isRest, newConfig)
  }

  const updateLookAt = (axis: 'x' | 'y' | 'z', value: number) => {
    const newConfig = {
      ...currentConfig,
      lookAt: [...currentConfig.lookAt] as [number, number, number],
    }
    const index = axis === 'x' ? 0 : axis === 'y' ? 1 : 2
    newConfig.lookAt[index] = value
    setCurrentConfig(newConfig)
    onConfigChange(isRest, newConfig)
  }

  const copyToClipboard = () => {
    const config = isRest ? restConfig : workConfig
    const code = `camera.position.set(${config.position.join(', ')})\ncamera.lookAt(${config.lookAt.join(', ')})`
    navigator.clipboard.writeText(code)
    alert('코드가 클립보드에 복사되었습니다!')
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 rounded-lg bg-gray-900 px-4 py-2 text-sm font-mono text-white shadow-lg hover:bg-gray-800"
      >
        🎥 Camera DevTools
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 rounded-lg bg-gray-900 text-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-gray-700 px-4 py-3">
        <h3 className="text-sm font-bold">🎥 Camera DevTools</h3>
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
          <div className="mb-2 text-xs font-semibold text-gray-400">Mode: {isRest ? 'Rest' : 'Work'}</div>

          <div className="space-y-3">
            <div>
              <div className="mb-2 text-xs font-semibold text-gray-300">Position</div>
              {(['x', 'y', 'z'] as const).map(axis => {
                const index = axis === 'x' ? 0 : axis === 'y' ? 1 : 2
                return (
                  <div key={axis} className="mb-2">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-gray-400">{axis.toUpperCase()}</span>
                      <input
                        type="number"
                        value={currentConfig.position[index]}
                        onChange={e => updatePosition(axis, parseFloat(e.target.value) || 0)}
                        className="w-20 rounded bg-gray-700 px-2 py-1 text-right text-xs text-white"
                        step="0.1"
                      />
                    </div>
                    <input
                      type="range"
                      min="-100"
                      max="100"
                      value={currentConfig.position[index]}
                      onChange={e => updatePosition(axis, parseFloat(e.target.value))}
                      className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-700 accent-blue-500"
                      style={{
                        background: `linear-gradient(to right, rgb(59 130 246) 0%, rgb(59 130 246) ${
                          ((currentConfig.position[index] + 100) / 200) * 100
                        }%, rgb(55 65 81) ${((currentConfig.position[index] + 100) / 200) * 100}%, rgb(55 65 81) 100%)`,
                      }}
                    />
                  </div>
                )
              })}
            </div>

            <div>
              <div className="mb-2 text-xs font-semibold text-gray-300">Look At</div>
              {(['x', 'y', 'z'] as const).map(axis => {
                const index = axis === 'x' ? 0 : axis === 'y' ? 1 : 2
                return (
                  <div key={axis} className="mb-2">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-gray-400">{axis.toUpperCase()}</span>
                      <input
                        type="number"
                        value={currentConfig.lookAt[index]}
                        onChange={e => updateLookAt(axis, parseFloat(e.target.value) || 0)}
                        className="w-20 rounded bg-gray-700 px-2 py-1 text-right text-xs text-white"
                        step="0.1"
                      />
                    </div>
                    <input
                      type="range"
                      min="-100"
                      max="100"
                      value={currentConfig.lookAt[index]}
                      onChange={e => updateLookAt(axis, parseFloat(e.target.value))}
                      className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-700 accent-blue-500"
                      style={{
                        background: `linear-gradient(to right, rgb(59 130 246) 0%, rgb(59 130 246) ${
                          ((currentConfig.lookAt[index] + 100) / 200) * 100
                        }%, rgb(55 65 81) ${((currentConfig.lookAt[index] + 100) / 200) * 100}%, rgb(55 65 81) 100%)`,
                      }}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="rounded bg-gray-800 p-3">
          <div className="mb-2 text-xs font-semibold text-gray-400">Current Values</div>
          <div className="space-y-1 font-mono text-xs text-gray-300">
            <div>position: [{currentConfig.position.map(v => v.toFixed(1)).join(', ')}]</div>
            <div>lookAt: [{currentConfig.lookAt.map(v => v.toFixed(1)).join(', ')}]</div>
          </div>
        </div>
      </div>
    </div>
  )
}
