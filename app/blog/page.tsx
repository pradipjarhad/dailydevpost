import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
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
  
  // Runtime filtering - this happens on each request
  const today = new Date()
  // Compare using UTC date-only strings (YYYY-MM-DD) to avoid timezone/build-server
  // differences excluding posts that are dated 'today' in another timezone.
  const todayDate = today.toISOString().slice(0, 10)

  posts = posts.filter((post) => {
    const postDateStr = new Date(post.date).toISOString().slice(0, 10)
    return postDateStr <= todayDate
  })
  
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
