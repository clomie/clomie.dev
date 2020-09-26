<template>
  <article>
    <h1>{{ page.title }}</h1>
    <formatted-time :datetime="page.createdAt" />
    <nuxt-content :document="page" />
  </article>
</template>

<script>
export default {
  async asyncData({ params, $content }) {
    const page = await $content('posts', params.slug).fetch()
    return { page }
  },
  computed: {
    createdAtDatetime() {
      return new Date(this.page.createdAt).toISOString()
    },
    createdAt() {
      return this.$dayjs(this.page.createdAt).format('YYYY/MM/DD HH:mm')
    },
  },
}
</script>

<style scoped>
h1 {
  margin: 0;
}
</style>
