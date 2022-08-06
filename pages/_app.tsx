import React from 'react';
import { SessionProvider } from "next-auth/react"
import { AppProps } from 'next/app';
import { ThemeContextProvider } from "../context/ThemeContext";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session} refetchInterval={0}>
            <ThemeContextProvider>
                <Component {...pageProps} />
            </ThemeContextProvider>
        </SessionProvider>
    );
}