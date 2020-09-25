<template>
  <section>
    <ul>
      <li v-for="page in pages" :key="page.slug">
        <time :datetime="page.createdAt">{{
          page.createdAt.slice(0, 10)
        }}</time>
        <nuxt-link :to="page.path">{{ page.title }}</nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $content }) {
    const pages = await $content('posts').without(['body']).fetch()
    return { pages }
  },
})
</script>

<style scoped>
ul {
  list-style: none;
  padding-left: 0;
}
</style>
