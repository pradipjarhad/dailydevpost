'use client'

import { useState } from 'react'
import SocialIcon from '@/components/social-icons'

type Props = {
  title: string
  url: string
}

export default function SocialShare({ title, url }: Props) {
  const [copied, setCopied] = useState(false)

  const twitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
  const linkedin = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  const mastodon = `https://mastodon.social/share?text=${encodeURIComponent(title + '\n' + url)}`
  const mail = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`

  const whatsapp = `https://wa.me/?text=${encodeURIComponent(title + '\n' + url)}`
  const reddit = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
  const pinterest = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`

  const copyLink = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const iconClass =
    'h-6 w-6 text-gray-700 transition hover:text-primary-500 dark:text-gray-200'

  return (
    <div className="mt-4 flex flex-col items-center">
      <div className="mb-2 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Share
      </div>

      <div className="flex flex-wrap items-center gap-3">

        {/* Existing supported icons */}
        <SocialIcon kind="twitter" href={twitter} size={6} />
        <SocialIcon kind="linkedin" href={linkedin} size={6} />
        <SocialIcon kind="facebook" href={facebook} size={6} />

        {/* WhatsApp */}
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">
          <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor">
            <path d="M20.52 3.48A11.9 11.9 0 0 0 12.04 0C5.41 0 0 5.4 0 12.04c0 2.12.55 4.19 1.6 6.01L0 24l6.1-1.6a11.96 11.96 0 0 0 5.94 1.55h.01c6.64 0 12.04-5.4 12.04-12.04 0-3.22-1.25-6.25-3.56-8.43ZM12.04 21.8a9.8 9.8 0 0 1-4.99-1.36l-.36-.21-3.62.95.97-3.53-.24-.36a9.8 9.8 0 1 1 8.24 4.51Zm5.37-7.36c-.29-.14-1.71-.84-1.98-.93-.26-.1-.46-.14-.65.14-.19.29-.75.93-.92 1.12-.17.19-.34.21-.63.07-.29-.14-1.22-.45-2.33-1.43-.86-.77-1.44-1.72-1.6-2-.17-.29-.02-.44.12-.58.14-.14.29-.34.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.65-1.55-.89-2.12-.23-.56-.46-.48-.65-.49h-.55c-.19 0-.5.07-.77.36-.26.29-1.02.98-1.02 2.38s1.04 2.75 1.19 2.94c.14.19 2.01 3.06 4.88 4.29.68.29 1.21.47 1.62.6.69.22 1.31.19 1.8.12.55-.08 1.71-.7 1.96-1.33.24-.63.24-1.19.17-1.33-.07-.14-.26-.22-.55-.36Z" />
          </svg>
        </a>

        {/* Reddit */}
        <a href={reddit} target="_blank" rel="noopener noreferrer" aria-label="Share on Reddit">
          <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor">
            <path d="M14.5 3.5a1 1 0 0 0-.98.8l-.7 3.42c-1.58.07-3.05.55-4.23 1.3l-2.9-1.5a1 1 0 1 0-.92 1.78l2.68 1.38a5.5 5.5 0 0 0-.45 2.2c0 3.04 3.13 5.5 7 5.5s7-2.46 7-5.5c0-3-3.06-5.44-6.86-5.5l.63-3.06a1 1 0 0 0-.77-1.18ZM9.5 13a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm5 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm-5.1 2.9a.5.5 0 0 1 .7-.7c.5.5 1.2.8 1.9.8s1.4-.3 1.9-.8a.5.5 0 1 1 .7.7c-.7.7-1.7 1.1-2.6 1.1s-1.9-.4-2.6-1.1Z" />
          </svg>
        </a>

        {/* Pinterest */}
        <a href={pinterest} target="_blank" rel="noopener noreferrer" aria-label="Share on Pinterest">
          <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 4.99 3.16 9.24 7.58 10.94-.1-.93-.19-2.36.04-3.38.21-.93 1.37-5.9 1.37-5.9s-.35-.71-.35-1.76c0-1.65.96-2.88 2.15-2.88 1.01 0 1.5.76 1.5 1.67 0 1.02-.65 2.54-.99 3.95-.28 1.18.59 2.15 1.75 2.15 2.1 0 3.72-2.22 3.72-5.43 0-2.83-2.04-4.81-4.95-4.81-3.38 0-5.36 2.54-5.36 5.16 0 1.02.39 2.11.88 2.71.1.12.11.23.08.35-.09.38-.29 1.18-.33 1.34-.04.18-.15.23-.35.14-1.32-.61-2.15-2.52-2.15-4.06 0-3.31 2.4-6.35 6.93-6.35 3.64 0 6.48 2.59 6.48 6.05 0 3.61-2.28 6.52-5.44 6.52-1.06 0-2.06-.55-2.4-1.2l-.65 2.46c-.24.93-.88 2.1-1.31 2.81.99.31 2.04.48 3.14.48 6.63 0 12-5.37 12-12S18.63 0 12 0z" />
          </svg>
        </a>

        {/* Mastodon + Mail (existing) */}
        <SocialIcon kind="mastodon" href={mastodon} size={6} />

        {/* Mail */}
        <a href={mail} aria-label="Share via Email">
          <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor">
            <path d="M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5Zm2 .5V6l8 5 8-5v-.5H4Zm16 2.6-8 5-8-5V19h16V8.1Z" />
          </svg>
        </a>

        {/* Copy */}
        <button onClick={copyLink} aria-label="Copy link">
          <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor">
            <path d="M3.9 12.5c0-1.1.9-2 2-2h3v-2h-3c-2.8 0-5 2.2-5 5v4h2v-5zm16-8.5h-8c-1.1 0-2 .9-2 2v2h2V6h8v12h-8v-2h-2v2c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" />
          </svg>
        </button>
      </div>

      {copied && <div className="mt-2 text-xs text-primary-500">Copied!</div>}
    </div>
  )
}
