"use client"

import { useEffect } from 'react'
import { useKBar } from 'kbar'

export default function SearchQueryHandler() {
  const { query } = useKBar()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const q = params.get('q')
    if (q && query) {
      query.setSearch(q)
      query.toggle()
    }
  }, [query])

  return null
}
