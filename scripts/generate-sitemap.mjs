import fs from 'fs'
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import siteMetadata from '../data/siteMetadata.js'

async function generate() {
    const siteUrl = siteMetadata.siteUrl

    // 1. Blog posts
    const blogRoutes = allBlogs
        .filter((post) => !post.draft)
        .map((post) => ({
            url: post.url,
            lastmod: post.lastmod || post.date,
        }))

    // 2. Base routes
    const baseRoutes = [
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
        lastmod: new Date().toISOString().split('T')[0],
    }))

    // 3. Combine
    const allRoutes = [...baseRoutes, ...blogRoutes]

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
            .map(
                (route) => `  <url>
    <loc>${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
  </url>`
            )
            .join('\n')}
</urlset>`

    fs.writeFileSync('public/sitemap.xml', sitemap)

    const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`
    fs.writeFileSync('public/robots.txt', robots)

    console.log('Sitemap and robots.txt generated in public/')
}

generate()
