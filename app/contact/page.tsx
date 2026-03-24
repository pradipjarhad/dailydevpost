import { genPageMetadata } from 'app/seo'
import siteMetadata from '@/data/siteMetadata'
import ContactForm from '@/components/ContactForm'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata = genPageMetadata({ title: 'Contact' })

export default function Contact() {
    return (
        <>
            <Breadcrumbs />
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="space-y-2 pb-8 pt-6 md:space-y-5">
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                        Contact
                    </h1>
                    <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
                        Have a question, a suggestion or just want to say hi? I'd love to hear from you.
                        Whether it's about a specific blog post, a project or a potential collaboration,
                        feel free to reach out using the form below or directly via email.
                    </p>
                </div>
                <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
                    <div className="flex flex-col items-center space-x-2 pt-8">
                        <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">Direct Contact</h3>
                        <div className="pt-6">
                            {siteMetadata.email && (
                                <div className="flex flex-col items-center text-center">
                                    <span className="mb-2 font-medium text-gray-700 dark:text-gray-200">Email Me Directly</span>
                                    <a
                                        href={`mailto:${siteMetadata.email}`}
                                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                    >
                                        {siteMetadata.email}
                                    </a>
                                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                        I typically respond within 24 hours.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="pt-8 pb-8 xl:col-span-2">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </>
    )
}
