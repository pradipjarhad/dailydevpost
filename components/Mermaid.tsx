'use client'

import React, { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

export default function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Handle mount state
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle mermaid initialization and rendering
  useEffect(() => {
    if (!mounted || !ref.current || !chart) return

    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
    })

    const renderChart = async () => {
      try {
        // Generate a unique ID for the SVG
        const id = `mermaid-svg-${Math.random().toString(36).substring(2, 11)}`
        const { svg } = await mermaid.render(id, chart)
        
        if (ref.current) {
          ref.current.innerHTML = svg
          setRendered(true)
        }
      } catch (error) {
        console.error('Mermaid parsing error', error)
      }
    }

    renderChart()
  }, [mounted, chart])

  if (!mounted) {
    return <div className="flex min-h-[128px] justify-center my-8 animate-pulse bg-gray-800/50 rounded-lg w-full" />
  }

  return (
    <div 
      className={`flex min-h-[50px] justify-center my-8 ${!rendered ? 'animate-pulse bg-gray-800/50 rounded-lg h-32' : ''}`} 
      ref={ref}
    />
  )
}
