'use client'

import React from 'react'
import dynamic from 'next/dynamic'

// Dynamically import Pliny's MDXLayoutRenderer with SSR disabled.
// This completely bypasses Cloudflare Worker's V8 "Code generation from strings disallowed" (EvalError) constraint
// during runtime server-side execution.
const MDXLayoutRenderer = dynamic(
  () => import('pliny/mdx-components').then((mod) => mod.MDXLayoutRenderer),
  {
    ssr: false,
    loading: () => <div className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg h-48 w-full"></div>
  }
)

interface MdxWrapperProps {
  code: string
  components?: Record<string, React.ComponentType<unknown>>
  toc?: unknown
}

export default function MdxWrapper({ code, components, toc }: MdxWrapperProps) {
  return <MDXLayoutRenderer code={code} components={components} toc={toc} />
}
