<template>
  <article>
    <h1>{{ page.title }}</h1>
    <time :datetime="page.createdAt">{{ page.createdAt }}</time>
    <nuxt-content :document="page" />
  </article>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ params, $content }) {
    const page = await $content('posts', params.slug).fetch()
    return { page }
  },
})
</script>

<style scoped>
h1 {
  margin: 0;
}
</style>
