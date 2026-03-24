import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import ListLayoutWithCategories from '@/layouts/ListLayoutWithCategories'
import { genPageMetadata } from 'app/seo'
import siteMetadata, { postsPerPage } from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import { formatCategoryTitle } from '@/utils/formatCategoryTitle'
import Breadcrumbs from '@/components/Breadcrumbs'

export const generateStaticParams = async () => {
    const paths = [] as { category: string; page: string }[]
    const categories = new Set(allBlogs.map((post) => post.category))

    categories.forEach((category) => {
        const categoryPosts = allBlogs.filter((post) => post.category === category)
        const totalPages = Math.ceil(categoryPosts.length / postsPerPage)

        for (let i = 1; i <= totalPages; i++) {
            paths.push({
                category: category,
                page: i.toString(),
            })
        }
    })
    return paths
}

export async function generateMetadata(props: { params: Promise<{ category: string; page: string }> }) {
    const params = await props.params
    const category = params.category
    const page = parseInt(params.page)
    const title = formatCategoryTitle(category)

    return genPageMetadata({
        title: `${title} - Page ${page}`,
        description: `${siteMetadata.title} - ${category} posts`,
        alternates: {
            canonical: `${siteMetadata.siteUrl}/blog/category/${category}/page/${page}`,
        }
    })
}

export default async function Page(props: { params: Promise<{ category: string; page: string }> }) {
    const params = await props.params
    const category = params.category
    const pageNumber = parseInt(params.page)

    const title = formatCategoryTitle(category)

    const filteredPosts = allCoreContent(
        sortPosts(allBlogs).filter((post) => post.category === category)
    )

    if (filteredPosts.length === 0) {
        notFound()
    }

    const initialDisplayPosts = filteredPosts.slice(
        postsPerPage * (pageNumber - 1),
        postsPerPage * pageNumber
    )
    const pagination = {
        currentPage: pageNumber,
        totalPages: Math.ceil(filteredPosts.length / postsPerPage),
    }


    const categoryUrl = `${siteMetadata.siteUrl}/blog/category/${category}/page/${pageNumber}`
    const collectionGraph = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'CollectionPage',
                '@id': `${categoryUrl}/#webpage`,
                url: categoryUrl,
                name: `${title} - Page ${pageNumber}`,
                description: `${siteMetadata.title} - ${category} posts, page ${pageNumber}`,
                isPartOf: { '@id': `${siteMetadata.siteUrl}/#website` },
                breadcrumb: { '@id': `${categoryUrl}/#breadcrumb` },
                publisher: { '@id': `${siteMetadata.siteUrl}/#organization` }
            }
        ]
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionGraph) }}
            />
            <Breadcrumbs />
            <ListLayoutWithCategories
                posts={filteredPosts}
                initialDisplayPosts={initialDisplayPosts}
                pagination={pagination}
                title={title}
            />
        </>
    )
}
