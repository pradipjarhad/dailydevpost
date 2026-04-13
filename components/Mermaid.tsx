'use client'

import React, { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

export default function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    // Initialize mermaid when component mounts
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
      securityLevel: 'loose',
    })

    const renderChart = async () => {
      if (ref.current && chart) {
        try {
          // Generate a unique ID for the SVG
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
          const { svg } = await mermaid.render(id, chart)
          
          if (ref.current) {
            ref.current.innerHTML = svg
          }
          setRendered(true)
        } catch (error) {
          console.error('Mermaid parsing error', error)
        }
      }
    }

    renderChart()
  }, [chart])

  return (
    <div 
      className={`mermaid flex min-h-[50px] justify-center my-8 ${!rendered ? 'animate-pulse bg-gray-800/50 rounded-lg h-32' : ''}`} 
      ref={ref}
    />
  )
}
