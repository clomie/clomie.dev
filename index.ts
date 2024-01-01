import cpy from 'cpy'
import { IndexPage } from './lib/pages'
import { AboutPage } from './lib/pages/about'
import { FeedPage } from './lib/pages/feed'
import { PostPage } from './lib/pages/post'
import { listPosts } from './lib/posts'
import { renderer, route } from './lib/renderer'
import { renderSitemap } from './lib/sitemap'
import { writeContent } from './lib/writer'

const outDir = './dist'
const staticDir = './static'
const contentDir = './content'

console.log(`Output directory: ${outDir}`)

// Parse posts
const posts = listPosts(contentDir)

// Render pages
const routes = [
  route('/', IndexPage, { posts }),
  route('/about', AboutPage, {}),
  ...posts.map((post) => {
    return route(post.path, PostPage, { post })
  }),
  route('/feed.xml', FeedPage, { posts }),
]

;(async () => {
  const files = await Promise.all(routes.map((route) => renderer(route)))
  files.push(renderSitemap(posts.map(({ path }) => path)))

  // Output contents
  files.forEach((file) => {
    const path = writeContent(outDir, file)
    console.log(`Generated: ${path}`)
  })

  // Copy static files
  await cpy('./**', '.' + outDir, { cwd: staticDir })
})()
