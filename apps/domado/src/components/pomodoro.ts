export const getTimeInfo = (pomodoroMinutes: number = 25, restMinutes: number = 5) => {
  return {
    POMODORO_SEC: pomodoroMinutes * 60,
    REST_SEC: restMinutes * 60,
    ADD_MIN: 5 * 60,
  }
}

export function formatRemainingTime(time: number) {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}
