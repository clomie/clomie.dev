import { h } from 'preact'

import { DOMAIN, URL_PREFIX } from '../env'

declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [key: string]: any
    }
  }
}

const Entry = ({ path, title, createdAt, updatedAt, body }: Post) => {
  const link = URL_PREFIX + path
  return (
    <entry>
      <title type="text">{title}</title>
      <id>{link}</id>
      <link rel="alternate" type="text/html" href={link} />
      <published>{createdAt.toISOString()}</published>
      <updated>{updatedAt.toISOString()}</updated>
      <content type="html">{body}</content>
    </entry>
  )
}

export const FeedPage = ({ path, posts }: PageProps<{ posts: Post[] }>) => {
  const indexUrl = URL_PREFIX + '/'
  return (
    <feed xmlns="http://www.w3.org/2005/Atom">
      <title type="text">{DOMAIN}</title>
      <updated>{new Date().toISOString()}</updated>
      <id>{indexUrl}</id>
      <link rel="alternate" href={indexUrl} />
      <link rel="self" type="application/atom+xml" href={URL_PREFIX + path} />
      <author>
        <name>clomie</name>
      </author>
      {posts.map((post) => (
        <Entry {...post} />
      ))}
    </feed>
  )
}
