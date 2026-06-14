import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { filterPostsByPublishDate } from 'app/utils'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'

// Revalidate the homepage every 60 seconds so newly published posts show up
// shortly after deployment without a full redeploy.
export const revalidate = 60

export const metadata: Metadata = genPageMetadata({ 
  title: siteMetadata.title,
  description: siteMetadata.description,
})

export default function Page() {
  // Sort posts by date
  let sortedPosts = sortPosts(allBlogs)
  
  // Runtime filtering - use shared helper that respects production env and scheduled
  // publish hour (see `SCHEDULED_POST_PUBLISH_HOUR` in `app/config.ts`).
  sortedPosts = filterPostsByPublishDate(sortedPosts)
  
  const posts = allCoreContent(sortedPosts)
  
  const homeGraph = {
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
          width: 600,
          height: 60,
          caption: siteMetadata.title
        },
        sameAs: [
          siteMetadata.github,
          siteMetadata.twitter,
          siteMetadata.linkedin,
          siteMetadata.instagram
        ].filter(Boolean),
        contactPoint: {
          '@type': 'ContactPoint',
          email: siteMetadata.email,
          contactType: 'customer support'
        }
      },
      {
        '@type': 'WebSite',
        '@id': `${siteMetadata.siteUrl}/#website`,
        url: siteMetadata.siteUrl,
        name: siteMetadata.title,
        description: siteMetadata.description,
        publisher: { '@id': `${siteMetadata.siteUrl}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteMetadata.siteUrl}?q={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'Person',
        '@id': `${siteMetadata.siteUrl}/#person`,
        name: siteMetadata.author,
        jobTitle: 'Senior Frontend Engineer',
        description: "Senior Frontend Engineer specializing in UI/UX and Ethical Design. Pradip translates daily development struggles into actionable lessons on React, JavaScript, and high-performance engineering.",
        url: `${siteMetadata.siteUrl}/about`,
        image: `${siteMetadata.siteUrl}/static/images/pradip-profile.jpg`,
        worksFor: { '@id': `${siteMetadata.siteUrl}/#organization` },
        knowsAbout: [
          'React', 
          'User Experience Design', 
          'Frontend Engineering'
        ],
        sameAs: [
          siteMetadata.twitter,
          siteMetadata.github,
          siteMetadata.linkedin
        ].filter(Boolean)
      },
      {
        '@type': 'WebPage',
        '@id': `${siteMetadata.siteUrl}/#webpage`,
        url: siteMetadata.siteUrl,
        name: siteMetadata.title,
        description: siteMetadata.description,
        isPartOf: { '@id': `${siteMetadata.siteUrl}/#website` },
        publisher: { '@id': `${siteMetadata.siteUrl}/#organization` },
        inLanguage: 'en-US',
        speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', 'p']
        }
      },
      {
        '@type': 'ItemList',
        '@id': `${siteMetadata.siteUrl}/#navigation`,
        name: 'Main Navigation',
        itemListElement: headerNavLinks.map((link, index) => ({
            '@type': 'SiteNavigationElement',
            position: index + 1,
            name: link.title,
            url: link.href.includes('http') ? link.href : `${siteMetadata.siteUrl}${link.href}`
        }))
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeGraph) }}
      />
      <Main posts={posts} />
    </>
  )
}
