import SectionContainer from '@/components/SectionContainer'
import PageTitle from '@/components/PageTitle'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = genPageMetadata({
  title: 'Privacy Policy',
  description: `Privacy Policy for ${siteMetadata.title} - Learn how we collect, use, and protect your data, including Google AdSense and cookie disclosures.`,
  path: 'privacy-policy',
})

export default function Page() {
  const effectiveDate = 'June 14, 2026'

  
  return (
    <SectionContainer>
      <Breadcrumbs />
      <article className="py-6">
        <PageTitle>Privacy Policy</PageTitle>
        <div className="prose max-w-none mt-6 text-gray-600 dark:text-gray-300 dark:prose-invert prose-a:text-blue-600 dark:prose-a:text-blue-400">
          <p>
            Welcome to <strong>{siteMetadata.title}</strong>. Your privacy is critically important to us.
            This Privacy Policy document contains types of information that is collected and recorded by
            {siteMetadata.title} and how we use it.
          </p>
          <p>
            <em>Effective date: {effectiveDate}</em>
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect several different types of information for various purposes to provide and improve our service to you:
          </p>
          <ul>
            <li>
              <strong>Personal Data:</strong> While using our site, we may ask you to provide us with certain personally
              identifiable information that can be used to contact or identify you (e.g., email address when subscribing to our newsletter).
            </li>
            <li>
              <strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used.
              This may include information such as your computer&apos;s IP address, browser type, browser version, the
              pages of our site that you visit, the time and date of your visit, and other diagnostic data.
            </li>
          </ul>

          <h2>2. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.
            Cookies are files with a small amount of data which may include an anonymous unique identifier.
          </p>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you
            do not accept cookies, you may not be able to use some portions of our Service.
          </p>

          <h2>3. Google AdSense & Third-Party Advertising</h2>
          <p>
            We use Google AdSense to serve ads on our website. Google, as a third-party vendor, uses cookies to serve ads
            on <strong>{siteMetadata.title}</strong>. Google&apos;s use of advertising cookies enables it and its partners
            to serve ads to our users based on their visit to our site and/or other sites on the Internet.
          </p>
          <ul>
            <li>
              Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to your website or other websites.
            </li>
            <li>
              Google&apos;s use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.
            </li>
            <li>
              Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Ads Settings</a>.
            </li>
          </ul>
          <p>
            Please be aware that third parties (including Google and other ad networks) may be placing and reading cookies on your users&apos; browsers, or using web beacons to collect information as a result of ad serving on our website.
          </p>
          <p>
            For more information on how Google uses data when you use our partners&apos; sites or apps, please visit
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer"> policies.google.com/technologies/partner-sites</a>.
          </p>

          <h2>4. Email Newsletter & Third-Party Processors</h2>
          <p>
            If you choose to subscribe to our newsletter, we collect your email address for the sole purpose of sending you blog updates, newsletter issues, technical insights, and announcements.
          </p>
          <p>
            We use <strong>EmailOctopus</strong> as our third-party email marketing platform. By subscribing, you acknowledge that the email address you provide will be transferred to EmailOctopus for processing in accordance with their privacy policy and terms.
          </p>
          <p>
            We will never sell, rent, or distribute your email address to unauthorized third parties. You can opt out or unsubscribe from our newsletter at any time by clicking the &quot;unsubscribe&quot; link included at the bottom of each email, or by contacting us directly.
          </p>

          <h2>5. Use of Data</h2>
          <p>{siteMetadata.title} uses the collected data for various purposes:</p>
          <ul>
            <li>To provide and maintain our Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our Service</li>
            <li>To monitor the usage of our Service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>

          <h2>6. GDPR and CCPA Compliance</h2>
          <p>
            We are committed to ensuring that your data is handled according to the General Data Protection Regulation (GDPR)
            and the California Consumer Privacy Act (CCPA).
          </p>
          <p>
            If you are a resident of the European Economic Area (EEA) or California, you have certain data protection rights,
            including the right to access, update, or delete the information we have on you.
          </p>

          <h2>7. Third-Party Links</h2>
          <p>
            Our Service may contain links to other sites that are not operated by us. If you click on a third-party link,
            you will be directed to that third party&apos;s site. We strongly advise you to review the Privacy Policy of every site you visit.
          </p>

          <h2>8. Data Security</h2>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet,
            or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to
            protect your Personal Data, we cannot guarantee its absolute security.
          </p>

          <h2>9. Updates to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the &quot;effective date&quot; at the top of this Privacy Policy.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
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