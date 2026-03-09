import React from 'react'

interface FAQProps {
    faqs: {
        question: string
        answer: string
    }[]
}

const FAQ = ({ faqs }: FAQProps) => {
    if (!faqs || faqs.length === 0) return null

    return (
        <section className="mt-12 mb-10 border-t border-gray-200 pt-10 dark:border-gray-700">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl mb-8">
                Frequently Asked Questions
            </h2>
            <div className="space-y-8">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700/50 hover:border-primary-500/50 transition-colors duration-300">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-start">
                            <span className="text-primary-500 mr-3 mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>
                            {faq.question}
                        </h3>
                        <div className="prose prose-sm dark:prose-invert max-w-none ml-9 text-gray-600 dark:text-gray-300 leading-relaxed">
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FAQ
