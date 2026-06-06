import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import ListLayoutWithCategories from '@/layouts/ListLayoutWithCategories'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import { formatCategoryTitle } from '@/utils/formatCategoryTitle'
import Breadcrumbs from '@/components/Breadcrumbs'
import siteMetadata, { postsPerPage } from '@/data/siteMetadata'
import topicMeta from '@/data/topicMeta'
import { notFound } from 'next/navigation'

export const generateStaticParams = async () => {
  const paths: { topic: string; page: string }[] = []
  const categories = new Set(allBlogs.map((post) => post.category))

  categories.forEach((topic) => {
    const topicPosts = allBlogs.filter((post) => post.category === topic)
    const totalPages = Math.ceil(topicPosts.length / postsPerPage)

    for (let i = 1; i <= totalPages; i++) {
      paths.push({
        topic,
        page: i.toString(),
      })
    }
  })

  return paths
}

export async function generateMetadata(props: { params: Promise<{ topic: string; page: string }> }): Promise<Metadata> {
  const { topic, page } = await props.params
  const meta = topicMeta[topic]
  const title = meta ? `${meta.title} - Page ${page}` : `Topic - Page ${page}`

  return genPageMetadata({
    title,
    description: meta?.description || siteMetadata.description,
    path: `topics/${topic}/page/${page}`,
    alternates: {
      canonical: `${siteMetadata.siteUrl}/topics/${topic}/page/${page}`,
    },
  })
}

export default async function TopicPage({ params }: { params: Promise<{ topic: string; page: string }> }) {
  const { topic, page } = await params
  const pageNumber = parseInt(page, 10)
  const meta = topicMeta[topic]

  if (!meta || Number.isNaN(pageNumber) || pageNumber < 1) {
    notFound()
  }

  const filteredPosts = allCoreContent(
    sortPosts(allBlogs).filter((post) => post.category === topic)
  )

  if (!filteredPosts.length) {
    notFound()
  }

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  if (pageNumber > totalPages) {
    notFound()
  }

  const initialDisplayPosts = filteredPosts.slice(
    postsPerPage * (pageNumber - 1),
    postsPerPage * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages,
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
