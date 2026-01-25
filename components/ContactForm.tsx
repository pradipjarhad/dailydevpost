'use client'

import React from 'react'

export default function ContactForm() {
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const form = event.currentTarget
        const formData = new FormData(form)
        const entries = Array.from(formData.entries()).filter(
            (entry): entry is [string, string] => typeof entry[1] === 'string'
        )
        const body = new URLSearchParams(entries).toString()

        try {
            const response = await fetch('/__forms.html', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: body,
            })

            if (response.ok) {
                alert('Message sent successfully!')
                form.reset()
            } else {
                alert('Something went wrong. Please try again.')
            }
        } catch (error) {
            alert('Something went wrong. Please try again.')
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            name="contact"
            className="flex flex-col space-y-4"
        >
            <input type="hidden" name="form-name" value="contact" />
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Name
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 sm:text-sm"
                    placeholder="Your Name (Optional)"
                />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 sm:text-sm"
                    placeholder="you@example.com"
                />
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Message <span className="text-red-500">*</span>
                </label>
                <textarea
                    name="message"
                    id="message"
                    rows={4}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 sm:text-sm"
                    placeholder="Your message..."
                ></textarea>
            </div>
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-primary-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:hover:bg-primary-400"
                >
                    Send Message
                </button>
            </div>
        </form>
    )
}
