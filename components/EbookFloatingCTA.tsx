'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from './Link'

export default function EbookFloatingCTA() {
  const [hasReachedThreshold, setHasReachedThreshold] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isIndia, setIsIndia] = useState<boolean | null>(null)
  const [geoLoading, setGeoLoading] = useState(true)
  const [hasVisitedLanding, setHasVisitedLanding] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Check if the user has visited the ebook landing page before
  useEffect(() => {
    try {
      const visited = localStorage.getItem('has_visited_ebook_landing')
      if (visited === 'true') {
        setHasVisitedLanding(true)
      }
    } catch (e) {
      console.error('Failed to read localStorage', e)
    }
  }, [])

  // Geolocation timezone-based pricing detection
  useEffect(() => {
    setGeoLoading(true)
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

  // Scroll detection logic (Triggers past 30% of scrollable page depth)
  useEffect(() => {
    if (isDismissed) return

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight
      const scrollable = docHeight - winHeight

      if (scrollable > 0 && scrollTop / scrollable >= 0.3) {
        setHasReachedThreshold(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Trigger once on mount in case they are already scrolled

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isDismissed])

  // Triggers smooth entrance animation once threshold is met
  useEffect(() => {
    if (hasReachedThreshold && !isDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [hasReachedThreshold, isDismissed])

  // Keyboard accessibility: Escape key dismisses CTA
  useEffect(() => {
    if (!isVisible) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isVisible])

  // Dispatch visibility event to push up ScrollTopAndComment buttons on mobile
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('ebook-cta-visible', { detail: isVisible }))
    return () => {
      window.dispatchEvent(new CustomEvent('ebook-cta-visible', { detail: false }))
    }
  }, [isVisible])

  const handleClose = () => {
    setIsVisible(false)
    // Wait for the slide-out animation to complete (350ms) before fully unmounting/ignoring
    setTimeout(() => {
      setIsDismissed(true)
    }, 350)
  }

  // Prevent rendering if dismissed or scroll threshold has not been reached yet
  if (isDismissed || (!hasReachedThreshold && !isVisible)) return null

  const getButtonProps = () => {
    if (hasVisitedLanding) {
      const href = isIndia
        ? 'https://dailydevpost.myinstamojo.com/product/the-future-proof-frontend-developer'
        : 'https://dailydevpost.gumroad.com/l/the-future-proof-frontend-developer?wanted=true'
      const text = geoLoading
        ? 'Buy Now'
        : isIndia
          ? 'Get the Ebook'
          : 'Get the Ebook'
      return { href, target: '_blank', text }
    } else {
      return { href: '/ebook', target: '_self', text: 'Explore eBook \u2192' }
    }
  }

  const buttonProps = getButtonProps()

  return (
    <div
      role="complementary"
      aria-label="eBook Recommendation"
      className={`fixed z-40 bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-auto md:w-[360px] rounded-2xl border border-slate-200/80 bg-white/95 p-3.5 shadow-2xl backdrop-blur-md dark:border-slate-800/90 dark:bg-slate-950/95 transition-all ease-out duration-[350ms] motion-safe:transition-all motion-safe:duration-[350ms] motion-reduce:transition-none ${isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
    >
      {/* Dimmed gradient light glows */}
      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-28 h-28 bg-gradient-to-tr from-sky-400/10 to-indigo-500/15 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-24 h-24 bg-gradient-to-tr from-indigo-500/5 to-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>

      {/* Dismiss Button */}
      <button
        ref={closeButtonRef}
        onClick={handleClose}
        aria-label="Dismiss eBook Recommendation"
        className="absolute top-2.5 right-2.5 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 z-10"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Product Content Details in Horizontal layout */}
      <div className="flex items-center space-x-3.5 relative">
        {/* eBook Poster Container with custom hover shadow effect */}
        <div className="w-[60px] h-[80px] md:w-[68px] md:h-[90px] flex-shrink-0 relative overflow-hidden rounded-md shadow-md border border-slate-200/30 dark:border-black/20 transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-[0_8px_16px_rgba(14,165,233,0.2)]">
          <Image
            src="/static/images/ebook/the-future-proof-frontend-dev/front-page-cover.png"
            alt="The Future-Proof Frontend Developer eBook Cover"
            fill
            sizes="(max-width: 768px) 60px, 68px"
            className="object-cover"
            priority
          />
          {/* Subtle glossy overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
        </div>

        {/* Text information column */}
        <div className="flex-1 min-w-0 pr-6">
          <div className="space-y-0.5">
            <h3 className="text-xs md:text-sm font-extrabold text-slate-950 dark:text-white leading-tight truncate">
              The Future-Proof Frontend Developer
            </h3>
            <p className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 leading-none truncate">
              Build the Skills AI Can't Replace
            </p>
          </div>

          {/* Pricing & CTA Button row */}
          <div className="mt-2.5 flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-[8px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-0.5">
                PDF Ebook
              </span>
              <div className="h-4 flex items-baseline">
                {geoLoading ? (
                  <span className="text-[9px] text-slate-400 animate-pulse">Loading...</span>
                ) : (
                  <span className="text-xs font-black text-slate-800 dark:text-slate-200">
                    {isIndia ? '₹299' : '$9.99'}
                    <span className="ml-1 text-[9px] text-slate-400 line-through font-normal">
                      {isIndia ? '₹599' : '$19.99'}
                    </span>
                  </span>
                )}
              </div>
            </div>

            <Link
              href={buttonProps.href}
              target={buttonProps.target}
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 px-3 py-1.5 text-[10px] md:text-xs font-extrabold text-white shadow-sm hover:shadow-primary-500/10 transition-all duration-300 transform active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {buttonProps.text}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
