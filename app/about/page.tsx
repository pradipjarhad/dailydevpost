import { Authors, allAuthors, allBlogs } from 'contentlayer/generated'
import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import siteMetadata from '@/data/siteMetadata'
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


  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about', isLast: true },
  ]

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    image: `${siteMetadata.siteUrl}${author.avatar}`,
    jobTitle: author.occupation,
    worksFor: {
      '@type': 'Organization',
      name: author.company || siteMetadata.title,
    },
    url: `${siteMetadata.siteUrl}/about`,
    sameAs: [
      author.twitter,
      author.linkedin,
      author.github,
    ].filter(link => !!link),
    description: author.motto || author.description,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Breadcrumbs items={breadcrumbItems} />
      <AuthorLayout content={mainContent} latestPosts={latestPosts}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
    </>
  )
}
