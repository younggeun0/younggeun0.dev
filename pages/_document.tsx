import { Html, Head, Main, NextScript } from 'next/document'

import Opengraph from '../components/Opengraph'

export default function Document() {
    return (
        <Html>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="google-site-verification" content="JTXpGI48AchnhjFqLKv-MwGTrt8P-vXMHK2C54RJbE4" />
                <link
                    rel="stylesheet"
                    as="style"
                    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.5/dist/web/static/pretendard.css"
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                    (function() {
                        function setTheme(newTheme) {
                            window.__theme = newTheme;
                            preferredTheme = newTheme;
                            document.documentElement.className = newTheme;
                        }
                        var preferredTheme;
                        try {
                            preferredTheme = localStorage.getItem('theme');
                        } catch (err) { }
                        
                        window.__setPreferredTheme = function(newTheme) {
                            setTheme(newTheme);
                            try {
                                localStorage.setItem('theme', newTheme);
                            } catch (err) {}
                        }
                        
                        var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
                        darkQuery.addListener(function(e) {
                            window.__setPreferredTheme(e.matches ? 'dark' : 'light')
                        });

                        setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
                    })();
                    `,
                    }}
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
