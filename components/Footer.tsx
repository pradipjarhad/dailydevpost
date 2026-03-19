import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer className="mt-16 pb-12 border-t border-gray-100 dark:border-gray-800/50">
      <div className="flex flex-col items-center pt-10">
        <div className="flex mb-6 space-x-6">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
          <SocialIcon kind="instagram" href={siteMetadata.instagram} size={6} />
        </div>
        
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-primary-500 transition-colors">Home</Link>
          <Link href="/blog" className="hover:text-primary-500 transition-colors">Archive</Link>
          <Link href="/about" className="hover:text-primary-500 transition-colors">Expertise</Link>
          <Link href="/contact" className="hover:text-primary-500 transition-colors">Connect</Link>
        </nav>

        <div className="flex flex-col items-center space-y-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          <div className="flex space-x-2">
            <div>{`© 2025-${new Date().getFullYear()}`}</div>
            <div>{` • `}</div>
            <Link href="/" className="hover:text-primary-500 transition-colors">{siteMetadata.title}</Link>
          </div>
          <div className="flex space-x-4">
            <Link href="/privacy-policy" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors underline decoration-gray-200 dark:decoration-gray-700 underline-offset-4">Privacy</Link>
            <Link href="/terms-and-conditions" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors underline decoration-gray-200 dark:decoration-gray-700 underline-offset-4">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors underline decoration-gray-200 dark:decoration-gray-700 underline-offset-4">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
