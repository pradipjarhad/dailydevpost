import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import Image from './Image'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import logo from "../public/static/images/logo.png"

const Header = () => {
  return (
    <header className="flex items-center justify-between pt-10 pb-4 relative z-50">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center space-x-2">
            <Image
              src={logo}
              alt={`${siteMetadata.headerTitle} logo`}
              width={100}
              height={100}
              className="w-8 h-8 min-[375px]:w-12 min-[375px]:h-12 sm:w-14 sm:h-14 object-contain"
            />
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="text-base min-[375px]:text-xl sm:text-2xl xl:text-3xl leading-tight font-bold whitespace-nowrap">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>

      <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 xl:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hidden font-medium text-gray-900 dark:text-gray-100 xl:block"
            >
              {link.title}
            </Link>
          ))}
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
