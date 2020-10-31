import { h } from 'preact'
import { DefaultLayout } from '../layouts/DefaultLayout'

export const AboutPage = ({ path }: PageProps) => {
  return (
    <DefaultLayout path={path} type="website" title="About">
      <main>
        <section>
          <h1>About</h1>
          <p>このウェブサイトのテキストは clomie が書いたものです。</p>
          <h3>Link</h3>
          <dl>
            <dt>
              <a href="https://twitter.com/clomie" target="_blank">
                Twitter - @clomie
              </a>
            </dt>
            <dd>質問や連絡はこちらへ</dd>
            <dt>
              <a href="https://github.com/clomie/clomie.dev" target="_blank">
                GitHub - clomie/clomie.dev
              </a>
            </dt>
            <dd>このウェブサイトのソースコードを公開しています</dd>
          </dl>
        </section>
      </main>
    </DefaultLayout>
  )
}
