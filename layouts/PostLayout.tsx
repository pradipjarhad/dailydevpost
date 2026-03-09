import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import SocialShare from '@/components/SocialShare'
import AuthorCard from '@/components/AuthorCard'
import TableOfContents, { TocItem } from '@/components/TableOfContents'
import FAQ from '@/components/FAQ'

import { allBlogs } from 'contentlayer/generated'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/content/${path}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog> & {
    frontmatter?: { comments?: boolean };
    faqs?: { question: string; answer: string }[];
    category?: string;
  }
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags, toc, faqs, category } = content
  const basePath = path.split('/')[0]
  const commentsEnabled =
    siteMetadata.comments?.provider &&
    (siteMetadata.comments as unknown as { enableFor?: string[] })?.enableFor?.includes('blog') &&
    content.frontmatter?.comments !== false

  const relatedPosts = allBlogs
    .filter((p) => p.slug !== slug)
    .map((p) => {
      const tagMatchCount = p.tags?.filter((tag) => tags?.includes(tag)).length || 0
      const categoryMatch = p.category === category ? 1 : 0
      const score = tagMatchCount * 2 + categoryMatch
      return { ...p, score }
    })
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score || new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2)

  return (
    <>
      <ScrollTopAndComment commentsEnabled={commentsEnabled} />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-4 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on, Time to read</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}{' '}
                      &mdash;{' '}
                    </time>{' '}
                    <span className="time-to-read">
                      <span role="img" aria-label="Clock">
                        🕒
                      </span>{' '}
                      {content.readingTime.text}
                    </span>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
                <SocialShare title={title} url={`${siteMetadata.siteUrl}/${path}`} />
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:grid xl:grid-cols-5 xl:gap-x-6 xl:divide-y-0 dark:divide-gray-700">
            <dl className="pb-10 pt-6 xl:border-b xl:border-gray-200 xl:dark:border-gray-700">
              <div className="divide-gray-200 text-sm font-medium xl:col-start-1 xl:row-start-2 xl:divide-y dark:divide-gray-700">
                {content.thumbnail && (
                  <div className="pt-4 xl:pt-8">
                    <Image
                      src={content.thumbnail}
                      alt={content.title}
                      className="block rounded-lg mx-auto my-0"
                      width={250}
                      height={250}
                      style={{ height: 'auto' }}
                      quality={90}
                    />
                  </div>
                )}
              </div>
            </dl>
            <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0 dark:divide-gray-700">
              {/* Mobile Table of Contents */}
              {toc && (
                <div className="block xl:hidden mb-6 pt-6">
                  <TableOfContents toc={toc as TocItem[]} />
                </div>
              )}

              <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">{children}</div>
              {faqs && <FAQ faqs={faqs} />}

              {relatedPosts.length > 0 && (
                <div className="py-10 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100">Related Articles</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {relatedPosts.map((post) => (
                      <div key={post.slug} className="group relative">
                        {post.thumbnail && (
                          <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-3">
                            <Image
                              src={post.thumbnail}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        )}
                        <h4 className="text-lg font-semibold text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/blog/${post.category}/${post.slug}`}>{post.title}</Link>
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pb-6 pt-6 text-m text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg relative overflow-hidden">
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-6xl opacity-10 pointer-events-none">☕</div>
                <p className="flex items-center relative z-10">
                  <span role="img" aria-label="Coffee" className="mr-2">☕</span>
                  Did you like the article? <Link href="https://ko-fi.com/dailydevpost" className="ml-1 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">Support me on Ko-Fi!</Link>
                </p>
              </div>
              <div className="pb-6 pt-6 text-sm text-gray-700 dark:text-gray-300">
                <Link href={editUrl(filePath)}>View this article on GitHub</Link>
              </div>
              {authorDetails.map((author) => (
                <div className="pb-6 pt-6" key={author.name}>
                  <AuthorCard author={author} />
                </div>
              ))}
              {commentsEnabled && slug && (
                <div
                  className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300"
                  id="comment"
                >
                  <Comments slug={slug} />
                </div>
              )}
            </div>

            {/* Desktop Table of Contents Sidebar */}
            <div className="hidden xl:col-start-5 xl:row-span-2 xl:block pt-10">
              {toc && <TableOfContents toc={toc as TocItem[]} />}
            </div>

            <footer className="xl:col-start-1 xl:row-start-2 xl:sticky xl:top-8 self-start">
              <div className="divide-gray-200 text-sm font-medium leading-5 xl:divide-y dark:divide-gray-700">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Tags
                    </h2>
                    <div style={{ display: 'block' }}>
                      {tags
                        .sort()
                        .map((tag, index) => [<Tag key={tag} text={tag} />, <br key={index} />])}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && prev.path && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          ⬅️ Previous Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${prev.path}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && next.path && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Next Article ➡️
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${next.path}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href={`/${basePath}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label="Back to the blog"
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </>
  )
}
