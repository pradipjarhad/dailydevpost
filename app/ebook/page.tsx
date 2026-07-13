import EbookClient from './EbookClient'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'

export const metadata: Metadata = genPageMetadata({
  title: 'The Future-Proof Frontend Developer eBook',
  description: "Build the skills AI can't replace. Learn the engineering mindset, structured problem-solving, clean code systems, and career positioning from senior developer Pradip Jarhad.",
  path: 'ebook',
})

export default function Page() {
  return <EbookClient />
}
