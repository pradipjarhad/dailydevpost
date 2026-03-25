"use client"

import React from 'react'
import { SearchProvider, SearchConfig } from 'pliny/search'
import { useInteraction } from './hooks/useInteraction'
import SearchQueryHandler from './SearchQueryHandler'

interface SearchProviderWrapperProps {
    searchConfig: SearchConfig
    children: React.ReactNode
}

export default function SearchProviderWrapper({ searchConfig, children }: SearchProviderWrapperProps) {
    return (
        <SearchProvider searchConfig={searchConfig}>
            <SearchQueryHandler />
            {children}
        </SearchProvider>
    )
}
