import Image from './Image'
import Link from './Link'

const Card = ({ title, description, imgSrc, href }) => (
  <div className="md max-w-[544px] p-4 md:w-1/2 flex">
    <div
      className={`relative group flex flex-col overflow-hidden rounded-2xl bg-white/50 dark:bg-gray-800/40 backdrop-blur-md border border-gray-200 dark:border-gray-700/50 shadow-sm transition-all duration-300 hover:shadow-2xl hover:ring-2 hover:ring-primary-500/20 hover:-translate-y-1`}
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`} className="block overflow-hidden aspect-[16/9] relative bg-gray-900">
            <Image
              alt={title}
              src={imgSrc}
              fill
              className="transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        ) : (
          <div className="block overflow-hidden aspect-[16/9] relative bg-gray-900">
            <Image
              alt={title}
              src={imgSrc}
              fill
            />
          </div>
        ))}
      <div className="p-6 flex flex-col h-full">
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100 group-hover:text-primary-500 transition-colors">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose mb-6 max-w-none text-gray-600 dark:text-gray-400 font-medium leading-relaxed flex-1">
          {description}
        </p>
        {href && (
          <Link
            href={href}
            className="inline-flex items-center text-base font-bold text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all group/link"
            aria-label={`Link to ${title}`}
          >
            Explore Project <span className="ml-2 transition-transform group-hover/link:translate-x-1">&rarr;</span>
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card
