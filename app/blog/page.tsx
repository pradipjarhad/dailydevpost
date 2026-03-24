import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import ListLayoutWithCategories from '@/layouts/ListLayoutWithCategories'
import { genPageMetadata } from 'app/seo'
import { postsPerPage } from '@/data/siteMetadata'
import Breadcrumbs from '@/components/Breadcrumbs'
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



    const blogUrl = `${siteMetadata.siteUrl}/blog`
    const collectionGraph = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'CollectionPage',
                '@id': `${blogUrl}/#webpage`,
                url: blogUrl,
                name: 'Blog',
                description: siteMetadata.description,
                isPartOf: { '@id': `${siteMetadata.siteUrl}/#website` },
                breadcrumb: { '@id': `${blogUrl}/#breadcrumb` },
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
                posts={posts}
                initialDisplayPosts={initialDisplayPosts}
                pagination={pagination}
                title="All Posts"
            />
        </>
    )
}
