import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { filterPostsByPublishDate } from 'app/utils'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { genPageMetadata } from 'app/seo'

const POSTS_PER_PAGE = 10

export const metadata = genPageMetadata({ title: 'Blog' })
// Revalidate the blog listing every 60 seconds in production so newly published posts
// (with today's date) get picked up without a full redeploy.
export const revalidate = 60

export default function BlogPage() {
  // Sort posts by date
  let posts = sortPosts(allBlogs)
  
  // Runtime filtering - use shared helper that respects production env and scheduled
  // publish hour (see `SCHEDULED_POST_PUBLISH_HOUR` in `app/config.ts`).
  posts = filterPostsByPublishDate(posts)
  
  const filteredPosts = allCoreContent(posts)

  const pageNumber = 1
  const initialDisplayPosts = filteredPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
  }

  return (
    <ListLayout
      posts={filteredPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
