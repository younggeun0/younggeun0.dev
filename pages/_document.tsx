import { Html, Head, Main, NextScript } from "next/document";

const siteTitle = "(younggeun0: 🐢) => dev";
export default function Document() {
    return (
        <Html>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <title>{siteTitle}</title>
                <link rel="icon" href="/favicon.ico" />
                {/* <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                /> */}
                <meta name="og:title" content={siteTitle} />
                <meta name="og:description" content={siteTitle} />
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
    );
}
