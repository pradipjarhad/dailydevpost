import React from 'react'

interface ArticleImageProps {
  src: string
  alt?: string
  className?: string
}

const ArticleImage = (props: ArticleImageProps) => {
  let className = props.className

  if (!props.className) {
    className = 'article-image'
  }

  let alt = props.alt

  if (!props.alt) {
    const parts = props.src.split('/')
    const filename = parts[parts.length - 1]
    alt = filename.split('.')[0].replace(/-/g, ' ')
  }

  return (
    <figure className={'article-fig'}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={props.src}
        alt={alt}
        className={className + ' article-fig'}
        style={{ height: 'auto' }}
      />
      <figcaption className={'article-fig'}>Image: {alt}</figcaption>
    </figure>
  )
}

export default ArticleImage
