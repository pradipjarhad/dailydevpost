import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import ListLayoutWithCategories from '@/layouts/ListLayoutWithCategories'
import { genPageMetadata } from 'app/seo'
import siteMetadata, { postsPerPage } from '@/data/siteMetadata'
import { notFound } from 'next/navigation'

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
    const title = category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

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

    const title = category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

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

    return (
        <ListLayoutWithCategories
            posts={filteredPosts}
            initialDisplayPosts={initialDisplayPosts}
            pagination={pagination}
            title={title}
        />
    )
}
