import { Metadata } from 'next'

import GithubRedirectGuide from './GithubRedirectGuide'

import StickyClassAdder from '../../components/StickyClassAdder'
import '../../styles/prism-one-light.css'

import Opengraph from '@/components/Opengraph'

export const metadata: Metadata = {
  title: '햐소ㅕㅠ',
  description: 'github를 찾으셨나요?',
  keywords: ['햐소ㅕㅠ'],
  openGraph: {
    title: '햐소ㅕㅠ => github',
    description: 'github를 찾으셨나요?',
  },
}

export default async function GithubWrongInputPage() {
  return (
    <>
      <Opengraph title="햐소ㅕㅠ => github" description="github를 찾으셨나요?" />

      <GithubRedirectGuide />

      <StickyClassAdder />
    </>
  )
}
