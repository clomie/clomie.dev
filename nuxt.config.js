import { execSync } from 'child_process'
import { $content } from '@nuxt/content'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'ja',
    },
    titleTemplate(titleChunk) {
      return titleChunk ? `${titleChunk} - clomie.dev` : 'clomie.dev'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        property: 'og:image',
        hid: 'og:image',
        content: 'https://clomie.dev/images/clomie.png',
      },
    ],
    link: [
      { rel: 'stylesheet', href: '/styles/index.css' },
      { rel: 'alternate', type: 'application/atom+xml', href: '/feed.xml' },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/dayjs',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/feed',
  ],

  // Content module configuration (https://go.nuxtjs.dev/content-config)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  hooks: {
    'content:file:beforeInsert': (document, database) => {
      const path = document.path.slice(1) + document.extension
      const cmd = `git --no-pager log --no-color --pretty=format:'%ad' -- ${path}`
      const output = execSync(cmd, { cwd: database.dir }).toString()
      if (output) {
        const timestamps = output.split('\n')
        document.updatedAt = new Date(timestamps[0])
        document.createdAt = new Date(timestamps.pop())
      }
    },
  },

  dayjs: {
    plugins: ['utc', 'timezone'],
  },

  async feed() {
    const baseUrl = 'https://clomie.dev'
    const baseDir = 'posts'
    const posts = await $content(baseDir).sortBy('createdAt', 'desc').fetch()

    const create = function (feed, posts) {
      feed.options = {
        title: 'clomie.dev',
        id: baseUrl,
        link: baseUrl,
      }

      posts.forEach((post) => {
        const url = `${baseUrl}/${baseDir}/${post.slug}`
        feed.addItem({
          title: post.title,
          id: url,
          link: url,
          date: new Date(post.updatedAt),
        })
      })
    }

    return [
      {
        path: '/feed.xml',
        type: 'atom1',
        create,
        data: posts,
      },
    ]
  },
}
