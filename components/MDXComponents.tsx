import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import ArticleImage from './ArticleImage'
import { Note, Tip, Important, Warning, Caution } from './Admonitions'
import dynamic from 'next/dynamic'

const BlogNewsletterForm = dynamic(() => import('pliny/ui/BlogNewsletterForm'))

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  BlogNewsletterForm,
  ArticleImage,
  Note,
  Tip,
  Important,
  Warning,
  Caution,
  table: ({ children }) => (
    <div className="w-full overflow-x-auto">
      <table>{children}</table>
    </div>
  ),
}
