import { h } from 'preact'

import { DOMAIN, URL_PREFIX } from '../env'

declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [key: string]: any
    }
  }
}

const Entry = ({ path, title, createdAt }: Post) => {
  const link = URL_PREFIX + path
  return (
    <entry>
      <title type="html">{title}</title>
      <id>{link}</id>
      <link href={link} />
      <updated>{createdAt.toISOString()}</updated>
    </entry>
  )
}

export const FeedPage = ({ posts }: PageProps<{ posts: Post[] }>) => {
  return (
    <feed xmlns="http://www.w3.org/2005/Atom">
      <id>{URL_PREFIX}</id>
      <title>{DOMAIN}</title>
      <updated>{new Date().toISOString()}</updated>
      <link rel="alternate" href={URL_PREFIX} />
      {posts.map((post) => (
        <Entry {...post} />
      ))}
    </feed>
  )
}
