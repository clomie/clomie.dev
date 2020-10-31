import cpy from 'cpy'
import { IndexPage } from './lib/pages'
import { AboutPage } from './lib/pages/about'
import { FeedPage } from './lib/pages/feed'
import { PostPage } from './lib/pages/post'
import { listPosts } from './lib/posts'
import { renderer, route } from './lib/renderer'

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
routes.forEach((route) => renderer(outDir, route))

// Copy static files
;(async () => {
  await cpy('.', '.' + outDir, { cwd: staticDir, parents: true })
})()
