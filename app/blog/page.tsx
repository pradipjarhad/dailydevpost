import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { genPageMetadata } from 'app/seo'
import { postsPerPage } from '@/data/siteMetadata'

import siteMetadata from '@/data/siteMetadata'

export const metadata = genPageMetadata({ title: 'Blog' })

export default async function BlogPage() {
    const posts = allCoreContent(sortPosts(allBlogs))
    const pageNumber = 1
    const initialDisplayPosts = posts.slice(
        postsPerPage * (pageNumber - 1),
        postsPerPage * pageNumber
    )
    const pagination = {
        currentPage: pageNumber,
        totalPages: Math.ceil(posts.length / postsPerPage),
    }

    return (
        <ListLayout
            posts={posts}
            initialDisplayPosts={initialDisplayPosts}
            pagination={pagination}
            title="All Posts"
        />
    )
}
