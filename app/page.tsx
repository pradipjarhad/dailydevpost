import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'

// Revalidate the homepage every 60 seconds so newly published posts show up
// shortly after deployment without a full redeploy.
export const revalidate = 60

export default function Page() {
  // Sort posts by date
  let sortedPosts = sortPosts(allBlogs)
  
  // Runtime filtering - this happens on each request
  const today = new Date()
  // Compare using UTC date-only strings (YYYY-MM-DD) to avoid timezone/build-server
  // differences excluding posts that are dated 'today' in another timezone.
  const todayDate = today.toISOString().slice(0, 10)

  sortedPosts = sortedPosts.filter((post) => {
    const postDateStr = new Date(post.date).toISOString().slice(0, 10)
    return postDateStr <= todayDate
  })
  
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}
