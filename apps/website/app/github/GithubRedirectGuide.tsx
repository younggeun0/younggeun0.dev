'use client'

import GithubIcon from '@/assets/icon/github-mark.svg'

export default function GithubRedirectGuide() {
  return (
    <div className="container">
      <div className="h-[30vh] flex flex-col items-center justify-center">
        <div
          className="flex items-center justify-center"
          role="button"
          onClick={() => {
            window.location.href = 'https://github.com/'
          }}
        >
          <span className="text-[var(--hue-2)]">
            `github
            <div style={{ width: '21px' }} className="ml-1 inline-block">
              <GithubIcon />
            </div>
            `
          </span>
          를 찾으셨나요?
        </div>
      </div>
    </div>
  )
}
