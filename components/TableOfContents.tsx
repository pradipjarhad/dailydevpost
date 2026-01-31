'use client'

import { useEffect, useState, useRef } from 'react'

export interface TocItem {
    value: string
    url: string
    depth: number
}

interface TableOfContentsProps {
    toc: TocItem[]
}

const TableOfContents = ({ toc }: TableOfContentsProps) => {
    const [activeId, setActiveId] = useState<string>('')
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    // Ref to track if the click was manual to avoid observer flickering
    const isManualScroll = useRef(false)

    // Filter for h2 and h3, and ensure we have enough items
    const filteredToc = toc?.filter((item) => item.depth === 2 || item.depth === 3)

    useEffect(() => {
        if (!filteredToc || filteredToc.length < 2) return

        const observerOption: IntersectionObserverInit = {
            rootMargin: '0px 0px -80% 0px',
            threshold: 0.1, // Trigger when 10% of the element is visible in the top area
        }

        const observer = new IntersectionObserver((entries) => {
            if (isManualScroll.current) return

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id)
                }
            })
        }, observerOption)

        filteredToc.forEach((item) => {
            const id = item.url.replace('#', '')
            const element = document.getElementById(id)
            if (element) {
                observer.observe(element)
            }
        })

        return () => {
            observer.disconnect()
        }
    }, [filteredToc])

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
        e.preventDefault()
        const id = url.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
            isManualScroll.current = true
            setActiveId(id)

            // Offset for fixed header if exists, usually around 80px
            // Assuming implicit smooth scroll via CSS or standard scrollIntoView
            const headerOffset = 80
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            })

            setTimeout(() => {
                isManualScroll.current = false
            }, 1000)
        }
    }

    if (!filteredToc || filteredToc.length < 2) return null

    return (
        <div className="xl:sticky xl:top-8">
            {/* Mobile Toggle */}
            <div className="xl:hidden mb-6">
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="flex items-center justify-between w-full p-4 text-left text-sm font-semibold text-gray-900 bg-gray-50 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                    aria-expanded={isMobileOpen}
                >
                    <span>Table of Contents</span>
                    <span className={`transform transition-transform duration-200 ${isMobileOpen ? 'rotate-180' : ''}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </button>

                {/* Mobile Collapsible Content */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    <nav className="p-4 bg-gray-50 border border-t-0 border-gray-200 rounded-b-lg dark:bg-gray-800 dark:border-gray-700">
                        <ul className="list-none space-y-2">
                            {filteredToc.map((item) => {
                                const isActive = activeId === item.url.replace('#', '')
                                return (
                                    <li key={item.url} className={`${item.depth === 3 ? 'ml-4' : ''}`}>
                                        <a
                                            href={item.url}
                                            onClick={(e) => handleClick(e, item.url)}
                                            className={`block text-sm transition-colors duration-200 
                                        ${isActive
                                                    ? 'text-primary-600 font-medium dark:text-primary-400'
                                                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                                                }
                                    `}
                                        >
                                            {item.value}
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden xl:block">
                <h3 className="mb-4 text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Table of Contents
                </h3>
                <nav className="max-h-[calc(100vh-10rem)] overflow-y-auto pr-2 custom-scrollbar">
                    <ul className="list-none space-y-2.5">
                        {filteredToc.map((item) => {
                            const id = item.url.replace('#', '')
                            const isActive = activeId === id
                            return (
                                <li key={item.url} className={`${item.depth === 3 ? 'ml-4' : ''}`}>
                                    <a
                                        href={item.url}
                                        onClick={(e) => handleClick(e, item.url)}
                                        className={`block text-sm leading-snug transition-colors duration-200 border-l-2 pl-3 -ml-[2px]
                                        ${isActive
                                                ? 'border-primary-500 text-primary-600 font-medium dark:border-primary-400 dark:text-primary-400'
                                                : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'
                                            }
                                    `}
                                        aria-current={isActive ? 'location' : undefined}
                                    >
                                        {item.value}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>

            <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar {
                width: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
                background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background-color: rgba(156, 163, 175, 0.3);
                border-radius: 20px;
            }
            .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                background-color: rgba(156, 163, 175, 0.5);
            }
        `}</style>
        </div>
    )
}

export default TableOfContents
