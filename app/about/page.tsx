import { Authors, allAuthors, allBlogs } from 'contentlayer/generated'
import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata = genPageMetadata({
  title: 'About DailyDevPost | Performance Engineering & Technical Mastery',
  description:
    'The lab for the Craftsman Developer. We document the hard-earned logic of Performance Optimization, Frontend Architecture, and AI-Assisted Engineering.',
})

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  if (!author) {
    notFound()
  }
  const mainContent = coreContent(author)

  // Fetch the 3 most recent posts for social proof/authority
  const latestPosts = allCoreContent(sortPosts(allBlogs)).slice(0, 3)



  const aboutGraph = {
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
        name: author.name,
        image: `${siteMetadata.siteUrl}/static/images/pradip-profile.jpg`,
        jobTitle: author.occupation || 'Software Developer',
        description: "Software Developer specializing in UI/UX and Ethical Design. Pradip translates daily development struggles into actionable lessons on React, Next, JavaScript, and high-performance engineering.",
        url: `${siteMetadata.siteUrl}/about`,
        worksFor: { '@id': `${siteMetadata.siteUrl}/#organization` },
        knowsAbout: [
          'React',
          'Next.js',
          'JavaScript',
          'TypeScript',
          'User Experience Design',
          'Frontend Engineering'
        ],
        sameAs: [
          author.twitter,
          author.linkedin,
          author.github,
        ].filter(link => !!link)
      },
      {
        '@type': 'WebPage',
        '@id': `${siteMetadata.siteUrl}/about/#webpage`,
        url: `${siteMetadata.siteUrl}/about`,
        name: `About | ${siteMetadata.title}`,
        description: siteMetadata.description,
        isPartOf: { '@id': `${siteMetadata.siteUrl}/#website` },
        breadcrumb: { '@id': `${siteMetadata.siteUrl}/about/#breadcrumb` },
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
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteMetadata.siteUrl}/about/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': siteMetadata.siteUrl },
          { '@type': 'ListItem', 'position': 2, 'name': 'About', 'item': `${siteMetadata.siteUrl}/about` }
        ]
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutGraph) }}
      />
      <Breadcrumbs />
      <AuthorLayout content={mainContent} latestPosts={latestPosts}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
    </>
  )
}
