<template>
  <main>
    <section>
      <ul>
        <li v-for="page in pages" :key="page.slug">
          <nuxt-link :to="page.path">{{ page.title }}</nuxt-link>
          <formatted-time :datetime="page.createdAt" />
        </li>
      </ul>
    </section>
    <aside class="feed-link">
      <a href="/feed.xml">feed</a>
    </aside>
  </main>
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

li + li {
  margin-top: 0.75rem;
}

.feed-link {
  font-size: 0.8rem;
}
</style>
