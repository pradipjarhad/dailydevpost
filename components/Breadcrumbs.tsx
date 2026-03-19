'use client'

import Link from './Link'
import { usePathname } from 'next/navigation'
import { formatCategoryTitle } from '@/utils/formatCategoryTitle'

const Breadcrumbs = () => {
    const pathname = usePathname()

    // Don't show breadcrumbs on the homepage
    if (pathname === '/') return null

    const baseSegments = pathname.split('/').filter((segment) => segment !== '')
    const pathSegments: string[] = []
    for (let i = 0; i < baseSegments.length; i++) {
        // Skip 'page' and the following page number
        if (baseSegments[i] === 'page' && i + 1 < baseSegments.length && !Number.isNaN(Number(baseSegments[i + 1]))) {
            i++ // skip the next segment (the page number) as well
            continue
        }
        pathSegments.push(baseSegments[i])
    }

    return (
        <nav aria-label="Breadcrumb" className="mb-2 mt-0 flex max-w-full overflow-x-auto pb-0 scrollbar-none sm:scrollbar-default" style={{ WebkitOverflowScrolling: 'touch' }}>
            <ol className="flex items-center space-x-1 whitespace-nowrap text-sm text-gray-400 dark:text-gray-500 min-w-0">
                <li className="flex items-center">
                    <Link href="/" className="flex items-center hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                        <svg
                            className="mr-1 h-3.5 w-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        <span className="font-medium text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Home</span>
                    </Link>
                </li>
                {pathSegments.map((segment, index) => {
                    let href = `/${pathSegments.slice(0, index + 1).join('/')}`

                    // Rewrite /blog/category to /blog
                    if (href === '/blog/category') {
                        href = '/blog'
                    }
                    // For blog posts, rewrite their category breadcrumb to point to the actual category page.
                    else if (pathSegments[0] === 'blog' && index === 1 && segment !== 'page' && segment !== 'category') {
                        href = `/blog/category/${segment}`
                    }

                    const isLast = index === pathSegments.length - 1
                    const title = formatCategoryTitle(segment)

                    return (
                        <li key={`${href}-${index}`} className="flex items-center">
                            <svg
                                className="h-4 w-4 flex-shrink-0 text-gray-400 dark:text-gray-600 mx-0.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {isLast ? (
                                <span className="font-semibold text-gray-900 dark:text-gray-100" aria-current="page">
                                    {title}
                                </span>
                            ) : (
                                <Link
                                    href={href}
                                    className="font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                                >
                                    {title}
                                </Link>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}

export default Breadcrumbs
