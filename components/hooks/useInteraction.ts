'use client'

import { useState, useEffect } from 'react'

export const useInteraction = (): boolean => {
    const [interacted, setInteracted] = useState(false)

    useEffect(() => {
        const handleInteraction = () => {
            setInteracted(true)
        }

        const events = ['scroll', 'click', 'mousemove', 'touchstart', 'keydown']

        // Check if there's a search query in the URL to trigger interaction immediately
        const params = new URLSearchParams(window.location.search)
        if (params.has('q')) {
            setInteracted(true)
        }

        events.forEach(event => {
            window.addEventListener(event, handleInteraction, { once: true, passive: true })
        })

        // Fallback: load after 5 seconds anyway if no interaction
        const timeout = setTimeout(() => {
            setInteracted(true)
        }, 5000)

        return () => {
            events.forEach(event => {
                window.removeEventListener(event, handleInteraction)
            })
            clearTimeout(timeout)
        }
    }, [])

    return interacted
}
