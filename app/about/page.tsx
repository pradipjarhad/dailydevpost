import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import siteMetadata from '@/data/siteMetadata'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import { notFound } from 'next/navigation'

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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteMetadata.siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: `${siteMetadata.siteUrl}/about`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
    </>
  )
}
