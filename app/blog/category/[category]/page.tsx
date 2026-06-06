import { allBlogs } from 'contentlayer/generated'
import { redirect, notFound } from 'next/navigation'

export const generateStaticParams = async () => {
  const categories = new Set(
    allBlogs
      .map((post) => post.category)
      .filter((category): category is string => typeof category === 'string')
  )

  return Array.from(categories).map((category) => ({
    category,
  }))
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const foundCategory = allBlogs.some((post) => post.category === category)

  if (!foundCategory) {
    notFound()
  }

  redirect(`/topics/${category}`)
}
