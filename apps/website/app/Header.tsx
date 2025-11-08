import { buttonVariants, cn } from '@younggeun0/ui'
import Link from 'next/link'

interface HeaderProps {
  argValue?: string
  returnValue?: string
  argType?: string
}

export default function Header({ argValue = 'younggeun0', returnValue = 'dev', argType = '🐢' }: HeaderProps) {
  return (
    <header className="sticky z-50 flex justify-between items-center p-2 top-0 w-full text-lg">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'h-auto p-0 text-lg font-normal hover:bg-transparent hover:text-primary',
        )}
      >
        <h1>
          <span
            style={{
              color: 'var(--hue-6)',
            }}
          >
            {'('}
          </span>
          <span
            style={{
              color: 'var(--hue-5)',
            }}
          >
            {argValue}
          </span>
          <span
            style={{
              color: 'var(--mono-1)',
            }}
          >
            {': '}
          </span>
          {argType}
          <span
            style={{
              color: 'var(--hue-6)',
            }}
          >
            {')'}
          </span>
          <span
            style={{
              color: 'var(--hue-3)',
            }}
          >
            {' => '}
          </span>
          <span
            style={{
              color: 'var(--hue-6-2)',
            }}
          >
            {returnValue}
          </span>
        </h1>
      </Link>
    </header>
  )
}
