import { createFileRoute } from '@tanstack/react-router'
import Pomodoro from '../pages/Pomodoro'

export const Route = createFileRoute('/')({
  component: Pomodoro,
})

