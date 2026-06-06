import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import ListLayoutWithCategories from '@/layouts/ListLayoutWithCategories'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import { formatCategoryTitle } from '@/utils/formatCategoryTitle'
import Breadcrumbs from '@/components/Breadcrumbs'
import siteMetadata, { postsPerPage } from '@/data/siteMetadata'
import topicMeta from '@/data/topicMeta'
import categoryData from 'app/category-data.json'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const categories = Object.keys(categoryData)
  return categories.map((topic) => ({ topic }))
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params
  const meta = topicMeta[topic]
  if (!meta) {
    return {
      title: 'Topic',
      description: siteMetadata.description,
    }
  }

  return genPageMetadata({
    title: meta.title,
    description: meta.description,
    path: `topics/${topic}`,
    alternates: {
      canonical: `${siteMetadata.siteUrl}/topics/${topic}`,
    },
  })
}

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params
  const meta = topicMeta[topic]
  if (!meta) {
    notFound()
  }

  const filteredPosts = allCoreContent(
    sortPosts(allBlogs).filter((post) => post.category === topic)
  )

  if (!filteredPosts.length) {
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

  return (
    <>
      <Breadcrumbs />
      <ListLayoutWithCategories
        posts={filteredPosts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  )
}
