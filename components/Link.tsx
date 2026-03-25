'use client'

/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { LinkProps } from 'next/link'
import { AnchorHTMLAttributes } from 'react'

const CustomLink = ({ href, ...rest }: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const router = useRouter()
  
  const isInternalLink = typeof href === 'string' && href.startsWith('/')
  const isAnchorLink = typeof href === 'string' && href.startsWith('#')

  if (isInternalLink) {
    return (
      <Link 
        href={href} 
        onMouseEnter={(e) => {
          if (typeof href === 'string') {
            router.prefetch(href)
          }
          if (rest.onMouseEnter) {
            rest.onMouseEnter(e)
          }
        }}
        {...rest} 
      />
    )
  }

  if (isAnchorLink) {
    return <a href={href as string} {...rest} />
  }

  return <a target="_blank" rel="noopener noreferrer" href={href as string} {...rest} />
}

export default CustomLink
