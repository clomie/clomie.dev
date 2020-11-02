import { Fragment, h, VNode } from 'preact'
import { DOMAIN, URL_PREFIX } from '../env'

type Props = {
  path: string
  type: 'website' | 'article'
  title?: string
  image?: string
  summary?: string
  children?: VNode[] | VNode
}

export const DefaultLayout = ({
  path,
  type,
  title,
  image,
  summary,
  children,
}: Props) => {
  const ogImage = URL_PREFIX + (image || '/images/clomie.png')
  const ogUrl = URL_PREFIX + path
  const pageTitle = (title ? title + ' - ' : '') + DOMAIN
  const twitterCard = image ? 'summary_large_image' : 'summary'

  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {summary && (
          <Fragment>
            <meta property="description" content={summary} />
            <meta property="og:description" content={summary} />
          </Fragment>
        )}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:type" content={type} />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="twitter:card" content={twitterCard} />
        <link rel="stylesheet" href="/styles/index.css" />
        <link rel="alternate" type="application/atom+xml" href="/feed.xml" />
        <title>{pageTitle}</title>
      </head>
      <body>
        <header>
          <a class="site-title" href="/">
            {DOMAIN}
          </a>
          <nav>
            <a href="/about">About</a>
            <a href="/feed.xml">Feed</a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}
