import 'css/prism.css'
import 'katex/dist/katex.css'

import PageTitle from '@/components/PageTitle'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, coreContent, allCoreContent, CoreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allAuthors } from 'contentlayer/generated'
import type { Authors, Blog } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import { notFound } from 'next/navigation'

const defaultLayout = 'PostLayout'
const layouts = {
    PostSimple,
    PostLayout,
    PostBanner,
}

export async function generateMetadata(props: {
    params: Promise<{ slug: string }>
}): Promise<Metadata | undefined> {
    const params = await props.params
    const slug = params.slug
    const post = allBlogs.find((p) => p.slug === slug)
    const authorList = post?.authors || ['default']
    const authorDetails = authorList.map((author) => {
        const authorResults = allAuthors.find((p) => p.slug === author)
        return coreContent(authorResults as Authors)
    })
    if (!post) {
        return
    }

    const publishedAt = new Date(post.date).toISOString()
    const modifiedAt = new Date(post.lastmod || post.date).toISOString()
    const authors = authorDetails.map((author) => author.name)
    let imageList = [siteMetadata.socialBanner]
    if (post.images) {
        imageList = typeof post.images === 'string' ? [post.images] : post.images
    } else if (post.thumbnail) {
        imageList = [post.thumbnail]
    }
    const ogImages = imageList.map((img) => {
        return {
            url: img.includes('http') ? img : siteMetadata.siteUrl + img,
        }
    })

    return {
        title: post.title,
        description: post.summary,
        keywords: post.tags,
        openGraph: {
            title: post.title,
            description: post.summary,
            siteName: siteMetadata.title,
            locale: 'en_US',
            type: 'article',
            publishedTime: publishedAt,
            modifiedTime: modifiedAt,
            url: './',
            images: ogImages,
            authors: authors.length > 0 ? authors : [siteMetadata.author],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.summary,
            images: imageList,
        },
        alternates: {
            canonical: `${siteMetadata.siteUrl}/blog/${slug}`,
        },
    }
}

export const generateStaticParams = async () => {
    return allBlogs.map((p) => ({
        slug: p.slug,
    }))
}

export default async function Page(props: {
    params: Promise<{ slug: string }>
}) {
    const params = await props.params
    const slug = params.slug

    // Find post by slug
    const post = allBlogs.find((p) => p.slug === slug)

    if (!post) {
        notFound()
    }

    const authorList = post.authors || ['default']
    const authorDetails = authorList.map((author) => {
        const authorResults = allAuthors.find((p) => p.slug === author)
        return authorResults ? coreContent(authorResults as Authors) : null
    }).filter((a): a is CoreContent<Authors> => a !== null)
    const sortedCoreContents = allCoreContent(sortPosts(allBlogs))
    const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
    const prev = sortedCoreContents[postIndex + 1]
    const next = sortedCoreContents[postIndex - 1]
    const mainContent = coreContent(post)
    const jsonLd = JSON.parse(JSON.stringify(post.structuredData))
    const postUrl = `${siteMetadata.siteUrl}/blog/${slug}`
    const breadcrumbs = JSON.parse(JSON.stringify(post.breadcrumbLd))

    const articleGraph = {
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
                name: authorDetails[0]?.name || siteMetadata.personName,
                jobTitle: authorDetails[0]?.jobTitle || siteMetadata.personJobTitle,
                description: siteMetadata.personDescription,
                url: `${siteMetadata.siteUrl}/about`,
                image: `${siteMetadata.siteUrl}/static/images/pradip-profile.jpg`,
                worksFor: { '@id': `${siteMetadata.siteUrl}/#organization` },
                knowsAbout: siteMetadata.personKnowsAbout,
                sameAs: [
                    authorDetails[0]?.twitter,
                    authorDetails[0]?.github,
                    authorDetails[0]?.linkedin
                ].filter(Boolean)
            },
            {
                ...jsonLd,
                '@id': `${postUrl}/#article`,
                isPartOf: { '@id': `${postUrl}/#webpage` },
                author: {
                    '@id': authorDetails[0]?.slug === 'default' ? `${siteMetadata.siteUrl}/#person` : `${siteMetadata.siteUrl}/about/#${authorDetails[0]?.slug}`,
                    name: authorDetails[0]?.name || siteMetadata.author
                },
                publisher: { '@id': `${siteMetadata.siteUrl}/#organization` },
                mainEntityOfPage: { '@id': `${postUrl}/#webpage` },
                image: {
                    '@type': 'ImageObject',
                    url: jsonLd.image || (post.thumbnail ? post.thumbnail.includes('http') ? post.thumbnail : `${siteMetadata.siteUrl}${post.thumbnail}` : siteMetadata.socialBanner),
                    width: 1200,
                    height: 630,
                    caption: post.title
                },
                wordCount: post.readingTime.words,
                hasPart: post.faqs ? { '@id': `${postUrl}/#faq` } : undefined
            },
            {
                '@type': 'WebPage',
                '@id': `${postUrl}/#webpage`,
                url: postUrl,
                name: post.title,
                isPartOf: { '@id': `${siteMetadata.siteUrl}/#website` },
                breadcrumb: { '@id': `${postUrl}/#breadcrumb` },
                primaryImageOfPage: {
                    '@type': 'ImageObject',
                    url: jsonLd.image || (post.thumbnail ? post.thumbnail.includes('http') ? post.thumbnail : `${siteMetadata.siteUrl}${post.thumbnail}` : siteMetadata.socialBanner),
                },
                speakable: {
                    '@type': 'SpeakableSpecification',
                    cssSelector: ['h1', '.summary']
                },
                description: post.summary,
                inLanguage: 'en-US'
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
                '@id': `${postUrl}/#breadcrumb`,
                itemListElement: breadcrumbs.itemListElement
            },
            post.faqs && {
                '@type': 'FAQPage',
                '@id': `${postUrl}/#faq`,
                mainEntity: post.faqs.map((faq) => ({
                    '@type': 'Question',
                    name: faq.question,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: faq.answer
                    }
                }))
            }
        ].filter(Boolean)
    }

    const Layout = layouts[post.layout || defaultLayout]

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleGraph) }}
            />
            <Layout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
                <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
            </Layout>
        </>
    )
}
