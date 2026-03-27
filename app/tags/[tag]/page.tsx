import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import tagData from 'app/tag-data.json' with { type: 'json' };
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import { formatCategoryTitle } from '@/utils/formatCategoryTitle'

export async function generateMetadata(props: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const params = await props.params
  const tag = decodeURI(params.tag)
  const title = formatCategoryTitle(tag)
  return genPageMetadata({
    title: title,
    robots: { index: true, follow: true },
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${slug(tag).replace(/\s+/g, '-')}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const paths = tagKeys.map((tag) => ({
    tag: tag,
  }))
  return paths
}

export default async function TagPage(props: { params: Promise<{ tag: string }> }) {
  const params = await props.params
  const tag = params.tag
  const title = formatCategoryTitle(tag)

  let sortedPosts = sortPosts(allBlogs)


  // Runtime filtering - this happens on each request
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)

  sortedPosts = sortedPosts.filter((post) => {
    const postDate = new Date(post.date)
    postDate.setUTCHours(0, 0, 0, 0)
    return postDate <= today
  })

  // Filter by tags
  const posts = allCoreContent(
    sortedPosts.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag))
  )

  // If the tag doesn't exist, return not found
  if (posts.length === 0) {
    return (
      <div className="mt-24 text-center">
        <h2 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          No posts found
        </h2>
      </div>
    )
  }

    const tagUrl = `${siteMetadata.siteUrl}/tags/${slug(tag).replace(/\s+/g, '-')}`
    const collectionGraph = {
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
                '@type': 'CollectionPage',
                '@id': `${tagUrl}/#webpage`,
                url: tagUrl,
                name: title,
                description: `Articles tagged with ${title} on ${siteMetadata.title}`,
                isPartOf: { '@id': `${siteMetadata.siteUrl}/#website` },
                breadcrumb: { '@id': `${tagUrl}/#breadcrumb` },
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
                '@id': `${tagUrl}/#breadcrumb`,
                itemListElement: [
                    { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': siteMetadata.siteUrl },
                    { '@type': 'ListItem', 'position': 2, 'name': 'Tags', 'item': `${siteMetadata.siteUrl}/tags` },
                    { '@type': 'ListItem', 'position': 3, 'name': title, 'item': tagUrl }
                ]
            }
        ]
    }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionGraph) }}
      />
      <Breadcrumbs />
      <ListLayout posts={posts} title={title} />
    </>
  )
}
