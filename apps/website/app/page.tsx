import { buttonVariants } from '@younggeun0/ui'
import Link from 'next/link'

import Header from './Header'

import Opengraph from '@/components/Opengraph'

import '../styles/prism-one-light.css'

export default async function About() {
  return (
    <>
      <Opengraph />

      <Header />

      <div className="grid text-center gap-2 h-[30vh] items-center justify-center">
        <Link href="/about" className={buttonVariants({ variant: 'link' })}>
          /about
        </Link>
      </div>
    </>
  )
}
