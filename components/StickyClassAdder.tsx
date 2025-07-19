'use client'

import { useEffect } from "react"

export default function StickyClassAdder() {
    useEffect(() => {
        const h1s = document.querySelectorAll('h1')
        h1s.forEach(h1 => {
            h1.classList.add('sticky', 'top-[44px]', 'bg-[#FAFAFA]', 'z-50')
        })
        const h2s = document.querySelectorAll('h2')
        h2s.forEach(h2 => {
            h2.classList.add('sticky', 'top-[44px]', 'bg-[#FAFAFA]', 'z-50')
        })
    }, [])
    
  return null
}