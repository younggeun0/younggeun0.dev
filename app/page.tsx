import Link from 'next/link'
import React from 'react'

import Opengraph from '@/components/Opengraph'
import '../styles/prism-one-dark.css'

export default async function About() {
    return (
        <>
            <Opengraph />

            <div className="py-10 grid text-center">
                <Link href="/about">/about</Link>
            </div>
        </>
    )
}