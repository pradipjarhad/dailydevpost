'use client'

import Link from '@/components/Link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const excuses = [
  "It worked on my local machine.",
  "A merge conflict deleted this route.",
  "This page is currently being containerized.",
  "The DNS is still propagating (allegedly).",
  "It's not a bug, it's a feature that hasn't shipped yet.",
]

export default function NotFound() {
  const [randomExcuse, setRandomExcuse] = useState<string>("")

  useEffect(() => {
    setRandomExcuse(excuses[Math.floor(Math.random() * excuses.length)])
  }, [])

  return (
    <div className="relative flex min-h-[75vh] flex-col items-center justify-center overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 text-center dark:border-gray-800/50 dark:bg-gray-900 md:p-12 lg:p-16 shadow-2xl shadow-primary-500/5">
      {/* Background Pattern */}
      <div
        className="grid-background absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        aria-hidden="true"
      />

      {/* Decorative Gradient Glows */}
      <div
        className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary-500/10 blur-[100px] dark:bg-primary-500/5"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-blue-500/10 blur-[100px] dark:bg-blue-500/5"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center max-w-2xl px-4">
        <div className="mb-8 flex flex-col items-center">
          <div className="relative mb-8 h-56 w-56 animate-float drop-shadow-[0_20px_50px_rgba(var(--primary-500),0.3)]">
            <Image
              src="/static/images/404-illustration.png"
              alt="404 Module Not Found"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="rounded-full border border-primary-500/20 bg-primary-50/50 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-primary-600 dark:bg-primary-900/20 dark:text-primary-400 backdrop-blur-sm">
            [ FATAL: MODULE_NOT_FOUND ]
          </div>
        </div>

        <h1 className="mb-2 bg-gradient-to-br from-gray-900 via-primary-600 to-blue-600 bg-clip-text text-8xl font-black leading-tight tracking-tighter text-transparent dark:from-white dark:via-primary-400 dark:to-blue-400 md:text-9xl">
          404
        </h1>

        <h2 className="mb-6 text-2xl font-black tracking-tight text-gray-900 dark:text-gray-100 md:text-3xl">
          Path Resolution Failed.
        </h2>

        <div className="mb-12 flex flex-col items-center space-y-6">
          <p className="text-lg leading-relaxed text-gray-500 dark:text-gray-400 font-medium">
            The requested technical documentation is currently being refactored or has been deprecated from the production cluster.
          </p>
          <div className="flex flex-col items-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/50 w-full">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-2">
              System Logs
            </p>
            <p className="text-sm font-mono text-primary-600 dark:text-primary-400">
              $ get_excuse --type="dev"
            </p>
            <p className="text-base font-mono text-gray-600 dark:text-gray-300 italic mt-3">
              "{randomExcuse || 'Initializing fault detection...'}"
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row w-full justify-center">
          <Link
            href="/"
            className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-xl bg-gray-900 px-10 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-primary-600 dark:bg-white dark:text-gray-900 dark:hover:bg-primary-400"
          >
            <span className="relative z-10 flex items-center gap-2">
               git checkout main
            </span>
          </Link>
          <Link
            href="/blog"
            className="inline-flex h-14 items-center justify-center rounded-xl border-2 border-gray-100 bg-white px-10 text-sm font-black uppercase tracking-widest text-gray-600 transition-all hover:border-primary-500 hover:text-primary-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-primary-400 dark:hover:text-primary-400"
          >
            cd ../blog
          </Link>
        </div>

        <div className="mt-16 rounded-2xl border border-gray-100 bg-gray-50/30 p-6 text-center dark:border-gray-800/30 dark:bg-gray-900/30 backdrop-blur-sm">
          <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 font-medium">
            <span className="font-black text-gray-900 dark:text-gray-100 uppercase tracking-wider mr-2">Archive:</span> Looking for the legacy Polish blog? It's been safely deployed to{' '}
            <a
              href="https://dailydevpost.com/"
              target="_blank"
              className="text-primary-600 font-bold underline decoration-primary-600/30 underline-offset-4 transition-all hover:text-primary-700 hover:decoration-primary-600 dark:text-primary-400 dark:decoration-primary-400/30 dark:hover:text-primary-300 dark:hover:decoration-primary-400"
            >
              dailydevpost.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
