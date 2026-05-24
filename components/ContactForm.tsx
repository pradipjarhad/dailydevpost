'use client'

import React, { useState } from 'react'

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setStatus('submitting')
        const form = event.currentTarget
        const formData = new FormData(form)
        const data = Object.fromEntries(formData.entries())

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                setStatus('success')
                form.reset()
            } else {
                setStatus('error')
            }
        } catch (error) {
            setStatus('error')
        }
    }

    return (
        <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <form
                onSubmit={handleSubmit}
                name="contact"
                className="relative flex flex-col space-y-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 rounded-2xl shadow-xl"
            >
                <input type="hidden" name="form-name" value="contact" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-bold tracking-wider uppercase text-gray-500 dark:text-gray-400">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="block w-full px-4 py-3 rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                            placeholder="Engineering Lead"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-bold tracking-wider uppercase text-gray-500 dark:text-gray-400">
                            Email <span className="text-primary-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            className="block w-full px-4 py-3 rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                            placeholder="dev@example.com"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold tracking-wider uppercase text-gray-500 dark:text-gray-400">
                        Message <span className="text-primary-500">*</span>
                    </label>
                    <textarea
                        name="message"
                        id="message"
                        rows={5}
                        required
                        className="block w-full px-4 py-3 rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none resize-none"
                        placeholder="I'm interested in discussing performance optimization..."
                    ></textarea>
                </div>

                <div className="flex flex-col items-center space-y-4">
                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className={`w-full sm:w-auto px-10 py-4 rounded-xl font-bold tracking-wide text-white transition-all duration-200 shadow-lg 
                            ${status === 'submitting' 
                                ? 'bg-gray-400 cursor-not-allowed opacity-50' 
                                : 'bg-primary-500 hover:bg-primary-600 hover:shadow-primary-500/40 hover:-translate-y-0.5 active:translate-y-0'
                            }`}
                    >
                        {status === 'submitting' ? 'Encrypting & Sending...' : 'Execute Message'}
                    </button>

                    {status === 'success' && (
                        <p className="text-sm font-medium text-green-500 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                            Handshake Successful! Talk soon.
                        </p>
                    )}

                    {status === 'error' && (
                        <p className="text-sm font-medium text-red-500 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Transmission Failed. Please try again.
                        </p>
                    )}
                </div>
            </form>
        </div>
    )
}
