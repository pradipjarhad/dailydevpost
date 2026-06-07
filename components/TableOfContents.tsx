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

        const handleScroll = () => {
            if (isManualScroll.current) return

            let currentActiveId = ''
            const headerOffset = 120 // Header height (~80px) + safety margin

            for (let i = 0; i < filteredToc.length; i++) {
                const item = filteredToc[i]
                const id = item.url.replace('#', '')
                const element = document.getElementById(id)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    if (rect.top <= headerOffset) {
                        currentActiveId = id
                    } else {
                        break
                    }
                }
            }

            // Special case: if at the bottom of the page, highlight the last item
            const isAtBottom = window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 50
            if (isAtBottom && filteredToc.length > 0) {
                const lastId = filteredToc[filteredToc.length - 1].url.replace('#', '')
                setActiveId(lastId)
                return
            }

            if (currentActiveId) {
                setActiveId(currentActiveId)
            } else {
                if (window.scrollY < 100) {
                    setActiveId('')
                } else if (filteredToc.length > 0) {
                    setActiveId(filteredToc[0].url.replace('#', ''))
                }
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        
        // Initial setup and fallback interval
        const timer = setTimeout(handleScroll, 200)
        const interval = setInterval(handleScroll, 1000)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            clearTimeout(timer)
            clearInterval(interval)
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
                <div className={`transition-all duration-300 ease-in-out ${isMobileOpen ? 'max-h-[70vh] opacity-100 mt-2 overflow-y-auto overscroll-y-auto custom-scrollbar' : 'max-h-0 opacity-0 overflow-hidden'}`}>
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
                <div className="flex items-center gap-2 mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-800 pb-2">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    Table of Contents
                </div>
                <nav className="max-h-[calc(100vh-12rem)] overflow-y-auto pr-4 custom-scrollbar">
                    <ul className="list-none space-y-4">
                        {filteredToc.map((item) => {
                            const id = item.url.replace('#', '')
                            const isActive = activeId === id
                            return (
                                <li key={item.url} className={`${item.depth === 3 ? 'ml-5' : ''}`}>
                                    <a
                                        href={item.url}
                                        onClick={(e) => handleClick(e, item.url)}
                                        className={`group flex items-center gap-3 text-[13px] leading-tight transition-all duration-300
                                        ${isActive
                                                ? 'text-primary-500 font-bold'
                                                : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                                            }
                                    `}
                                        aria-current={isActive ? 'location' : undefined}
                                    >
                                        <span className={`h-1.5 rounded-full transition-all duration-300 
                                            ${isActive 
                                                ? 'w-4 bg-primary-500' 
                                                : 'w-1.5 bg-gray-200 dark:bg-gray-700 group-hover:w-3 group-hover:bg-gray-400 dark:group-hover:bg-gray-500'
                                            }`} 
                                        />
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
