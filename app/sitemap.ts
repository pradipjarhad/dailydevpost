import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import { filterPostsByPublishDate } from 'app/utils'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import categoryData from 'app/category-data.json'
import { slug } from 'github-slugger'

export const dynamic = 'force-static'

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
    .filter((tag) => tagCounts[tag] >= 3)
    .map((tag) => {
      const tagSlug = slug(tag)
      // Compute lastModified from the most recent post lastmod in this tag
      const tagPosts = posts.filter(
        (post) => post.tags && post.tags.map((t: string) => slug(t)).includes(tagSlug)
      )
      const lastModified = tagPosts.reduce<string>((latest, post) => {
        const d = new Date(post.lastmod || post.date)
        return d > new Date(latest) ? String(post.lastmod || post.date) : latest
      }, String(tagPosts[0]?.lastmod || tagPosts[0]?.date || new Date().toISOString()))

      return {
        url: `${siteUrl}/tags/${tagSlug}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }
    })

  const categoryCounts = categoryData as Record<string, number>
  const categoryRoutes = Object.keys(categoryCounts)
    .filter((cat) => categoryCounts[cat] >= 3)
    .map((cat) => {
      const catSlug = slug(cat)
      // Compute lastModified from the most recent post lastmod in this category
      const catPosts = posts.filter(
        (post) => post.category && slug(post.category) === catSlug
      )
      const lastModified = catPosts.reduce<string>((latest, post) => {
        const d = new Date(post.lastmod || post.date)
        return d > new Date(latest) ? String(post.lastmod || post.date) : latest
      }, String(catPosts[0]?.lastmod || catPosts[0]?.date || new Date().toISOString()))

      return {
        url: `${siteUrl}/topics/${catSlug}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }
    })

  const routes = [
    '',
    'blog',
    'topics',
    'about',
    'contact',
    'ebook',
    // 'pricing',
    // 'refund-policy',
    'privacy-policy',
    'terms-and-conditions',
  ].map((route) => ({
    url: `${siteUrl}/${route}`,
    changeFrequency: (route === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }))

  return [...routes, ...blogRoutes, ...tagRoutes, ...categoryRoutes]
}
