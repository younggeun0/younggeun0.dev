import { useEffect, useRef } from 'react'

interface UseNotificationProps {
  enabled: boolean
  title: string
  options?: NotificationOptions
}

export function useNotification({ enabled, title, options }: UseNotificationProps) {
  const permissionRef = useRef<NotificationPermission | null>(null)

  useEffect(() => {
    if (!('Notification' in window)) {
      console.warn('This browser does not support desktop notification')
      return
    }

    permissionRef.current = Notification.permission

    if (permissionRef.current === 'default') {
      Notification.requestPermission().then(permission => {
        permissionRef.current = permission
      })
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    if (!('Notification' in window)) return
    if (permissionRef.current !== 'granted') return

    const notification = new Notification(title, {
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      requireInteraction: true,
      ...options,
    })

    // 알림 클릭 시 포커스
    notification.onclick = () => {
      window.focus()
      notification.close()
    }

    // 5초 후 자동 닫기
    setTimeout(() => {
      notification.close()
    }, 5000)

    return () => {
      notification.close()
    }
  }, [enabled, title, options])
}

