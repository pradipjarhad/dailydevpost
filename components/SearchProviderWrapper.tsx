'use client'

import React from 'react'
import { SearchProvider, SearchConfig } from 'pliny/search'
import { useInteraction } from './hooks/useInteraction'

interface SearchProviderWrapperProps {
    searchConfig: SearchConfig
    children: React.ReactNode
}

export default function SearchProviderWrapper({ searchConfig, children }: SearchProviderWrapperProps) {
    const interacted = useInteraction()

    if (!interacted) {
        return <>{children}</>
    }

    return (
        <SearchProvider searchConfig={searchConfig}>
            {children}
        </SearchProvider>
    )
}
