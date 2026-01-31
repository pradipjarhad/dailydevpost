'use client'

import Giscus from '@giscus/react'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import siteMetadata from '@/data/siteMetadata'
import { GiscusConfig } from 'pliny/comments/Giscus'

export default function Comments({ slug }: { slug: string }) {
  const [loadComments, setLoadComments] = useState(true)
  const { resolvedTheme } = useTheme()

  const commentsConfig = (siteMetadata.comments as GiscusConfig)?.giscusConfig

  if (!commentsConfig) return null

  return (
    <>
      {!loadComments && <button onClick={() => setLoadComments(true)}>Load Comments</button>}
      {siteMetadata.comments && loadComments && (
        <Giscus
          id={commentsConfig.repositoryId}
          repo={commentsConfig.repo as `${string}/${string}`}
          repoId={commentsConfig.repositoryId}
          category={commentsConfig.category}
          categoryId={commentsConfig.categoryId}
          mapping={commentsConfig.mapping as any}
          reactionsEnabled={commentsConfig.reactions === '1' ? '1' : '0'}
          emitMetadata={commentsConfig.metadata === '1' ? '1' : '0'}
          inputPosition={commentsConfig.inputPosition as 'top' | 'bottom'}
          theme={resolvedTheme === 'dark' ? commentsConfig.darkTheme : commentsConfig.theme}
          lang={commentsConfig.lang}
          loading="eager"
        />
      )}
    </>
  )
}
