import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import ListLayoutWithCategories from '@/layouts/ListLayoutWithCategories'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'
import Breadcrumbs from '@/components/Breadcrumbs'

const POSTS_PER_PAGE = 6

export const generateStaticParams = async () => {
    const totalPages = Math.ceil(allBlogs.length / POSTS_PER_PAGE)
    const paths = Array.from({ length: totalPages }, (_, i) => ({
        page: (i + 1).toString(),
    }))
    return paths
}

export async function generateMetadata(props: { params: Promise<{ page: string }> }) {
    const params = await props.params
    const page = parseInt(params.page)
    return genPageMetadata({
        title: `Page ${page}`,
        description: siteMetadata.description,
        alternates: {
            canonical: `${siteMetadata.siteUrl}/blog/page/${page}`,
        }
    })
}

export default async function Page(props: { params: Promise<{ page: string }> }) {
    const params = await props.params
    const posts = allCoreContent(sortPosts(allBlogs))
    const pageNumber = parseInt(params.page)
    const initialDisplayPosts = posts.slice(
        POSTS_PER_PAGE * (pageNumber - 1),
        POSTS_PER_PAGE * pageNumber
    )
    const pagination = {
        currentPage: pageNumber,
        totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    }

    const breadcrumbItems = [
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog', isLast: true },
    ]

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <ListLayoutWithCategories
                posts={posts}
                initialDisplayPosts={initialDisplayPosts}
                pagination={pagination}
                title="All Posts"
            />
        </>
    )
}
