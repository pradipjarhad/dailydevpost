'use client'

import Link from './Link'
import { usePathname } from 'next/navigation'
import { formatCategoryTitle } from '@/utils/formatCategoryTitle'
import siteMetadata from '@/data/siteMetadata'

interface BreadcrumbItem {
    name: string
    path: string
    isLast?: boolean
}

interface BreadcrumbsProps {
    items?: BreadcrumbItem[]
    category?: string
    categoryPath?: string
}

const Breadcrumbs = ({ items, category, categoryPath }: BreadcrumbsProps) => {
    const pathname = usePathname()

    // Don't show breadcrumbs on the homepage
    if (pathname === '/' && !items) return null

    let crumbs: BreadcrumbItem[] = []

    if (items) {
        crumbs = items
    } else {
        const baseSegments = pathname.split('/').filter((segment) => segment !== '')
        const pathSegments: string[] = []
        for (let i = 0; i < baseSegments.length; i++) {
            // Skip 'page' and the following page number
            if (baseSegments[i] === 'page' && i + 1 < baseSegments.length && !Number.isNaN(Number(baseSegments[i + 1]))) {
                i++ // skip the next segment (the page number) as well
                continue
            }

            // Skip 'category' in '/blog/category/...' paths
            if (baseSegments[i] === 'category' && i > 0 && baseSegments[i - 1] === 'blog') {
                continue
            }
            pathSegments.push(baseSegments[i])
        }

        const finalSegments: BreadcrumbItem[] = pathSegments.map((segment, index) => {
            let href = `/${pathSegments.slice(0, index + 1).join('/')}`

            // Rewrite /blog/category to /blog
            if (href === '/blog/category') {
                href = '/blog'
            }
            // For blog posts, rewrite their category breadcrumb to point to the actual category page.
            else if (pathSegments[0] === 'blog' && index === 1 && segment !== 'page' && segment !== 'category') {
                href = `/blog/category/${segment}`
            }

            return {
                name: formatCategoryTitle(segment),
                path: href,
                isLast: index === pathSegments.length - 1
            }
        })

        // Inject category if provided for blog posts
        if (category && pathSegments[0] === 'blog' && pathSegments.length === 2) {
            const blogIndex = 1 // After 'Home'
            const catItem = {
                name: formatCategoryTitle(category),
                path: categoryPath || `/blog/category/${category}`,
                isLast: false
            }
            finalSegments.splice(1, 0, catItem)
            // Fix isLast and positions if needed
            finalSegments[finalSegments.length - 1].isLast = true
        }

        crumbs = [
            { name: 'Home', path: '/' },
            ...finalSegments
        ]
    }

    return (
        <nav aria-label="Breadcrumb" className="mb-4 mt-0 block max-w-full overflow-x-auto pb-0 scrollbar-none sm:scrollbar-default" style={{ WebkitOverflowScrolling: 'touch' }}>
            <ol
                className="inline-flex items-center space-x-1 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 min-w-0"
            >
                {crumbs.map((crumb, index) => {
                    const isLast = crumb.isLast || index === crumbs.length - 1

                    return (
                        <li
                            key={`${crumb.path}-${index}`}
                            className="flex items-center"
                        >
                            {index > 0 && (
                                <svg
                                    className="h-4 w-4 flex-shrink-0 text-gray-500 dark:text-gray-500 mx-0.5"
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
                            )}

                            {isLast ? (
                                <span
                                    className="font-semibold text-gray-900 dark:text-gray-100 truncate max-w-[200px] sm:max-w-md"
                                    aria-current="page"
                                >
                                    {crumb.name}
                                </span>
                            ) : (
                                <Link
                                    href={crumb.path}
                                    className="font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                                >
                                    <span>{crumb.name}</span>
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
