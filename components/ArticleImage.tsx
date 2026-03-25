import Image from 'next/image'

interface ArticleImageProps {
  src: string
  alt?: string
  className?: string
}

const ArticleImage = (props: ArticleImageProps) => {
  const className = props.className || 'article-image'
  let alt = props.alt

  if (!props.alt) {
    const parts = props.src.split('/')
    const filename = parts[parts.length - 1]
    alt = filename.split('.')[0].replace(/-/g, ' ')
  }

  return (
    <figure className="article-fig not-prose my-8">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <Image
          src={props.src}
          alt={alt as string}
          className={`${className}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 100vw"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 italic">
        Image: {alt}
      </figcaption>
    </figure>
  )
}

export default ArticleImage
