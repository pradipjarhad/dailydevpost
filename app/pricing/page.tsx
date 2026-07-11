import Pricing from './Pricing'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'

export const metadata: Metadata = genPageMetadata({
  title: 'Pricing',
  description: 'Pricing options for DailyDevPost - The Future-Proof Frontend Developer eBook in various currencies.',
  path: 'pricing',
})

export default function Page() {
  return <Pricing />
}
