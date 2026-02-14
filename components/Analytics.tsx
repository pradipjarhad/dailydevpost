'use client'

import Script from 'next/script'
import { useInteraction } from './hooks/useInteraction'

export default function Analytics({ gaId }: { gaId: string }) {
    const interacted = useInteraction()

    if (!gaId || !interacted) return null

    return (
        <>
            <Script
                id="gtm-script"
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
                }}
            />
        </>
    )
}
