import { Metadata } from 'next'

import Opengraph from 'components/Opengraph'

import StickyClassAdder from '../../components/StickyClassAdder'

import '../../styles/prism-one-light.css'
import GithubRedirectGuide from './GithubRedirectGuide'

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
