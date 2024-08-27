import { AppProps } from 'next/app'
import React from 'react'

import { ThemeContextProvider } from '../context/ThemeContext'
import '../styles/global.css'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeContextProvider>
            <Component {...pageProps} />
        </ThemeContextProvider>
    )
}
