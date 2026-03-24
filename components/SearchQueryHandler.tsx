import { useEffect } from 'react'
import { useKBar } from 'kbar'

export default function SearchQueryHandler() {
    let kbar: any = null
    try {
        kbar = useKBar()
    } catch (e) {
        // useKBar might not be in context if SearchProvider isn't ready
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const q = params.get('q')
        if (q && kbar?.query) {
            kbar.query.setSearch(q)
            kbar.query.toggle()
        }
    }, [kbar?.query])

    return null
}
