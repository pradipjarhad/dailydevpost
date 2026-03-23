'use client'

import Link from './Link'
import { usePathname } from 'next/navigation'
import { formatCategoryTitle } from '@/utils/formatCategoryTitle'

interface BreadcrumbItem {
    name: string
    path: string
    isLast?: boolean
}

interface BreadcrumbsProps {
    items?: BreadcrumbItem[]
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
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
            pathSegments.push(baseSegments[i])
        }

        crumbs = [
            { name: 'Home', path: '/' },
            ...pathSegments.map((segment, index) => {
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
        ]
    }

    return (
        <nav aria-label="Breadcrumb" className="mb-6 mt-0 flex max-w-full overflow-x-auto pb-0 scrollbar-none sm:scrollbar-default" style={{ WebkitOverflowScrolling: 'touch' }}>
            <ol 
                className="flex items-center space-x-1 whitespace-nowrap text-sm text-gray-400 dark:text-gray-500 min-w-0"
                itemScope 
                itemType="https://schema.org/BreadcrumbList"
            >
                {crumbs.map((crumb, index) => {
                    const isLast = crumb.isLast || index === crumbs.length - 1
                    
                    return (
                        <li 
                            key={`${crumb.path}-${index}`} 
                            className="flex items-center"
                            itemProp="itemListElement" 
                            itemScope 
                            itemType="https://schema.org/ListItem"
                        >
                            {index > 0 && (
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
                            )}
                            
                            {isLast ? (
                                <span 
                                    className="font-semibold text-gray-900 dark:text-gray-100 truncate max-w-[200px] sm:max-w-md" 
                                    aria-current="page"
                                    itemProp="name"
                                >
                                    {crumb.name}
                                </span>
                            ) : (
                                <Link
                                    href={crumb.path}
                                    className="font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                                    itemProp="item"
                                >
                                    <span itemProp="name">{crumb.name}</span>
                                </Link>
                            )}
                            <meta itemProp="position" content={(index + 1).toString()} />
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}

export default Breadcrumbs
