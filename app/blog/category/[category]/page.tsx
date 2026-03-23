import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import ListLayoutWithCategories from '@/layouts/ListLayoutWithCategories'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import siteMetadata, { postsPerPage } from '@/data/siteMetadata'
import { formatCategoryTitle } from '@/utils/formatCategoryTitle'
import Breadcrumbs from '@/components/Breadcrumbs'

import categoryData from 'app/category-data.json' with { type: 'json' }

export async function generateMetadata(props: { params: Promise<{ category: string }> }): Promise<Metadata> {
    const params = await props.params
    const category = params.category
    const counts = categoryData as Record<string, number>
    const postCount = counts[category] || 0

    return genPageMetadata({
        title: formatCategoryTitle(category),
        description: `${siteMetadata.title} - ${category} posts`,
        robots: postCount < 5 ? { index: false, follow: true } : { index: true, follow: true },
        alternates: {
            canonical: './',
            types: {
                'application/rss+xml': `${siteMetadata.siteUrl}/blog/category/${category}/feed.xml`,
            },
        },
    })
}

export const generateStaticParams = async () => {
    // Get all unique categories from blogs
    const categories = new Set(allBlogs.map((post) => post.category))
    return Array.from(categories).map((category) => ({
        category: category,
    }))
}

export default async function CategoryPage(props: { params: Promise<{ category: string }> }) {
    const params = await props.params
    const category = params.category

    const title = formatCategoryTitle(category)

    // Filter posts by category
    const filteredPosts = allCoreContent(
        sortPosts(allBlogs).filter((post) => post.category === category)
    )

    if (filteredPosts.length === 0) {
        notFound()
    }

    const pageNumber = 1
    const initialDisplayPosts = filteredPosts.slice(
        postsPerPage * (pageNumber - 1),
        postsPerPage * pageNumber
    )
    const pagination = {
        currentPage: pageNumber,
        totalPages: Math.ceil(filteredPosts.length / postsPerPage),
    }

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: siteMetadata.siteUrl,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: `${siteMetadata.siteUrl}/blog`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: title,
                item: `${siteMetadata.siteUrl}/blog/category/${category}`,
            },
        ],
    }

    const breadcrumbItems = [
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: title, path: `/blog/category/${category}`, isLast: true },
    ]

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Breadcrumbs items={breadcrumbItems} />
            <ListLayoutWithCategories
                posts={filteredPosts}
                initialDisplayPosts={initialDisplayPosts}
                pagination={pagination}
                title={title}
            />
        </>
    )
}
