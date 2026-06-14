import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import NewsletterSignup from './NewsletterSignup'

export const metadata: Metadata = genPageMetadata({
  title: 'Newsletter',
  path: 'newsletter',
  description: 'Subscribe to the DailyDevPost newsletter for developer workflows, Next.js performance tips, AI tools, and weekly coding insights.',
})

export default function NewsletterPage() {
  return (
    <div className="pb-12 pt-6">
      <Breadcrumbs />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-gray-200 bg-white p-10 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">Newsletter</p>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
                Get weekly developer insights, tool recommendations, and AI workflow shortcuts.
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
                Join a developer-first newsletter built for engineers who want faster shipping, cleaner architecture, and smarter AI-assisted coding.
              </p>
            </div>

            <div className="rounded-3xl bg-gray-50 p-8 dark:bg-gray-900">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">What you get</p>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li>• Weekly practical guides for React, Next.js, and AI developer workflows.</li>
                  <li>• Performance checklists and reliability playbooks.</li>
                  <li>• Early access to new product recommendations and tools.</li>
                </ul>
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert">
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
