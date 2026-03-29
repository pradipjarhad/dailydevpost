import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import { filterPostsByPublishDate } from 'app/utils'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import categoryData from 'app/category-data.json'
import { slug } from 'github-slugger'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  // Filter blog posts
  let posts = allBlogs.filter((post) => !(process.env.NODE_ENV === 'production' && post.draft))
  posts = filterPostsByPublishDate(posts)

  const blogRoutes = posts.map((post) => ({
    url: post.url,
    lastModified: post.lastmod || post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const tagCounts = tagData as Record<string, number>
  const tagRoutes = Object.keys(tagCounts)
    .filter((tag) => tagCounts[tag] >= 1)
    .map((tag) => {
      // Ensure any spaces are replaced with valid hyphens
      const tagSlug = slug(tag).replace(/\s+/g, '-');
      return {
        url: `${siteUrl}/tags/${tagSlug}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }
    })

  const categoryCounts = categoryData as Record<string, number>
  const categoryRoutes = Object.keys(categoryCounts)
    .filter((cat) => categoryCounts[cat] >= 5)
    .map((cat) => ({
      url: `${siteUrl}/blog/category/${slug(cat)}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

  const routes = [
    '',
    'blog',
    'about',
    'contact',
    'privacy-policy',
    'terms-and-conditions',
  ].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: (route === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }))

  return [...routes, ...blogRoutes, ...tagRoutes, ...categoryRoutes]
}
