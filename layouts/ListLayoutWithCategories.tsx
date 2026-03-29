/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import { allAuthors } from 'contentlayer/generated'
import Link from '@/components/Link'
import categoryData from 'app/category-data.json';
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import { formatCategoryTitle } from '@/utils/formatCategoryTitle'

interface PaginationProps {
    totalPages: number
    currentPage: number
}
interface ListLayoutProps {
    posts: CoreContent<Blog>[]
    title: string
    initialDisplayPosts?: CoreContent<Blog>[]
    pagination?: PaginationProps
}

const generatePagination = (currentPage: number, totalPages: number) => {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    if (currentPage <= 3) {
        return [1, 2, 3, 4, '...', totalPages - 1, totalPages]
    }
    if (currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
    const pathname = usePathname()
    // basePath removes the trailing /page/... so we can append cleanly
    const basePath = pathname.replace(/\/page\/\d+$/, '')

    const prevPage = currentPage - 1 > 0
    const nextPage = currentPage + 1 <= totalPages
    const pages = generatePagination(currentPage, totalPages)

    return (
        <div className="flex flex-col items-center justify-center pb-12 pt-10">
            <nav aria-label="Pagination Navigation" className="flex items-center space-x-1 sm:space-x-2">
                {/* Previous Button */}
                <Link
                    href={currentPage - 1 === 1 ? `${basePath}/` : `${basePath}/page/${currentPage - 1}`}
                    rel="prev"
                    className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-200 ${prevPage
                            ? 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-primary-600 hover:border-primary-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-primary-400 dark:hover:border-primary-500 shadow-sm'
                            : 'border-transparent bg-transparent text-gray-400 cursor-not-allowed dark:text-gray-600'
                        }`}
                    aria-disabled={!prevPage}
                    onClick={(e) => {
                        if (!prevPage) e.preventDefault()
                    }}
                    aria-label="Previous Page"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </Link>

                {/* Page Numbers */}
                <div className="flex items-center space-x-1 sm:space-x-2">
                    {pages.map((page, index) => {
                        if (page === '...') {
                            return (
                                <span key={`ellipsis-${index}`} className="flex items-center justify-center w-8 h-10 text-gray-500 dark:text-gray-400 cursor-default">
                                    ...
                                </span>
                            )
                        }

                        const pageNumber = page as number
                        const isCurrent = pageNumber === currentPage

                        return (
                            <Link
                                key={pageNumber}
                                href={pageNumber === 1 ? `${basePath}/` : `${basePath}/page/${pageNumber}`}
                                aria-current={isCurrent ? 'page' : undefined}
                                className={`flex items-center justify-center w-10 h-10 text-[15px] font-semibold rounded-lg border transition-all duration-200 shadow-sm ${isCurrent
                                        ? 'border-primary-500 bg-primary-500 text-white shadow-md shadow-primary-500/20'
                                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-primary-600 hover:border-primary-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-primary-400 dark:hover:border-primary-500'
                                    }`}
                                aria-label={`Page ${pageNumber}`}
                            >
                                {pageNumber}
                            </Link>
                        )
                    })}
                </div>

                {/* Next Button */}
                <Link
                    href={nextPage ? `${basePath}/page/${currentPage + 1}` : '#'}
                    rel="next"
                    className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-200 ${nextPage
                            ? 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-primary-600 hover:border-primary-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-primary-400 dark:hover:border-primary-500 shadow-sm'
                            : 'border-transparent bg-transparent text-gray-400 cursor-not-allowed dark:text-gray-600'
                        }`}
                    aria-disabled={!nextPage}
                    onClick={(e) => {
                        if (!nextPage) e.preventDefault()
                    }}
                    aria-label="Next Page"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </Link>
            </nav>
        </div>
    )
}

export default function ListLayoutWithCategories({
    posts,
    title,
    initialDisplayPosts = [],
    pagination,
}: ListLayoutProps) {
    const pathname = usePathname()
    const categoryCounts = categoryData as Record<string, number>
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // Custom sorting alphabetical
    const sortedCategories = Object.keys(categoryCounts).sort((a, b) => a.localeCompare(b))

    const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

    return (
        <>
            <div className="pb-12 pt-6">
                <div className="flex flex-col items-center mb-10 text-center">
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100 border-b-2 border-primary-500 pb-2 inline-block">
                        {title}
                    </h1>
                </div>

                {/* Mobile Category Filters Toggle */}
                <div className="flex md:hidden items-center justify-between mb-6 px-4">
                    <span className="text-lg font-bold text-primary-500">Category Filters</span>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle Category Filters">
                        {isMobileMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Category Pills Navigation */}
                <div className={`${isMobileMenuOpen ? 'grid grid-cols-2' : 'hidden md:flex'} md:flex-wrap justify-center gap-3 mb-10 px-4 sm:px-0`}>
                    <Link
                        href="/blog"
                        className={`px-3 py-2 sm:px-4 sm:py-2 text-center text-sm font-medium rounded-md transition-colors ${pathname === '/blog' || pathname.startsWith('/blog/page/')
                            ? 'bg-primary-500 text-white shadow-md'
                            : 'bg-white text-gray-700 shadow-sm border border-gray-100 hover:text-primary-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:text-primary-400'
                            }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        All Blogs
                    </Link>
                    {sortedCategories.map((cat) => {
                        // Determine if this category is active
                        const isActive = pathname.includes(`/blog/category/${slug(cat)}`)
                        const categoryTitle = formatCategoryTitle(cat)
                        return (
                            <Link
                                key={cat}
                                href={`/blog/category/${slug(cat)}`}
                                className={`px-3 py-2 sm:px-4 sm:py-2 text-center text-sm font-medium rounded-md transition-colors ${isActive
                                    ? 'bg-primary-500 text-white shadow-md'
                                    : 'bg-white text-gray-700 shadow-sm border border-gray-100 hover:text-primary-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:text-primary-400'
                                    }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span className="line-clamp-1">{categoryTitle}</span>
                            </Link>
                        )
                    })}
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayPosts.map((post) => {
                        const { path, date, title, summary, thumbnail, readingTime } = post

                        // Get category title for display
                        const postCategory = post.category ? formatCategoryTitle(post.category) : 'Uncategorized'

                        // Get author details
                        const authorList = post.authors || ['default']
                        const authorStr = authorList[0]
                        const author = allAuthors.find((p) => p.slug === authorStr) || allAuthors[0]

                        // Format date to show short month and day like "Feb 8"
                        const dateObj = new Date(date);
                        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

                        return (
                            <div key={path} className="group flex flex-col flex-1 overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-gray-800 dark:shadow-gray-800/40 border border-gray-100 dark:border-gray-700 h-full">
                                {/* Thumbnail Image */}
                                {thumbnail && (
                                    <Link href={`/${path}`} className="relative block aspect-[3/2] w-full overflow-hidden flex-shrink-0">
                                        <Image
                                            src={thumbnail}
                                            alt={title}
                                            fill
                                            className="transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                                        />
                                    </Link>
                                )}

                                <div className="flex flex-col flex-1 p-6">
                                    {/* Category and Read Time */}
                                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
                                        <Link href={`/blog/category/${slug(post.category || '')}`} className="text-gray-500 hover:text-primary-500 transition-colors">
                                            {postCategory}
                                        </Link>
                                        <span className="flex items-center gap-1 text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-[14px] w-[14px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {readingTime?.text?.replace('min read', 'mins') || '1 min'}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <Link href={`/${path}`} className="mb-3 block group">
                                        <h3 className="text-[22px] font-bold leading-snug text-gray-900 dark:text-gray-100 group-hover:text-primary-500 transition-colors line-clamp-2">
                                            {title}
                                        </h3>
                                    </Link>

                                    {/* Summary */}
                                    <div className="prose mb-6 max-w-none text-sm leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-3">
                                        {summary}
                                    </div>

                                    {/* Spacer to push footer to bottom */}
                                    <div className="mt-auto"></div>

                                    {/* Animated Divider */}
                                    <div className="relative mb-5 flex items-center w-full">
                                        {/* Base line */}
                                        <div className="absolute inset-x-0 h-px bg-gray-100 dark:bg-gray-700" />
                                        {/* Animated line overlay */}
                                        <div className="absolute inset-x-0 h-px bg-primary-500 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                                        {/* Animated arrow */}
                                        <span className="absolute right-0 opacity-0 -translate-x-4 transition-all duration-500 ease-out text-primary-500 group-hover:opacity-100 group-hover:translate-x-0 bg-white dark:bg-gray-800 pl-2">
                                            <svg width="6" height="10" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                    </div>

                                    {/* Author and Date Footer */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {author?.avatar && (
                                                <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-gray-100 dark:border-gray-700">
                                                    <Image
                                                        src={author.avatar}
                                                        alt={author.name}
                                                        fill
                                                        className="object-cover"
                                                        sizes="40px"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex flex-col justify-center">
                                                <Link href="/about" className="text-[14px] font-bold text-gray-900 dark:text-gray-100 leading-none mb-1 hover:text-primary-500 transition-colors">{author?.name}</Link>
                                                <span className="text-[12px] text-gray-500 dark:text-gray-400 line-clamp-1 leading-none">{author?.occupation || author?.company}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center text-[12px] text-gray-400 dark:text-gray-500 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-[14px] w-[14px] mb-1 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <time dateTime={date} className="font-medium">{formattedDate}</time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {pagination && pagination.totalPages > 1 && (
                <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
        </>
    )
}
