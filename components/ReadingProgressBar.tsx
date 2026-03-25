'use client'

import { useEffect, useState } from 'react'

const ReadingProgressBar = () => {
  const [completion, setCompletion] = useState(0)

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight) {
        setCompletion(+(currentProgress / scrollHeight).toFixed(2) * 100)
      }
    }

    window.addEventListener('scroll', updateScrollCompletion, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateScrollCompletion)
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-1 w-full bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-primary-500 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(14,165,233,0.5)]"
        style={{ width: `${completion}%` }}
      />
    </div>
  )
}

export default ReadingProgressBar
