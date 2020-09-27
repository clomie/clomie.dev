<template>
  <section>
    <ul>
      <li v-for="page in pages" :key="page.slug">
        <formatted-time :datetime="page.createdAt" />
        <nuxt-link :to="page.path">{{ page.title }}</nuxt-link>
      </li>
    </ul>
    <p class="feed-link">
      <a href="/feed.xml">feed</a>
    </p>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $content }) {
    const pages = await $content('posts').sortBy('createdAt', 'desc').fetch()
    return { pages }
  },
})
</script>

<style scoped>
ul {
  list-style: none;
  padding-left: 0;
}

p.feed-link {
  font-size: 0.8rem;
}
</style>
