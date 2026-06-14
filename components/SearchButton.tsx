import siteMetadata from '@/data/siteMetadata'
import dynamic from 'next/dynamic'

const AlgoliaButton = dynamic(() => import('pliny/search/AlgoliaButton').then((mod) => mod.AlgoliaButton))
const KBarButton = dynamic(() => import('pliny/search/KBarButton').then((mod) => mod.KBarButton))

const SearchButton = () => {
  if (
    siteMetadata.search &&
    (siteMetadata.search.provider === 'algolia' || siteMetadata.search.provider === 'kbar')
  ) {
    const SearchButtonWrapper =
      siteMetadata.search.provider === 'algolia'
        ? AlgoliaButton
        : KBarButton

    return (
      <SearchButtonWrapper aria-label="Search">
        {/* Desktop Version */}
        <div className="hidden cursor-pointer items-center space-x-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 transition-colors hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700 lg:flex lg:w-64">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4 text-gray-500 dark:text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <span className="flex-1 text-left text-sm text-gray-400 dark:text-gray-500">
            Search...
          </span>
          <span className="flex items-center space-x-0.5 text-[10px] font-medium text-gray-400 dark:text-gray-500">
            <kbd className="font-sans">⌘</kbd>
            <kbd className="font-sans">K</kbd>
          </span>
        </div>
        {/* Mobile/Tablet/Laptop Icon Version */}
        <div className="flex items-center justify-center p-2 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 text-gray-900 dark:text-gray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </SearchButtonWrapper>
    )
  }
}

export default SearchButton
