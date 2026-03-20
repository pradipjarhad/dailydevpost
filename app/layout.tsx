import 'css/tailwind.css'
import 'css/custom.css'

import { Inter } from 'next/font/google'
import React from 'react'
import Analytics from '@/components/Analytics'
import { SearchConfig } from 'pliny/search'
import SearchProviderWrapper from '@/components/SearchProviderWrapper'
import Header from '@/components/Header'
import ReadingProgressBar from '@/components/ReadingProgressBar'
import Breadcrumbs from '@/components/Breadcrumbs'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: siteMetadata.author }],
  creator: siteMetadata.author,
  publisher: siteMetadata.author,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: siteMetadata.siteUrl,
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

// import AdSense from '@/components/AdSense'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteMetadata.title,
    url: siteMetadata.siteUrl,
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteMetadata.title,
    url: siteMetadata.siteUrl,
    logo: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
    sameAs: [
      siteMetadata.twitter,
      siteMetadata.linkedin,
      siteMetadata.github,
      siteMetadata.instagram,
    ].filter((link) => !!link),
  }

  return (
    <html
      lang={siteMetadata.language}
      className={`${inter.variable} scroll-smooth overflow-x-clip`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/static/favicons/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body className="bg-white text-black antialiased dark:bg-gray-950 dark:text-white">
        <ThemeProviders>
          <a
            href="#skip-nav"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-primary-500 focus:shadow-md dark:focus:bg-gray-900"
          >
            Skip to content
          </a>
          <ReadingProgressBar />
          <SectionContainer>
            <div className="flex min-h-screen flex-col justify-between font-sans">
              <SearchProviderWrapper searchConfig={siteMetadata.search as SearchConfig}>
                <Header />
                <main id="skip-nav" className="mb-auto">
                  <Breadcrumbs />
                  {children}
                </main>
              </SearchProviderWrapper>
              <Footer />
            </div>
          </SectionContainer>
        </ThemeProviders>
        <Analytics gaId={siteMetadata.analytics?.googleAnalytics?.googleAnalyticsId || ''} />
        {/* <AdSense pId={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE || ''} /> */}
      </body>
    </html>
  )
}
