import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { filterPostsByPublishDate } from 'app/utils'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import siteMetadata from '@/data/siteMetadata'

// Revalidate the homepage every 60 seconds so newly published posts show up
// shortly after deployment without a full redeploy.
export const revalidate = 60

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
        '@type': 'WebPage',
        '@id': `${siteMetadata.siteUrl}/#webpage`,
        url: siteMetadata.siteUrl,
        name: siteMetadata.title,
        description: siteMetadata.description,
        isPartOf: { '@id': `${siteMetadata.siteUrl}/#website` },
        publisher: { '@id': `${siteMetadata.siteUrl}/#organization` }
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
