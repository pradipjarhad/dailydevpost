import SectionContainer from '@/components/SectionContainer'
import PageTitle from '@/components/PageTitle'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Privacy Policy' })

export default function Page() {
  const effectiveDate = 'December 31, 2025'

  return (
    <SectionContainer>
      <article className="py-6">
        <PageTitle>Privacy Policy</PageTitle>
        <div className="prose max-w-none mt-6 text-gray-600 dark:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400">
          <p>
            <strong>{siteMetadata.title}</strong> is a public learning diary by {siteMetadata.author}. This
            Privacy Policy explains what information is collected on {siteMetadata.siteUrl} and how it is
            used. <em>Effective date: {effectiveDate}.</em>
          </p>

          <h2>Information we collect</h2>
          <p>
            We collect information you provide directly (for example, when you subscribe to the newsletter or
            contact the author) and information collected automatically such as cookies and analytics data. We
            do not sell personal data.
          </p>

          <h2>Cookies &amp; analytics</h2>
          <p>
            The site may use cookies and analytics providers (e.g., Umami or Google Analytics if enabled) to
            understand site usage and improve the content. Analytics data is typically aggregated and does not
            identify you personally.
          </p>

          <h2>Third-party links</h2>
          <p>
            The site links to third-party services (GitHub, Twitter, LinkedIn, etc.). These external sites have
            their own privacy policies; we are not responsible for their content or practices.
          </p>

          <h2>Data security</h2>
          <p>
            We take reasonable measures to protect the information collected on the site, but no internet
            transmission is completely secure. If you have concerns about the security of your data, contact us
            via the <Link href="/about">about page</Link>.
          </p>

          <h2>Children</h2>
          <p>
            This site is not intended for children under 13. We do not knowingly collect personal information
            from children.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy from time to time. The updated policy will be posted here with a revised
            effective date.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about this policy, visit the <Link href="/about">about page</Link> or file an issue on the
            project repository: <a href={siteMetadata.siteRepo} target="_blank" rel="noopener noreferrer">{siteMetadata.siteRepo}</a>.
          </p>
        </div>
      </article>
    </SectionContainer>
  )
}