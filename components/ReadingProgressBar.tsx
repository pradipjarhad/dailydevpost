'use client'

import { useEffect, useState } from 'react'

const ReadingProgressBar = () => {
    const [completion, setCompletion] = useState(0)

    useEffect(() => {
        const updateScrollCompletion = () => {
            const currentProgress = window.scrollY
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
            if (scrollHeight) {
                setCompletion(Number((currentProgress / scrollHeight).toFixed(3)) * 100)
            }
        }

        window.addEventListener('scroll', updateScrollCompletion)

        return () => {
            window.removeEventListener('scroll', updateScrollCompletion)
        }
    }, [])

    return (
        <div className="fixed top-0 left-0 z-[100] h-1 w-full bg-transparent">
            <div
                className="h-full bg-gradient-to-r from-primary-500 via-blue-500 to-primary-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-150 ease-out"
                style={{ width: `${completion}%` }}
            />
        </div>
    )
}

export default ReadingProgressBar
