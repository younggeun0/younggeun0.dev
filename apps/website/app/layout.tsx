import { ReactNode } from 'react'

import Footer from '@/app/Footer'
import '@/styles/global.css'
import GoogleAnalytics from '@/app/GoogleAnalytics'
import { description } from '@/components/Opengraph'

export const metadata = {
  title: 'younggeun0.dev',
  description,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="google-site-verification" content="JTXpGI48AchnhjFqLKv-MwGTrt8P-vXMHK2C54RJbE4" />
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.5/dist/web/static/pretendard.css"
        />
        <link rel="preconnect" href="https://statics.goorm.io" />
        <link rel="preload" as="style" href="https://statics.goorm.io/fonts/GoormSans/v1.0.0/GoormSans.min.css" />
        <link rel="stylesheet" href="https://statics.goorm.io/fonts/GoormSans/v1.0.0/GoormSans.min.css" />
      </head>
      <body>
        {process.env.NODE_ENV === 'production' && <GoogleAnalytics />}

        <div className="mx-auto w-full md:w-3/4 lg:w-[50%]">
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
