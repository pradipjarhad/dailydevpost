import SectionContainer from '@/components/SectionContainer'
import PageTitle from '@/components/PageTitle'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata = genPageMetadata({
  title: 'Terms and Conditions',
  description: `Terms and Conditions for ${siteMetadata.title} - Read our rules, user responsibilities, and legal disclaimers for using our website.`,
})

export default function Page() {
  const effectiveDate = 'March 22, 2026'


  return (
    <SectionContainer>
      <Breadcrumbs />
      <article className="py-6">
        <PageTitle>Terms and Conditions</PageTitle>
        <div className="prose max-w-none mt-6 text-gray-600 dark:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400">
          <p>
            Welcome to <strong>{siteMetadata.title}</strong>. These terms and conditions outline the rules and
            regulations for the use of <strong>{siteMetadata.title}</strong>&apos;s Website, located at
            <a href={siteMetadata.siteUrl}> {siteMetadata.siteUrl}</a>.
          </p>
          <p>
            By accessing this website we assume you accept these terms and conditions. Do not continue to use
            {siteMetadata.title} if you do not agree to take all of the terms and conditions stated on this page.
          </p>
          <p>
            <em>Effective date: {effectiveDate}</em>
          </p>

          <h2>1. Intellectual Property Rights</h2>
          <p>
            Unless otherwise stated, {siteMetadata.author} and/or its licensors own the intellectual property rights
            for all material on {siteMetadata.title}. All intellectual property rights are reserved. You may access this
            from {siteMetadata.title} for your own personal use subjected to restrictions set in these terms and conditions.
          </p>
          <p>You must not:</p>
          <ul>
            <li>Republish material from {siteMetadata.title}</li>
            <li>Sell, rent or sub-license material from {siteMetadata.title}</li>
            <li>Reproduce, duplicate or copy material from {siteMetadata.title}</li>
            <li>Redistribute content from {siteMetadata.title}</li>
          </ul>

          <h2>2. User Responsibilities & Conduct</h2>
          <p>
            As a user of this website, you agree to use the site only for lawful purposes. You are prohibited from
            using the site to:
          </p>
          <ul>
            <li>Engage in any activity that violates any local, state, or international law.</li>
            <li>Transmit any worms, viruses, or any code of a destructive nature.</li>
            <li>Attempt to hack, destabilize, or adapt the website or its underlying code.</li>
            <li>Post or transmit any message which is libelous, defamatory, or which discloses private or personal matters concerning any person.</li>
          </ul>

          <h2>3. Disclaimers</h2>
          <p>
            The information provided on <strong>{siteMetadata.title}</strong> is for general informational and educational
            purposes only. All information on the site is provided in good faith, however, we make no representation
            or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability,
            availability, or completeness of any information on the site.
          </p>
          <p>
            Your use of the site and your reliance on any information on the site is solely at your own risk.
          </p>

          <h2>4. Limitation of Liability</h2>
          <p>
            In no event shall {siteMetadata.author} or <strong>{siteMetadata.title}</strong> be liable for any
            indirect, consequential, special, incidental, or punitive damages, including without limitation, loss of
            profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul>
            <li>Your access to or use of or inability to access or use the site.</li>
            <li>Any conduct or content of any third party on the site.</li>
            <li>Any content obtained from the site.</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
          </ul>

          <h2>5. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless {siteMetadata.author} and its contributors from and
            against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses
            (including but not limited to attorney&apos;s fees), resulting from or arising out of a) your use and
            access of the Service, or b) a breach of these Terms.
          </p>

          <h2>6. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party web sites or services that are not owned or controlled by us.
            We have no control over, and assume no responsibility for, the content, privacy policies, or practices
            of any third party web sites or services.
          </p>

          <h2>7. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes
            a material change will be determined at our sole discretion. By continuing to access or use our site after
            those revisions become effective, you agree to be bound by the revised terms.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which
            the site owner resides, without regard to its conflict of law provisions.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us:
          </p>
          <ul>
            <li>By visiting our <Link href="/contact" className="font-bold underline">Contact Page</Link></li>
            <li>By emailing us directly at <a href={`mailto:${siteMetadata.email}`} className="font-bold underline">{siteMetadata.email}</a></li>
          </ul>
        </div>
      </article>
    </SectionContainer>
  )
}