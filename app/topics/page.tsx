import { genPageMetadata } from 'app/seo'
import siteMetadata from '@/data/siteMetadata'
import Link from '@/components/Link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { formatCategoryTitle } from '@/utils/formatCategoryTitle'
import categoryData from 'app/category-data.json'
import topicMeta from '@/data/topicMeta'

export const metadata = genPageMetadata({
  title: 'Topics',
  path: 'topics',
  description: 'Browse DailyDevPost topics for frontend engineering, AI developer tooling, debugging, performance optimization, and career growth.',
})

const SortedCategories = Object.entries(categoryData)
  .sort(([, a], [, b]) => b - a)
  .map(([category, count]) => ({ category, count }))

export default function TopicsPage() {
  return (
    <div className="pb-12 pt-6">
      <Breadcrumbs />
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6 mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary-500">Topics</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            Discover the developer topics that matter in 2026
          </h1>
          <p className="max-w-5xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            DailyDevPost organizes the best frontend engineering, AI workflow, debugging, performance, and product development content into practical topic hubs you can use right away.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SortedCategories.map(({ category, count }) => {
            const meta = topicMeta[category]
            return (
              <Link
                key={category}
                href={`/topics/${category}`}
                className="group block overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-primary-500 hover:bg-primary-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-primary-500 dark:hover:bg-gray-950"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 transition-colors group-hover:text-primary-600">
                      {formatCategoryTitle(category)}
                    </h2>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {meta?.description ?? 'Explore curated content on this topic.'}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.24em] text-gray-400 dark:text-gray-500">
                      {count} article{count === 1 ? '' : 's'}
                    </p>
                  </div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-white transition duration-200 group-hover:bg-primary-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        <section className="mt-16 rounded-[2rem] border border-gray-200 bg-gray-50 p-8 dark:border-gray-700 dark:bg-gray-950">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">How to use these topic hubs</h2>
            <p className="text-base leading-8 text-gray-600 dark:text-gray-300">
              Start with the category that matches your current project. Use individual guides to solve real problems, then circle back to the hub page for deeper strategy and related content.
            </p>
            <ul className="grid gap-3 text-sm text-gray-600 dark:text-gray-300 sm:grid-cols-2">
              <li className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-900">Learn the core frameworks and architecture patterns.</li>
              <li className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-900">Find AI-first developer workflows and tool comparisons.</li>
              <li className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-900">Use structured tutorials to fix production issues fast.</li>
              <li className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-900">Discover expert performance and debugging checklists.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
