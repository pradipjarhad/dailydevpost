import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import siteMetadata, { postsPerPage } from '@/data/siteMetadata'

export async function generateMetadata(props: { params: Promise<{ category: string }> }): Promise<Metadata> {
    const params = await props.params
    const category = params.category

    // Valid categories check could be here, or just let 404 handle it if no posts found

    return genPageMetadata({
        title: category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        description: `${siteMetadata.title} - ${category} posts`,
        alternates: {
            canonical: './',
            types: {
                'application/rss+xml': `${siteMetadata.siteUrl}/${category}/feed.xml`,
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

    const title = category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

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
                item: `${siteMetadata.siteUrl}/blog/${category}`,
            },
        ],
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <ListLayout
                posts={filteredPosts}
                initialDisplayPosts={initialDisplayPosts}
                pagination={pagination}
                title={title}
            />
        </>
    )
}
