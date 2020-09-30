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
    return { page }
  },
}
</script>
