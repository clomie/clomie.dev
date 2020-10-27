<template>
  <main>
    <section>
      <ul class="posts">
        <li v-for="page in pages" :key="page.slug">
          <nuxt-link :to="page.path">{{ page.title }}</nuxt-link>
          <div class="timestamp">
            <formatted-time :datetime="page.createdAt" />
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $content }) {
    const pages = await $content('posts').sortBy('createdAt', 'desc').fetch()
    return { pages }
  },
  head() {
    return {
      meta: [
        { property: 'og:title', content: 'clomie.dev' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://clomie.dev/' },
      ],
    }
  },
})
</script>
