import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json' with { type: 'json' };
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Tags',
  description: 'Things I blog about',
  robots: { index: false, follow: true },
})

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => a.localeCompare(b))

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteMetadata.siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tags',
        item: `${siteMetadata.siteUrl}/tags`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="flex flex-col items-center justify-center py-12 md:py-20">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
            Topic <span className="text-primary-500">Repository</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            Explore the specialized technical clusters documented in the laboratory.
          </p>
          <div className="h-1.5 w-20 bg-primary-500 rounded-full mx-auto"></div>
        </div>
        
        <div className="flex max-w-4xl flex-wrap justify-center gap-4">
          {tagKeys.length === 0 && (
             <div className="text-gray-500 dark:text-gray-400 italic">No tags identified in current build.</div>
          )}
          {sortedTags.map((t) => {
            const count = tagCounts[t]
            // Scale based on frequency for a "cloud" feel
            const sizeClass = count > 10 ? 'text-lg px-6 py-2.5' : count > 5 ? 'text-base px-5 py-2' : 'text-sm px-4 py-1.5'
            
            return (
              <div key={t} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-600 rounded-full blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                <Link
                  href={`/tags/${slug(t)}`}
                  className={`relative flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 font-bold transition-all hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-lg hover:-translate-y-0.5 ${sizeClass}`}
                >
                  <span className="text-gray-900 dark:text-gray-100">{t}</span>
                  <span className="text-xs font-black text-primary-500 bg-primary-500/10 rounded-full px-2 py-0.5">
                    {count}
                  </span>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
