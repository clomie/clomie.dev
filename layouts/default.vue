<template>
  <div>
    <header>
      <nav>
        <nuxt-link class="title" to="/">clomie.dev</nuxt-link>
      </nav>
    </header>
    <main>
      <Nuxt />
    </main>
  </div>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
  color: #333;
  font-size: 16px;
  line-height: 1.8;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

header {
  padding: 1rem;
}

header .title {
  font-size: 1.2rem;
  color: #98cc9c;
  text-decoration: none;
}

main {
  margin-left: auto;
  margin-right: auto;
  padding: 1rem 1rem 2rem;
  max-width: 50rem;
}

img {
  max-width: 100%;
}

time {
  font-size: 0.8rem;
  color: #666;
}
</style>
