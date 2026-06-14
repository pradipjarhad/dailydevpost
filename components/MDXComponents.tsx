/* eslint-disable @typescript-eslint/no-explicit-any */
import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import ArticleImage from './ArticleImage'
import { Note, Tip, Important, Warning, Caution } from './Admonitions'
import AeoAnswer from './AeoAnswer'
import dynamic from 'next/dynamic'
import React from 'react'

import PullQuote from './PullQuote'

const BlogNewsletterForm = dynamic(() => import('pliny/ui/BlogNewsletterForm'))
const DynamicMermaid = dynamic(() => import('./Mermaid'))

const CustomPre = (props: any) => {
  const isMermaid =
    (typeof props.className === 'string' && props.className.includes('language-mermaid')) ||
    (React.isValidElement(props.children) &&
     typeof props.children.props === 'object' &&
     props.children.props !== null &&
     'className' in props.children.props &&
     typeof (props.children.props as any).className === 'string' &&
     (props.children.props as any).className.includes('language-mermaid'))

  if (isMermaid) {
    const extractText = (node: any): string => {
      if (typeof node === 'string') return node
      if (Array.isArray(node)) return node.map(extractText).join('')
      if (React.isValidElement(node)) return extractText((node.props as any).children)
      return ''
    }
    const code = extractText(React.isValidElement(props.children) ? props.children.props.children : props.children)
    return <DynamicMermaid chart={code} />
  }

  return <Pre {...props} />
}

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: CustomPre,
  BlogNewsletterForm,
  ArticleImage,
  Note,
  Tip,
  Important,
  Warning,
  Caution,
  AeoAnswer,
  PullQuote,
  table: ({ children }) => (
    <div className="w-full overflow-x-auto">
      <table>{children}</table>
    </div>
  ),
}
