<template>
  <main>
    <section>
      <h1>About</h1>
      <p>このウェブサイトのテキストは clomie が書いたものです。</p>
      <h3>Link</h3>
      <ul>
        <li>
          <a href="https://twitter.com/clomie" target="_blank"
            >Twitter - @clomie</a
          >
          <span>質問や連絡はこちらへ</span>
        </li>
        <li>
          <a href="https://github.com/clomie/clomie.dev" target="_blank"
            >GitHub - clomie/clomie.dev</a
          >
          <span>このウェブサイトのソースコードを公開しています</span>
        </li>
      </ul>
    </section>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  head() {
    return {
      title: 'About',
      meta: [
        { property: 'og:title', content: 'About' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://clomie.dev/about' },
      ],
    }
  },
})
</script>

<style scoped>
ul {
  list-style: none;
  padding-left: 0;
}

li {
  margin-top: 1rem;
}

li span {
  display: block;
}
</style>
