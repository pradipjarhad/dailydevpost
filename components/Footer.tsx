import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center pb-8">
        <div className="mb-3 flex flex-wrap justify-center gap-4">
          {siteMetadata.github && <SocialIcon kind="github" href={siteMetadata.github} size={6} />}
          {siteMetadata.facebook && <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />}
          {siteMetadata.youtube && <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />}
          {siteMetadata.linkedin && <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />}
          {siteMetadata.twitter && <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />}
          {siteMetadata.instagram && <SocialIcon kind="instagram" href={siteMetadata.instagram} size={6} />}
          {siteMetadata.goodReads && <SocialIcon kind="goodReads" href={siteMetadata.goodReads} size={6} />}
          {siteMetadata.stackOverflow && <SocialIcon kind="stackOverflow" href={siteMetadata.stackOverflow} size={6} />}
          {siteMetadata.stackExchange && <SocialIcon kind="stackExchange" href={siteMetadata.stackExchange} size={6} />}
          {siteMetadata.kofi && <SocialIcon kind="kofi" href={siteMetadata.kofi} size={6} />}
        </div>
        <div className="mb-3 flex flex-wrap justify-center gap-4">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-and-conditions">Terms and Conditions</Link>
        </div>
        <div className="mb-8 flex flex-wrap justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{`© 2025-${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
          <div>{` • `}</div>
          <Link href="/feed.xml">RSS</Link>
          <div>{` • `}</div>
          <Link href="/sitemap.xml">Sitemap</Link>
        </div>
      </div>
    </footer>
  )
}
