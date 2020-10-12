<template>
  <main>
    <article>
      <h1>{{ page.title }}</h1>
      <formatted-time :datetime="page.createdAt" />
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
  head() {
    return {
      title: this.page.title,
      meta: [
        { property: 'og:title', content: this.page.title },
        { property: 'og:type', content: 'article' },
        {
          property: 'og:url',
          content: `https://clomie.dev/posts/${this.slug}`,
        },
      ],
    }
  },
}
</script>
