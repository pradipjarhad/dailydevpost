import rss from './rss.mjs'
import { execSync } from 'child_process'

async function postbuild() {
  await rss()
  try {
    execSync('node ./scripts/generate-sitemap.mjs')
    console.log('Post-build sitemap generation complete.')
  } catch (error) {
    console.error('Error during post-build sitemap generation:', error)
  }
}

postbuild()
