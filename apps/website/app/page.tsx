import { Button } from '@younggeun0/ui'
import Link from 'next/link'

import Header from './Header'

import Opengraph from '@/components/Opengraph'

import '../styles/prism-one-light.css'

export default async function About() {
  return (
    <>
      <Opengraph />

      <Header />
      <div className="py-10 grid text-center gap-2">
        <Link href="/about">
          <Button variant="link">/about</Button>
        </Link>

        <Link href="https://pyh.younggeun0.dev">
          <Button variant="link">/pick-your-holds</Button>
        </Link>

        <Link href="https://domado.younggeun0.dev">
          <Button variant="link">/domado</Button>
        </Link>
      </div>
    </>
  )
}
