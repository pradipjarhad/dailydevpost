import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import { slug } from 'github-slugger'
import EbookPromoCard from '@/components/EbookPromoCard'

const MAX_DISPLAY = 5

const TOPICS = [
  { id: 'frontend-engineering', title: 'Frontend Engineering' },
  { id: 'debugging-and-fixes', title: 'Debugging & Fixes' },
  { id: 'performance-optimization', title: 'Performance Optimization' },
]

export default function Home({ posts }) {
  if (!posts || posts.length === 0) {
    return <div className="mt-8 text-center text-gray-500 dark:text-gray-400">No posts found.</div>
  }

  const recentPosts = posts.slice(0, MAX_DISPLAY)
  const displayedSlugs = new Set(posts.slice(0, MAX_DISPLAY).map((p) => p.slug))

  return (
    <div className="mt-4 md:mt-6 mb-8 flex flex-col gap-6 md:gap-10">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 flex flex-col space-y-6 relative z-10">
          {/* <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/10 to-indigo-500/10 dark:from-primary-500/20 dark:to-indigo-500/20 border border-primary-500/25 dark:border-primary-500/10 px-3.5 py-1.5 rounded-full text-xs font-bold text-primary-600 dark:text-primary-400 w-fit shadow-sm">
            <span>🎓 Deep-Dive Frontend Insights</span>
          </div> */}

          <h1 className="text-4xl font-black leading-none tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            Mastering <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-primary-500 via-sky-500 to-indigo-500 bg-clip-text text-transparent">
              Modern Frontend
            </span> <br className="hidden sm:inline" />
            Engineering
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
            {siteMetadata.description}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/blog"
              className="w-full sm:w-auto inline-flex justify-center items-center rounded-2xl bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 px-8 py-4 text-base font-extrabold text-white shadow-lg hover:shadow-primary-500/25 dark:hover:shadow-primary-500/15 transition-all duration-300 transform active:scale-98"
            >
              Latest Posts
            </Link>
            <Link
              href="/ebook"
              className="w-full sm:w-auto inline-flex justify-center items-center rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 px-8 py-4 text-base font-extrabold text-slate-700 shadow-sm hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white transition-all duration-300 transform active:scale-98"
            >
              Get the eBook
            </Link>
          </div>
        </div>

        {/* Ebook Promo Poster Card (Right side) */}
        <div className="lg:col-span-5 w-full">
          <EbookPromoCard />
        </div>
      </section>

      {/* Recent Articles Grid */}
      {
        recentPosts.length > 0 && (
          <section className="pt-4 md:pt-6 border-t border-gray-100 dark:border-gray-800/50">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 sm:mb-8 gap-3">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                Recent Articles
              </h2>
              <Link href="/blog" className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-semibold text-base flex items-center transition-colors">
                View all posts <span className="ml-1.5" aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recentPosts.map((post) => (
                <article key={post.slug} className="relative flex flex-col bg-white dark:bg-gray-800/40 rounded-[1.5rem] shadow-sm ring-1 ring-gray-200 dark:ring-gray-700/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:ring-primary-500/20 dark:hover:ring-primary-500/20 hover:-translate-y-1 group">
                  {post.thumbnail && (
                    <Link href={`/blog/${post.slug}`} className="block aspect-[3/2] overflow-hidden relative bg-gray-900">
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                        width={600}
                        height={338}
                        style={{ width: '100%', height: '100%' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      />
                      <div className="absolute inset-0 z-20 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-t-[1.5rem] pointer-events-none"></div>
                    </Link>
                  )}
                  <div className="flex-1 flex flex-col p-6 sm:p-8">
                    <div className="flex items-center gap-x-3 mb-4 text-sm font-medium">
                      <time dateTime={post.date} className="text-gray-500 dark:text-gray-400">
                        {formatDate(post.date, siteMetadata.locale)}
                      </time>
                      <span className="text-gray-300 dark:text-gray-600">|</span>
                      <Link href={`/topics/${post.category}`} className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors uppercase tracking-wider text-xs font-bold">
                        {post.category.replace(/-/g, ' ')}
                      </Link>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-snug group-hover:text-primary-500 transition-colors duration-200">
                      <Link href={`/blog/${post.slug}`}>
                        <span className="absolute inset-0"></span>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-2 text-base leading-relaxed mb-6 flex-1">
                      {post.summary}
                    </p>
                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700/50">
                      <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-sm font-semibold text-primary-500 group-hover:text-primary-600 dark:hover:text-primary-400">
                        Read article <span className="ml-1.5 transition-transform group-hover:translate-x-1">&rarr;</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )
      }

      {/* Topic Clusters for Topical Authority */}
      <div className="flex flex-col gap-6 md:gap-8">
        {TOPICS.map(topic => {
          const topicPosts = posts
            .filter(p => p.category === topic.id && !displayedSlugs.has(p.slug))
            .slice(0, 3)

          if (topicPosts.length === 0) return null

          return (
            <section key={topic.id} className="pt-4 md:pt-6 border-t border-gray-100 dark:border-gray-800/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 flex items-center">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10 dark:bg-primary-500/20 mr-3">
                    <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </span>
                  {topic.title}
                </h2>
                <Link href={`/topics/${topic.id}`} className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-semibold text-sm flex items-center transition-colors">
                  More in {topic.title} <span className="ml-1.5" aria-hidden="true">&rarr;</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {topicPosts.map(post => (
                  <article key={post.slug} className="group relative flex flex-col items-start justify-between bg-gray-50 dark:bg-gray-800/30 p-6 rounded-2xl ring-1 ring-gray-200/50 dark:ring-gray-700/30 hover:bg-white dark:hover:bg-gray-800/80 hover:ring-primary-500/30 dark:hover:ring-primary-500/30 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center gap-x-3 text-xs mb-4 w-full">
                      <time dateTime={post.date} className="text-gray-500 dark:text-gray-400 font-medium">
                        {formatDate(post.date, siteMetadata.locale)}
                      </time>
                      <span className="ml-auto relative z-10 rounded-full bg-white dark:bg-gray-700/50 px-3 py-1 font-semibold text-gray-600 dark:text-gray-300 ring-1 ring-inset ring-gray-200 dark:ring-gray-700 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 group-hover:text-primary-600 dark:group-hover:text-primary-400 group-hover:ring-primary-500/20 transition-colors">
                        {post.category.replace(/-/g, ' ')}
                      </span>
                    </div>
                    <div className="group relative w-full flex-1">
                      <h3 className="text-lg font-bold leading-tight text-gray-900 dark:text-gray-100 group-hover:text-primary-500 transition-colors line-clamp-2 mb-3">
                        <Link href={`/blog/${post.slug}`}>
                          <span className="absolute inset-0"></span>
                          {post.title}
                        </Link>
                      </h3>
                      <p className="line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        {post.summary}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )
        })}
      </div>

    </div >
  )
}
