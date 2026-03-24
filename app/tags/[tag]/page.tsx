import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
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
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
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

  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Tags', path: '/tags' },
    { name: title, path: `/tags/${tag}`, isLast: true },
  ]

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

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <ListLayout posts={posts} title={title} />
    </>
  )
}
