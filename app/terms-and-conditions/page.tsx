import SectionContainer from '@/components/SectionContainer'
import PageTitle from '@/components/PageTitle'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Terms and Conditions' })

export default function Page() {
  const effectiveDate = 'December 31, 2025'

  return (
    <SectionContainer>
      <article className="py-6">
        <PageTitle>Terms and Conditions</PageTitle>
        <div className="prose max-w-none mt-6 text-gray-600 dark:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400">
          <p>
            These Terms and Conditions govern your use of <strong>{siteMetadata.title}</strong> ({siteMetadata.siteUrl}). By using
            the site you agree to these terms. If you do not agree, please do not use the site.
          </p>

          <h2>Use of content</h2>
          <p>
            All content on this site posts, images, and other materials is the property of {siteMetadata.author} unless
            otherwise noted. You may read, share, and link to posts for personal, non-commercial use but must not
            republish or reproduce content without permission.
          </p>

          <h2>User conduct</h2>
          <p>
            You agree not to use the site for unlawful purposes or to post harmful or offensive content. Comments
            on blog posts are moderated via a third-party provider and must follow community guidelines.
          </p>

          <h2>Disclaimer</h2>
          <p>
            The content on {siteMetadata.title} is for educational and informational purposes only. The author is a
            frontend developer sharing personal experiences and does not provide professional advice. Rely on
            information from the site at your own risk.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, the site and its owner are not liable for any damages arising
            from your use of the site.
          </p>

          <h2>Changes to the terms</h2>
          <p>
            We may revise these Terms and Conditions at any time. Changes take effect when posted on this page.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws applicable to the site owner. If you have questions, please
            contact the author via the <Link href="/about">about page</Link> or the project repository at <a href={siteMetadata.siteRepo} target="_blank" rel="noopener noreferrer">{siteMetadata.siteRepo}</a>.
          </p>
        </div>
      </article>
    </SectionContainer>
  )
}