'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

import GithubIcon from '@/assets/icon/github-mark.svg'

export default function Footer() {
    const router = useRouter()

    return (
        <footer className="py-10 grid text-center">
            <div className="flex justify-center items-center gap-2">
                <button
                    onClick={() => {
                        router.push('mailto:dureng5@gmail.com')
                    }}
                >
                    📨
                </button>
                <div style={{ width: '21px' }}>
                    <GithubIcon
                        role="button"
                        onClick={() => {
                            router.push('https://github.com/younggeun0')
                        }}
                    />
                </div>
            </div>

            <div className="mt-1 text-xs" style={{ color: 'var(--hue-4)' }}>
                <div>&apos;©2022-present Younggeun Oh.&apos;</div>
                <div>&apos;All Rights Reserved.&apos;</div>
            </div>
        </footer>
    )
}
