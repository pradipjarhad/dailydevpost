import { allBlogs } from 'contentlayer/generated'
import { redirect, notFound } from 'next/navigation'
import { postsPerPage } from '@/data/siteMetadata'

export const generateStaticParams = async () => {
  const paths: { topic: string; page: string }[] = []
  const categories = new Set(
    allBlogs
      .map((post) => post.category)
      .filter((category): category is string => typeof category === 'string')
  )

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

export default async function Page({ params }: { params: Promise<{ category: string; page: string }> }) {
  const { category, page } = await params
  const pageNumber = parseInt(page, 10)

  if (Number.isNaN(pageNumber) || pageNumber < 1) {
    notFound()
  }

  const foundCategory = allBlogs.some((post) => post.category === category)
  if (!foundCategory) {
    notFound()
  }

  if (pageNumber === 1) {
    redirect(`/topics/${category}`)
  }

  redirect(`/topics/${category}/page/${pageNumber}`)
}
