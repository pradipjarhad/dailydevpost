import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import ListLayoutWithCategories from '@/layouts/ListLayoutWithCategories'
import { genPageMetadata } from 'app/seo'
import siteMetadata, { postsPerPage } from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import { formatCategoryTitle } from '@/utils/formatCategoryTitle'
import Breadcrumbs from '@/components/Breadcrumbs'
import headerNavLinks from '@/data/headerNavLinks'

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
                '@type': 'Organization',
                '@id': `${siteMetadata.siteUrl}/#organization`,
                name: siteMetadata.title,
                url: siteMetadata.siteUrl,
                logo: {
                    '@type': 'ImageObject',
                    '@id': `${siteMetadata.siteUrl}/#logo`,
                    url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
                    width: 600,
                    height: 60,
                    caption: siteMetadata.title
                },
                sameAs: [
                    siteMetadata.github,
                    siteMetadata.twitter,
                    siteMetadata.linkedin,
                    siteMetadata.instagram
                ].filter(Boolean),
                contactPoint: {
                    '@type': 'ContactPoint',
                    email: siteMetadata.email,
                    contactType: 'customer support'
                }
            },
            {
                '@type': 'WebSite',
                '@id': `${siteMetadata.siteUrl}/#website`,
                url: siteMetadata.siteUrl,
                name: siteMetadata.title,
                publisher: { '@id': `${siteMetadata.siteUrl}/#organization` },
                potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                        '@type': 'EntryPoint',
                        urlTemplate: `${siteMetadata.siteUrl}?q={search_term_string}`
                    },
                    'query-input': 'required name=search_term_string'
                }
            },
            {
                '@type': 'Person',
                '@id': `${siteMetadata.siteUrl}/#person`,
                name: siteMetadata.author,
                jobTitle: 'Senior Frontend Engineer',
                description: "Senior Frontend Engineer specializing in UI/UX and Ethical Design. Pradip translates daily development struggles into actionable lessons on React, JavaScript, and high-performance engineering.",
                url: `${siteMetadata.siteUrl}/about`,
                image: `${siteMetadata.siteUrl}/static/images/pradip-profile.jpg`,
                worksFor: { '@id': `${siteMetadata.siteUrl}/#organization` },
                knowsAbout: [
                    'React', 
                    'User Experience Design', 
                    'Frontend Engineering'
                ],
                sameAs: [
                    siteMetadata.twitter,
                    siteMetadata.github,
                    siteMetadata.linkedin
                ].filter(Boolean)
            },
            {
                '@type': 'CollectionPage',
                '@id': `${categoryUrl}/#webpage`,
                url: categoryUrl,
                name: `${title} - Page ${pageNumber}`,
                description: `${siteMetadata.title} - ${category} posts, page ${pageNumber}`,
                isPartOf: { '@id': `${siteMetadata.siteUrl}/#website` },
                breadcrumb: { '@id': `${categoryUrl}/#breadcrumb` },
                publisher: { '@id': `${siteMetadata.siteUrl}/#organization` },
                inLanguage: 'en-US',
                speakable: {
                    '@type': 'SpeakableSpecification',
                    cssSelector: ['h1', 'p']
                }
            },
            {
                '@type': 'ItemList',
                '@id': `${siteMetadata.siteUrl}/#navigation`,
                name: 'Main Navigation',
                itemListElement: headerNavLinks.map((link, index) => ({
                    '@type': 'SiteNavigationElement',
                    position: index + 1,
                    name: link.title,
                    url: link.href.includes('http') ? link.href : `${siteMetadata.siteUrl}${link.href}`
                }))
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${categoryUrl}/#breadcrumb`,
                itemListElement: [
                    { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': siteMetadata.siteUrl },
                    { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': `${siteMetadata.siteUrl}/blog` },
                    { '@type': 'ListItem', 'position': 3, 'name': title, 'item': `${siteMetadata.siteUrl}/blog/category/${category}` },
                    { '@type': 'ListItem', 'position': 4, 'name': `Page ${pageNumber}`, 'item': categoryUrl }
                ]
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
