'use client'

import { useEffect, useRef } from 'react'
import VanillaTilt from 'vanilla-tilt'

export default function TiltClientComponent({
    children,
    tiltSelector,
}: {
    children: React.ReactNode
    tiltSelector: string
}) {
    const tiltRef = useRef<any>(null)

    useEffect(() => {
        if (!tiltRef.current) return

        const tiltElements = tiltRef.current.querySelectorAll(tiltSelector)

        if (tiltElements) {
            tiltElements?.forEach((element: any) => {
                VanillaTilt.init(element)
            })
        }

        return () => {
            tiltElements?.forEach((element: any) => {
                if (element.vanillaTilt) {
                    element.vanillaTilt.destroy()
                }
            })
        }
    }, [tiltSelector])

    return <div ref={tiltRef}>{children}</div>
}
