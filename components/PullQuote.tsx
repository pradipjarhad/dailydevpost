'use client'

import React from 'react'

interface PullQuoteProps {
  quote: string
  author?: string
}

export default function PullQuote({ quote, author }: PullQuoteProps) {
  const tweetText = encodeURIComponent(`"${quote}"${author ? ` — ${author}` : ''}`);
  const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

  return (
    <div className="relative my-10 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 border-l-4 border-indigo-600 dark:border-indigo-400 p-8 not-prose group transition-all duration-300 hover:shadow-xl">
      {/* Decorative quote mark */}
      <div className="absolute right-4 top-2 text-indigo-200/40 dark:text-indigo-800/10 pointer-events-none transform translate-y-[-10px] group-hover:translate-y-0 transition-transform duration-500">
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-24 h-24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex-1">
          <p className="text-xl md:text-2xl font-semibold leading-relaxed text-gray-800 dark:text-gray-200 italic">
            "{quote}"
          </p>
          {author && (
            <p className="mt-3 text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              — {author}
            </p>
          )}
        </div>
        
        <div className="flex items-center shrink-0">
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>Share Quote</span>
          </a>
        </div>
      </div>
    </div>
  )
}
