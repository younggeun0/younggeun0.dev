import React from 'react';
import { SessionProvider } from "next-auth/react"
import { AppProps } from 'next/app';
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session} refetchInterval={0}>
            <Component {...pageProps} />
        </SessionProvider>
    );
}