import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import { filterPostsByPublishDate } from 'app/utils'
import siteMetadata from '@/data/siteMetadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  // Filter blog posts:
  // 1. Sort by date (optional, but good for sitemap structure) - allBlogs is usually already sorted or we can trust the map order
  // 2. Filter out drafts in production
  // 3. Filter out future posts using filterPostsByPublishDate
  let posts = allBlogs.filter((post) => !(process.env.NODE_ENV === 'production' && post.draft))
  posts = filterPostsByPublishDate(posts)

  const blogRoutes = posts.map((post) => ({
    url: post.url,
    lastModified: post.lastmod || post.date,
  }))

  const routes = [
    '',
    'blog',
    'categories',
    'about',
    'contact',
    'privacy-policy',
    'terms-and-conditions',
  ].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogRoutes]
}
