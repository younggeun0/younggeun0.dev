import React from 'react';
import { AppProps } from 'next/app';
import { ThemeContextProvider } from "../context/ThemeContext";
import { SessionProvider } from 'next-auth/react'
import '../styles/global.css'
import '../styles/pomodoro.css'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <ThemeContextProvider>
                <Component {...pageProps} />
            </ThemeContextProvider>
        </SessionProvider>
    )
}