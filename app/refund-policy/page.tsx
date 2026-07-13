import SectionContainer from '@/components/SectionContainer'
import PageTitle from '@/components/PageTitle'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = genPageMetadata({
  title: 'Refund Policy',
  description: `Refund Policy for ${siteMetadata.title} products and digital downloads.`,
  path: 'refund-policy',
})

export default function Page() {
  const lastUpdated = 'July 11, 2026'

  return (
    <SectionContainer>
      <Breadcrumbs />
      <article className="py-6">
        <PageTitle>Refund Policy</PageTitle>
        <div className="prose max-w-none mt-6 text-gray-600 dark:text-gray-300 dark:prose-invert prose-a:text-blue-600 dark:prose-a:text-blue-400">
          <p>
            <em>Last updated: {lastUpdated}</em>
          </p>

          <p>
            Because our products are digital downloads, all sales are generally final. Once you purchase and download or access the digital product, we cannot offer a return or exchange under normal circumstances.
          </p>

          <h2>Technical Issues & Access Problems</h2>
          <p>
            If you experience a technical issue, receive the wrong product, or cannot access your purchase, please contact us within 14 days at <a href={`mailto:${siteMetadata.email}`} className="font-bold underline">{siteMetadata.email}</a>. We will do everything in our power to resolve the issue, supply the correct files, or restore access immediately.
          </p>

          <h2>Consumer Protection Laws</h2>
          <p>
            Where required by applicable consumer protection laws, refunds will be provided in accordance with those laws. We respect and comply with national and international consumer protection standards.
          </p>
        </div>
      </article>
    </SectionContainer>
  )
}
