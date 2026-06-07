'use client'

import { useEffect, type CSSProperties } from 'react'
import siteMetadata from '@/data/siteMetadata'

type AdSlotProps = {
  slotId: string
  className?: string
  style?: CSSProperties
}

export default function AdSlot({ slotId, className, style }: AdSlotProps) {
  const clientId = siteMetadata.adSenseClient

  useEffect(() => {
    if (typeof window === 'undefined' || !slotId || !clientId) {
      return
    }

    const pushAd = () => {
      const adsbygoogle = (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle
      if (adsbygoogle && Array.isArray(adsbygoogle)) {
        try {
          adsbygoogle.push({})
        } catch (error) {
          // ignore push errors when the ad slot is not ready yet
        }
        return true
      }
      return false
    }

    if (pushAd()) {
      return
    }

    const interval = window.setInterval(() => {
      if (pushAd()) {
        window.clearInterval(interval)
      }
    }, 250)

    return () => window.clearInterval(interval)
  }, [clientId, slotId])

  if (!slotId || !clientId || process.env.NODE_ENV === 'development' || slotId === '1234567890') {
    return null
  }

  return (
    <div className={className} style={style}>
      <ins
        className="adsbygoogle block"
        style={{ display: 'block', width: '100%', minHeight: '90px' }}
        data-ad-client={clientId}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
