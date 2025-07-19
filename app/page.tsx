import Link from 'next/link'

import Opengraph from '@/components/Opengraph'
import '../styles/prism-one-light.css'

export default async function About() {
  return (
    <>
      <Opengraph />

      <div className="py-10 grid text-center gap-2">
        <Link href="/about">/about</Link>
        <Link href="/project-experience">/project-experience</Link>
      </div>
    </>
  )
}
