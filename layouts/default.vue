<template>
  <div>
    <header>
      <h1>
        <nuxt-link to="/">clomie.dev</nuxt-link>
      </h1>
      <nav>
        <nuxt-link to="/about">About</nuxt-link>
        <a href="/feed.xml">Feed</a>
      </nav>
    </header>
    <Nuxt />
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
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

header {
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
  max-width: 50rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

header h1 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: normal;
  color: #98cc9c;
}

header nav a {
  font-size: 0.85rem;
  margin-left: 1rem;
}

main {
  margin-left: auto;
  margin-right: auto;
  padding: 1rem 1rem 2rem;
  max-width: 50rem;
  line-height: 1.9;
}

main h1,
main h2,
main h3 {
  color: #444;
  margin: 0;
}

h1 a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
}

div.timestamp {
  font-size: 0.8rem;
  color: #666;
  display: block;
}

hr {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
