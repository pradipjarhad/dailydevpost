import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import tagData from 'app/tag-data.json';
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import { notFound } from 'next/navigation'
import { formatCategoryTitle } from '@/utils/formatCategoryTitle'

const tagMeta: Record<string, { title: string; description: string }> = {
  'ai-for-developers': {
    title: 'AI for Developers',
    description:
      'Practical AI workflows, prompt engineering, and developer tooling that help you build, automate, and ship smarter software without losing control.',
  },
  'web-performance-optimization': {
    title: 'Web Performance Optimization',
    description:
      'Actionable advice for improving page speed, rendering experience, and frontend performance through real engineering trade-offs and modern metrics.',
  },
  'build-in-public': {
    title: 'Build in Public',
    description:
      'Developer journaling and honest progress updates that turn everyday engineering work into clear lessons and long-term momentum.',
  },
  'modern-react': {
    title: 'Modern React',
    description:
      'React patterns, hooks, and architecture guidance for building maintainable applications with the latest React best practices.',
  },
  'frontend-engineering': {
    title: 'Frontend Engineering',
    description:
      'A systems-first look at architecture, toolchains, and UI delivery for frontend applications that need to scale and stay reliable.',
  },
  'developer-career-growth': {
    title: 'Developer Career Growth',
    description:
      'Career frameworks, habits, and soft skills tailored for developers who want to grow with intention and avoid burnout.',
  },
  'software-architecture': {
    title: 'Software Architecture',
    description:
      'High-level design and system thinking that helps you build better applications by choosing the right patterns and avoiding common pitfalls.',
  },
}

export async function generateMetadata(props: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const params = await props.params
  const tag = decodeURI(params.tag)
  const title = formatCategoryTitle(tag)

  return genPageMetadata({
    title: title,
    path: `tags/${slug(tag)}`,
    alternates: {
      canonical: `${siteMetadata.siteUrl}/tags/${slug(tag)}`,
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${slug(tag)}/feed.xml`,
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

export const dynamicParams = true

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

  // If the tag has no posts or fewer than 3 posts, return 404.
  // Thin tag pages (< 3 posts) should not be indexed — returning 404 sends
  // a clear signal to Google rather than rendering a noindex page that
  // still consumes crawl budget.
  if (posts.length < 3) {
    notFound()
  }

  const tagInfo = tagMeta[tag] || {
    title,
    description: `Browse ${posts.length} articles tagged ${title} on ${siteMetadata.title}, including practical insights and examples.`,
  }

  const tagUrl = `${siteMetadata.siteUrl}/tags/${slug(tag)}`
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
      <div className="prose max-w-none text-gray-600 dark:text-gray-300 dark:prose-invert mb-8">
        <p>{tagInfo.description}</p>
        <p>
          This tag currently includes <strong>{posts.length} article{posts.length === 1 ? '' : 's'}</strong> that focus on {title.toLowerCase()} and related developer practices.
        </p>
      </div>
      <ListLayout posts={posts} title={title} />
    </>
  )
}
