'use client'

import Link from '@/components/Link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function NotFound() {
  const excuses = [
    "It worked on my local machine.",
    "A merge conflict deleted this route.",
    "This page is currently being containerized.",
    "The DNS is still propagating (allegedly).",
    "It's not a bug, it's a feature that hasn't shipped yet.",
  ]

  const [randomExcuse, setRandomExcuse] = useState<string>("")

  useEffect(() => {
    setRandomExcuse(excuses[Math.floor(Math.random() * excuses.length)])
  }, [])

  return (
    <div className="relative flex min-h-[75vh] flex-col items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-950 md:p-12 lg:p-16">
      {/* Background Pattern */}
      <div
        className="grid-background absolute inset-0 opacity-[0.03] dark:opacity-[0.07]"
        aria-hidden="true"
      />

      {/* Decorative Gradient Glow */}
      <div
        className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary-500/10 blur-3xl dark:bg-primary-500/20"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center max-w-2xl">
        <div className="mb-8 flex flex-col items-center">
          <div className="relative mb-6 h-48 w-48 animate-pulse-slow">
            <Image
              src="/static/images/404-illustration.png"
              alt="Funny 404 Illustration"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
          <div className="rounded-full border border-primary-500/30 bg-primary-50/50 px-3 py-1 text-xs font-mono font-medium tracking-wider text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
            [ ROUTING_ERROR: MODULE_NOT_FOUND ]
          </div>
        </div>

        <h1 className="mb-2 bg-gradient-to-br from-primary-600 to-primary-400 bg-clip-text text-7xl font-black leading-tight tracking-tighter text-transparent dark:from-primary-400 dark:to-primary-200 md:text-8xl">
          404
        </h1>

        <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-3xl">
          The requested module failed to import.
        </h2>

        <div className="mb-10 flex flex-col items-center space-y-4 min-h-[100px]">
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            The resource you're looking for is either undergoing a major refactor or has been deprecated from our production build.
          </p>
          <div className="flex flex-col items-center">
            <p className="text-sm font-mono text-primary-600 dark:text-primary-400">
              $ system-status --last-error
            </p>
            <p className="text-sm font-mono text-gray-500 dark:text-gray-500 italic mt-1">
              "{randomExcuse}"
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-primary-600 px-8 text-sm font-mono font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-700 hover:shadow-primary-600/30 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-400 dark:focus:ring-offset-gray-900"
          >
            git checkout main
          </Link>
          <Link
            href="/blog"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-gray-200 bg-white px-8 text-sm font-mono font-semibold text-gray-900 transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800 dark:focus:ring-gray-700"
          >
            cd ../blog
          </Link>
        </div>

        <div className="mt-12 rounded-lg border border-gray-100 bg-gray-50/50 p-4 text-left dark:border-gray-800/50 dark:bg-gray-900/50">
          <p className="text-sm italic text-gray-500 dark:text-gray-400">
            <span className="font-bold not-italic text-gray-700 dark:text-gray-300">Legacy Terminal:</span> If you're looking for the old Polish blog, it's been safely containerized and moved to live at{' '}
            <a
              href="https://dailydevpost.com/"
              target="_blank"
              className="text-primary-600 underline decoration-primary-600/30 underline-offset-4 transition-all hover:text-primary-700 hover:decoration-primary-600 dark:text-primary-400 dark:decoration-primary-400/30 dark:hover:text-primary-300 dark:hover:decoration-primary-400"
            >
              dailydevpost.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  )
}
