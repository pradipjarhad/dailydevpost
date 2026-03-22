import rss from './rss.mjs'

async function postbuild() {
  await rss()
  console.log('Post-build RSS generation complete.')
}

postbuild()
