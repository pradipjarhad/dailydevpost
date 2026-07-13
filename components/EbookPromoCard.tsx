'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from './Link'

export default function EbookPromoCard() {
  const [isIndia, setIsIndia] = useState<boolean | null>(null)
  const [geoLoading, setGeoLoading] = useState(true)

  useEffect(() => {
    setGeoLoading(true)

    // Timezone check for India
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      if (tz && (tz.includes('Kolkata') || tz.includes('Calcutta') || tz.includes('Bombay') || tz.includes('Madras'))) {
        setIsIndia(true)
        setGeoLoading(false)
        return
      }
    } catch (e) {
      console.error('Timezone check failed', e)
    }

    // IP Geolocation fallback
    fetch('https://ipapi.co/json/')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then((data) => {
        setIsIndia(data.country_code === 'IN')
      })
      .catch((err) => {
        console.error('Geolocation check failed, falling back to global pricing', err)
        setIsIndia(false)
      })
      .finally(() => {
        setGeoLoading(false)
      })
  }, [])

  return (
    <div className="relative group w-full bg-gradient-to-br from-white to-slate-50 dark:from-slate-900/90 dark:to-slate-950/90 p-6 sm:p-7 rounded-[2rem] border border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_30px_60px_-15px_rgba(14,165,233,0.25)] dark:hover:shadow-[0_30px_60px_-15px_rgba(14,165,233,0.2)] flex flex-col justify-between space-y-6">
      
      {/* Premium ambient light glows */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-gradient-to-tr from-sky-400/20 to-indigo-500/25 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-44 h-44 bg-gradient-to-tr from-indigo-500/10 to-purple-500/15 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row gap-6 items-center">
        {/* eBook Poster Container with custom hover shadow effect */}
        <div className="w-32 sm:w-36 flex-shrink-0 relative overflow-hidden rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.15)] border border-slate-200/50 dark:border-black/30 transition-all duration-500 group-hover:scale-[1.04] group-hover:-rotate-1 group-hover:shadow-[0_20px_40px_rgba(14,165,233,0.3)]">
          <Image
            src="/static/images/ebook/the-future-proof-frontend-dev/front-page-cover.png"
            alt="The Future-Proof Frontend Developer eBook Cover"
            width={200}
            height={267}
            className="w-full h-auto"
            priority
          />
          {/* Subtle glossy overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
        </div>

        {/* Product Meta */}
        <div className="flex-1 text-center sm:text-left space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-200/30 dark:border-sky-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
            <span>Featured Guide</span>
          </div>
          
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-primary-500 transition-colors">
            The Future-Proof Frontend Developer
          </h3>
          
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            Build the skills AI can't replace: engineering principles, structured problem-solving, and career positioning.
          </p>
          
          {/* Star ratings */}
          <div className="flex items-center justify-center sm:justify-start space-x-1 pt-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg key={s} className="w-3.5 h-3.5 text-amber-400 fill-current filter drop-shadow-sm" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 ml-1.5">5.0 (120+ reviews)</span>
          </div>
        </div>
      </div>

      {/* Pricing and Action Bottom Card */}
      <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <span className="block text-[9px] text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-widest">
            Format: PDF
          </span>
          <div className="h-6 flex items-center justify-center sm:justify-start">
            {geoLoading ? (
              <div className="flex items-center space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            ) : (
              <span className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-baseline">
                {isIndia ? '₹299' : '$9.99'}
                <span className="ml-1.5 text-xs text-slate-400 font-semibold line-through">
                  {isIndia ? '₹599' : '$19.99'}
                </span>
              </span>
            )}
          </div>
        </div>

        <Link
          href="/ebook"
          className="w-full sm:w-auto inline-flex justify-center items-center rounded-2xl bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 px-6 py-3 text-xs sm:text-sm font-extrabold text-white shadow-lg hover:shadow-primary-500/20 dark:hover:shadow-primary-500/10 transition-all duration-300 transform active:scale-[0.98] border border-primary-500/20"
        >
          Get Instant Access &rarr;
        </Link>
      </div>
    </div>
  )
}
