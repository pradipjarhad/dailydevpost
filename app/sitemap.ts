import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import { filterPostsByPublishDate } from 'app/utils'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json' with { type: 'json' }
import categoryData from 'app/category-data.json' with { type: 'json' }
import { slug } from 'github-slugger'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  // Filter blog posts
  let posts = allBlogs.filter((post) => !(process.env.NODE_ENV === 'production' && post.draft))
  posts = filterPostsByPublishDate(posts)

  const blogRoutes = posts.map((post) => ({
    url: post.url,
    lastModified: post.lastmod || post.date,
  }))

  const tagCounts = tagData as Record<string, number>
  const tagRoutes = Object.keys(tagCounts)
    .filter((tag) => tagCounts[tag] >= 3)
    .map((tag) => ({
      url: `${siteUrl}/tags/${slug(tag)}`,
      lastModified: new Date().toISOString().split('T')[0],
    }))

  const categoryCounts = categoryData as Record<string, number>
  const categoryRoutes = Object.keys(categoryCounts)
    .filter((cat) => categoryCounts[cat] >= 3)
    .map((cat) => ({
      url: `${siteUrl}/categories/${slug(cat)}`,
      lastModified: new Date().toISOString().split('T')[0],
    }))

  const routes = [
    '',
    'blog',
    'categories',
    'tags',
    'about',
    'contact',
    'privacy-policy',
    'terms-and-conditions',
  ].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogRoutes, ...tagRoutes, ...categoryRoutes]
}
