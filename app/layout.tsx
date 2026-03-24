import 'css/tailwind.css'
import 'pliny/search/kbar.css'

import { Inter } from 'next/font/google'
import siteMetadata from '@/data/siteMetadata'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import { SearchConfig } from 'pliny/search'
import { Metadata } from 'next'
import SearchProviderWrapper from '@/components/SearchProviderWrapper'
import AdSense from '@/components/AdSense'
import Analytics from '@/components/Analytics'

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
    canonical: './',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const mainGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteMetadata.siteUrl}/#organization`,
        name: siteMetadata.title,
        url: siteMetadata.siteUrl,
        logo: {
          '@type': 'ImageObject',
          '@id': `${siteMetadata.siteUrl}/#logo`,
          url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
          contentUrl: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
          width: 600,
          height: 60,
          caption: siteMetadata.title
        },
        image: {
          '@id': `${siteMetadata.siteUrl}/#logo`
        },
        sameAs: [
          siteMetadata.github,
          siteMetadata.twitter,
          siteMetadata.linkedin,
          siteMetadata.instagram,
        ].filter(link => !!link),
        contactPoint: {
          '@type': 'ContactPoint',
          email: siteMetadata.email,
          contactType: 'customer support'
        }
      },
      {
        '@type': 'WebSite',
        '@id': `${siteMetadata.siteUrl}/#website`,
        name: siteMetadata.title,
        url: siteMetadata.siteUrl,
        publisher: {
          '@id': `${siteMetadata.siteUrl}/#organization`
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteMetadata.siteUrl}?q={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        }
      }
    ]
  }

  return (
    <html
      lang={siteMetadata.language}
      className={`${inter.variable} scroll-smooth overflow-x-clip`}
      suppressHydrationWarning
    >
      <head>
        <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/static/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(mainGraph) }}
        />
        <AdSense pId="4867746193796582" />
      </head>
      <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white">
        <Analytics gaId={siteMetadata.analytics?.googleAnalytics?.googleAnalyticsId || ''} />
        <SectionContainer>
          <div className="flex h-screen flex-col justify-between font-sans">
            <Header />
            <main className="mb-auto">
              <SearchProviderWrapper searchConfig={siteMetadata.search as SearchConfig}>
                {children}
              </SearchProviderWrapper>
            </main>
            <Footer />
          </div>
        </SectionContainer>
      </body>
    </html>
  )
}
