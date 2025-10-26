import Link from 'next/link'

import Opengraph from '@/components/Opengraph'

import Header from './Header'

import '../styles/prism-one-light.css'

export default async function About() {
  return (
    <>
      <Opengraph />

      <Header />
      <div className="py-10 grid text-center gap-2">
        <Link href="/about">/about</Link>
      </div>
    </>
  )
}
