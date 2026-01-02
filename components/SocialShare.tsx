'use client'

import { useState } from 'react'
import SocialIcon from '@/components/social-icons'

type Props = {
  title: string
  url: string
}

export default function SocialShare({ title, url }: Props) {
  const [copied, setCopied] = useState(false)

  const twitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(
    url,
  )}`
  const linkedin = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
    url,
  )}&title=${encodeURIComponent(title)}`
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  const mastodon = `https://mastodon.social/share?text=${encodeURIComponent(title + '\n' + url)}`
  const mail = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      // ignore
    }
  }

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">Share</div>
      <div className="flex items-center space-x-3">
        <SocialIcon kind="twitter" href={twitter} size={6} />
        <SocialIcon kind="linkedin" href={linkedin} size={6} />
        <SocialIcon kind="facebook" href={facebook} size={6} />
        <SocialIcon kind="mastodon" href={mastodon} size={6} />
        <SocialIcon kind="mail" href={mail} size={6} />
        <button
          type="button"
          onClick={copyLink}
          className="text-sm text-gray-500 transition hover:text-gray-600"
          aria-label="Copy link"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 fill-current text-gray-700 dark:text-gray-200"
          >
            <path d="M3.9 12.5c0-1.1.9-2 2-2h3v-2h-3c-2.8 0-5 2.2-5 5v4h2v-5zm16-8.5h-8c-1.1 0-2 .9-2 2v2h2V6h8v12h-8v-2h-2v2c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" />
          </svg>
        </button>
      </div>
      {copied && <div className="text-xs text-primary-500 mt-2">Copied!</div>}
    </div>
  )
}
