'use client'

import React, { useState } from 'react'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import Breadcrumbs from '@/components/Breadcrumbs'

export default function Pricing() {
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [showModal, setShowModal] = useState(false)

  const prices = [
    { country: 'India', currency: 'INR', symbol: '₹', value: '499', code: 'INR' },
    { country: 'United States', currency: 'USD', symbol: '$', value: '29', code: 'USD', isDefault: true },
    { country: 'United Kingdom', currency: 'GBP', symbol: '£', value: '25', code: 'GBP' },
    { country: 'Europe', currency: 'EUR', symbol: '€', value: '29', code: 'EUR' },
    { country: 'Australia', currency: 'AUD', symbol: 'A$', value: '45', code: 'AUD' },
  ]

  const features = [
    { text: 'Instant digital download', desc: 'Get PDF and EPUB formats immediately after payment' },
    { text: 'Free updates for this edition', desc: 'Receive updated versions automatically when new content is added' },
    { text: 'Lifetime access', desc: 'Download anytime from your personal link without expiration' },
  ]

  const handleCheckout = (currencyCode: string) => {
    setSelectedCurrency(currencyCode)
    setShowModal(true)
  }

  return (
    <SectionContainer>
      <Breadcrumbs />
      <div className="py-8 md:py-16">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
            <span className="block text-primary-600 dark:text-primary-400">DailyDevPost</span>
            <span className="block mt-2">eBook Pricing</span>
          </h1>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
            Master modern frontend development, optimize performance, and level up your engineering career.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Product Showcase */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900/50 dark:to-gray-950 border border-gray-200/60 dark:border-gray-800/80 rounded-3xl p-8 relative overflow-hidden shadow-xl">
            {/* Visual Book Mockup */}
            <div className="relative group w-56 h-72 mx-auto mb-8 transition-transform duration-500 hover:scale-105 perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-600 to-indigo-500 rounded-lg shadow-2xl transform -rotate-6 group-hover:rotate-0 transition-transform duration-500"></div>
              <div className="relative w-full h-full bg-slate-950 text-white rounded-lg p-6 border border-white/10 flex flex-col justify-between shadow-2xl">
                <div>
                  <div className="text-[10px] font-bold tracking-widest text-primary-400 uppercase">DAILYDEVPOST</div>
                  <h3 className="mt-4 text-xl font-extrabold leading-tight tracking-tight text-slate-100">
                    The Future-Proof <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-teal-300">
                      Frontend Developer
                    </span>
                  </h3>
                  <p className="mt-2 text-[10px] text-slate-400">Complete eBook (PDF + EPUB)</p>
                </div>
                <div className="border-t border-slate-800 pt-4">
                  <p className="text-[9px] text-slate-400 font-mono">By Pradip Jarhad</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">The Future-Proof Frontend Developer</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Digital eBook (PDF + EPUB)</p>
              </div>

              <hr className="border-gray-200 dark:border-gray-800" />

              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mr-3">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <div>
                      <span className="text-base font-semibold text-gray-800 dark:text-gray-200">{feature.text}</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{feature.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Pricing Options */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <span className="mr-2">💰</span> Select Currency
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {prices.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    className={`text-left w-full border rounded-2xl p-5 transition-all duration-300 relative ${
                      selectedCurrency === item.code
                        ? 'border-primary-500 ring-2 ring-primary-500/20 bg-primary-50/20 dark:bg-primary-950/10'
                        : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-slate-50/50 dark:bg-gray-900/30'
                    }`}
                    onClick={() => setSelectedCurrency(item.code)}
                  >
                    {item.isDefault && (
                      <span className="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-wider text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/50 px-2 py-0.5 rounded-full">
                        Standard
                      </span>
                    )}
                    <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {item.country}
                    </span>
                    <div className="mt-2 flex items-baseline">
                      <span className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                        {item.symbol}{item.value}
                      </span>
                      <span className="ml-1 text-sm font-semibold text-gray-500 dark:text-gray-400">
                        {item.currency}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Checkout simulation CTA */}
              <button
                onClick={() => handleCheckout(selectedCurrency)}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white font-bold text-lg shadow-lg hover:shadow-primary-500/20 transition-all duration-300 transform active:scale-98 flex items-center justify-center space-x-2"
              >
                <span>Get Instant Download</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
                Prices are automatically shown in your local currency during checkout.
              </p>
            </div>

            {/* Support and QA section */}
            <div className="bg-slate-50 dark:bg-gray-900/30 border border-gray-200/60 dark:border-gray-800/80 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-bold text-gray-900 dark:text-gray-100">Have any questions?</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Need help with payment or group licensing?</p>
              </div>
              <a
                href={`mailto:${siteMetadata.email}`}
                className="py-2.5 px-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-200 font-semibold text-sm rounded-xl transition-all duration-200 shadow-sm"
              >
                {siteMetadata.email}
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Simulated Checkout Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-md w-full p-8 border border-gray-200 dark:border-gray-800 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center">
              <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-600 dark:text-primary-400 mb-4 text-xl">
                💳
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Paddle Checkout Integration</h3>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                During production checkout, this triggers the secure <strong className="text-gray-700 dark:text-gray-300">Paddle.com</strong> checkout overlay. 
              </p>
              <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-gray-600 dark:text-gray-400">
                Selected Currency: <strong className="text-primary-600 dark:text-primary-400 font-bold">{selectedCurrency}</strong>
              </div>
              <div className="mt-6 flex flex-col space-y-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full py-2.5 px-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl shadow-md transition-all duration-200"
                >
                  Understood
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </SectionContainer>
  )
}
