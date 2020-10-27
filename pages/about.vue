<template>
  <main>
    <section>
      <h1>About</h1>
      <p>このウェブサイトのテキストは clomie が書いたものです。</p>
      <h3>Link</h3>
      <dl>
        <dt>
          <a href="https://twitter.com/clomie" target="_blank"
            >Twitter - @clomie</a
          >
        </dt>
        <dd>質問や連絡はこちらへ</dd>
        <dt>
          <a href="https://github.com/clomie/clomie.dev" target="_blank"
            >GitHub - clomie/clomie.dev</a
          >
        </dt>
        <dd>このウェブサイトのソースコードを公開しています</dd>
      </dl>
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
