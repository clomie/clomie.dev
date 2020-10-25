<template>
  <main>
    <article>
      <h1>{{ page.title }}</h1>
      <div class="timestamp">
        <formatted-time :datetime="page.createdAt" /><template
          v-if="page.createdAt !== page.updatedAt"
          >, Updated: <formatted-time :datetime="page.updatedAt"
        /></template>
      </div>
      <nuxt-content :document="page" />
    </article>
  </main>
</template>

<script>
export default {
  async asyncData({ params, $content }) {
    const page = await $content('posts', params.slug).fetch()
    return {
      page,
      slug: params.slug,
    }
  },
  methods: {
    searchImg(e) {
      if (e.type === 'element' && e.tag === 'img') {
        return e.props.src
      }
      if (e.children) {
        for (const child of e.children) {
          const src = this.searchImg(child)
          if (src) {
            return src
          }
        }
      }
      return null
    },
  },
  head() {
    const img = this.searchImg(this.page.body)
    return {
      title: this.page.title,
      meta: [
        { property: 'og:title', content: this.page.title },
        { property: 'og:type', content: 'article' },
        {
          property: 'og:url',
          content: `https://clomie.dev/posts/${this.slug}`,
        },
        {
          property: 'og:image',
          hid: 'og:image',
          content: 'https://clomie.dev' + (img || '/images/clomie.png'),
        },
        {
          property: 'twitter:card',
          content: img ? 'summary_large_image' : 'summary',
        },
      ],
    }
  },
}
</script>

<style>
textarea {
  font-family: sans-serif;
  color: #333;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  line-height: 1.9;
}
</style>
