import GithubIcon from '@/assets/icon/github-mark.svg'

export default function Footer() {

  return (
    <footer className="py-10 grid text-center">
      <div className="flex justify-center items-center gap-2">
        <a href="mailto:dureng5@gmail.com" aria-label="Send email to dureng5@gmail.com">
          <span className="text-xl">📨</span>
        </a>
        <div style={{ width: '21px' }}>
          <a
            href="https://github.com/younggeun0"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit GitHub Profile"
          >
            <GithubIcon role="img" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="mt-1 text-xs" style={{ color: 'var(--hue-4)' }}>
        <div>&apos;©2022-present Younggeun Oh.&apos;</div>
        <div>&apos;All Rights Reserved.&apos;</div>
      </div>
    </footer>
  )
}
