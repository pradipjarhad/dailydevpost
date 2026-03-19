import React from 'react'

const Note = ({ children }) => (
  <div className="relative my-8 overflow-hidden rounded-2xl bg-blue-50/40 dark:bg-blue-900/10 border border-blue-200/50 dark:border-blue-800/30 p-6 not-prose group transition-all duration-300 hover:shadow-lg hover:bg-blue-50/60 dark:hover:bg-blue-900/20">
    <div className="flex items-center gap-3 mb-3">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <span className="text-sm font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Note</span>
    </div>
    <div className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
      {children}
    </div>
  </div>
)

const Tip = ({ children }) => (
  <div className="relative my-8 overflow-hidden rounded-2xl bg-emerald-50/40 dark:bg-emerald-900/10 border border-emerald-200/50 dark:border-emerald-800/30 p-6 not-prose group transition-all duration-300 hover:shadow-lg hover:bg-emerald-50/60 dark:hover:bg-emerald-900/20">
    <div className="flex items-center gap-3 mb-3">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0012 18.75c-1.03 0-1.9-.4-2.593-.913l-.547-.547z" />
        </svg>
      </div>
      <span className="text-sm font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Pro Tip</span>
    </div>
    <div className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
      {children}
    </div>
  </div>
)

const Important = ({ children }) => (
  <div className="relative my-8 overflow-hidden rounded-2xl bg-indigo-50/40 dark:bg-indigo-900/10 border border-indigo-200/50 dark:border-indigo-800/30 p-6 not-prose group transition-all duration-300 hover:shadow-lg hover:bg-indigo-50/60 dark:hover:bg-indigo-900/20">
    <div className="flex items-center gap-3 mb-3">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <span className="text-sm font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Crucial</span>
    </div>
    <div className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
      {children}
    </div>
  </div>
)

const Warning = ({ children }) => (
  <div className="relative my-8 overflow-hidden rounded-2xl bg-amber-50/40 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-800/30 p-6 not-prose group transition-all duration-300 hover:shadow-lg hover:bg-amber-50/60 dark:hover:bg-amber-900/20">
    <div className="flex items-center gap-3 mb-3">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <span className="text-sm font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">Warning</span>
    </div>
    <div className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
      {children}
    </div>
  </div>
)

const Caution = ({ children }) => (
  <div className="relative my-8 overflow-hidden rounded-2xl bg-rose-50/40 dark:bg-rose-900/10 border border-rose-200/50 dark:border-rose-800/30 p-6 not-prose group transition-all duration-300 hover:shadow-lg hover:bg-rose-50/60 dark:hover:bg-rose-900/20">
    <div className="flex items-center gap-3 mb-3">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      </div>
      <span className="text-sm font-black uppercase tracking-widest text-rose-600 dark:text-rose-400">Caution</span>
    </div>
    <div className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
      {children}
    </div>
  </div>
)

export { Note, Tip, Important, Warning, Caution }