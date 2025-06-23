import Link from 'next/link'

import TiltClientComponent from './about/TiltClientComponent'

export default function Header() {
    return (
        <TiltClientComponent tiltSelector="header">
            <header className="sticky z-50 flex justify-between items-center p-2 top-0 w-full text-lg">
                <Link href="/">
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
                            younggeun0
                        </span>
                        <span
                            style={{
                                color: 'var(--mono-1)',
                            }}
                        >
                            {': '}
                        </span>
                        🐢
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
                            dev
                        </span>
                    </h1>
                </Link>
            </header>
        </TiltClientComponent>
    )
}
