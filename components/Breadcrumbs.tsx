'use client'

import Link from './Link'
import { usePathname } from 'next/navigation'

const Breadcrumbs = () => {
    const pathname = usePathname()

    // Don't show breadcrumbs on the homepage
    if (pathname === '/') return null

    const pathSegments = pathname.split('/').filter((segment) => segment !== '')

    return (
        <nav aria-label="Breadcrumb" className="mb-6 flex overflow-x-auto pb-2 scrollbar-none sm:scrollbar-default">
            <ol className="flex items-center space-x-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                <li>
                    <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400">
                        Home
                    </Link>
                </li>
                {pathSegments.map((segment, index) => {
                    const href = `/${pathSegments.slice(0, index + 1).join('/')}`
                    const isLast = index === pathSegments.length - 1
                    const title = segment
                        .split('-')
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')

                    return (
                        <li key={href} className="flex items-center space-x-2">
                            <svg
                                className="h-4 w-4 flex-shrink-0 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                            >
                                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                            </svg>
                            {isLast ? (
                                <span className="font-medium text-gray-900 dark:text-gray-100" aria-current="page">
                                    {title}
                                </span>
                            ) : (
                                <Link
                                    href={href}
                                    className="hover:text-primary-600 dark:hover:text-primary-400"
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
