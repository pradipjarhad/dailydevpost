import { ReactNode } from 'react'
import type { Authors, Blog } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import Link from '@/components/Link'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
  latestPosts?: CoreContent<Blog>[]
}

export default function AuthorLayout({ children, content, latestPosts = [] }: Props) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github } = content

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            The mission, the machinery and the man behind the engineering.
          </p>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-blue-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              {avatar && (
                <Image
                  src={avatar}
                  alt={name}
                  width={192}
                  height={192}
                  className="relative rounded-full ring-4 ring-white dark:ring-gray-950 shadow-2xl"
                  style={{ width: '12rem', height: 'auto' }}
                />
              )}
            </div>
            <h3 className="pb-2 pt-6 text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100">
              {name}
            </h3>
            <div className="text-gray-600 dark:text-gray-400 font-medium">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-500 text-sm mb-4">{company}</div>
            <div className="flex space-x-4 pt-4 border-t border-gray-100 dark:border-gray-800 w-full justify-center">
              {email && <SocialIcon kind="mail" href={`mailto:${email}`} size={6} />}
              {github && <SocialIcon kind="github" href={github} size={6} />}
              {linkedin && <SocialIcon kind="linkedin" href={linkedin} size={6} />}
              {twitter && <SocialIcon kind="twitter" href={twitter} size={6} />}
            </div>
          </div>
          <div className="prose max-w-none pb-12 pt-8 dark:prose-invert xl:col-span-2">
            {children}
          </div>
        </div>

        {latestPosts.length > 0 && (
          <div className="pt-16 pb-12">
            <div className="flex flex-col mb-10">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl mb-4 text-center sm:text-left">
                Latest Insights & Deep Dives
              </h2>
              <div className="h-1.5 w-20 bg-primary-500 rounded-full mx-auto sm:mx-0"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <article
                  key={post.slug}
                  className="relative group flex flex-col bg-white dark:bg-gray-800/40 rounded-2xl shadow-sm ring-1 ring-gray-200 dark:ring-gray-700/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:ring-primary-500/20 dark:hover:ring-primary-500/20 hover:-translate-y-1"
                >
                  {post.thumbnail && (
                    <Link href={`/blog/${post.slug}`} className="block aspect-[16/9] overflow-hidden relative bg-gray-900 rounded-xl">
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        fill
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-snug group-hover:text-primary-500 transition-colors duration-200">
                      <Link href={`/blog/${post.slug}`}>
                        <span className="absolute inset-0"></span>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                      {post.summary}
                    </p>
                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700/50 flex items-center justify-between">
                      <span className="text-xs font-bold text-primary-500 uppercase tracking-wider">
                        {post.category || 'Engineering'}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(post.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary-500 hover:bg-primary-600 transition-all duration-200 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5"
              >
                Explore Full Archive &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
