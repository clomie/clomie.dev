---
title: ウェブサイトの実装を変えた
---
今までは nuxt/content を使って生成していたが、自前で実装したスクリプトに[移行](https://github.com/clomie/clomie.dev/commit/634622e2daf1c770149faaebe0918ca72885dc62)した。

簡素なサイトなので JavaScript を入れたくない。出力される HTML をすべて制御してもっと簡素にしたい。ソースを表示したときに整形されたコードが見えてほしい。あたりが理由。

markdown で書いて、簡素な生成スクリプトで、内容を表示するだけのHTMLを出力できれば十分だった。いろいろ考えたけど、 TypeScript を使って JSX をテンプレートエンジンにして、 preact でレンダリングすることにした。 XML もゆるい型定義をしてあげると特に違和感なく生成されるので、フィードも JSX で生成できた。 markdown のパースからページの生成は nuxt/content を参考に remark, rehype を利用している。

テンプレートエンジンとしての JSX は、とても使い心地が良い。普段使っている VSCode ならほとんどセットアップ不要で整形や補完ができる。テンプレートファイルを読み込む手間もない。コンポーネント分割もただ関数に分離するだけ。実行に ts-node を使えばトランスパイルから実行まで1コマンドで済むのも良い。

```
import { h, VNode } from 'preact'
import renderToString from 'preact-render-to-string'

const Layout = ({ title, children }: { title: string; children: VNode }) => (
  <html>
    <head>
      <title>{title}</title>
    </head>
    <body>{children}</body>
  </html>
)
const Page = (
  <Layout title="hello">
    <h1>Hello, world!</h1>
  </Layout>
)

console.log('<!DOCTYPE html>' + renderToString(Page))
```

```
% npx ts-node hoge.tsx
<!DOCTYPE html><html><head><title>hello</title></head><body><h1>Hello, world!</h1></body></html>
```

もっと色々やっているけど、基本的にはこういうことをやっているだけ。

結果として、ほとんど満足いく感じになった。ライブラリの都合による要素や属性は出力されなくなった。 meta や link など空要素のタグが self-closing な形で出てきてしまう点は少し気持ち悪く感じていたけど、 [HTML Living Standard の開始タグの項](https://html.spec.whatwg.org/multipage/syntax.html#start-tags) を見ると許容されているので私も許容することにした。 XML の CDATA セクションを JSX できれいに扱う方法は見つからなかったが、 Atom フィードを作る上で必ずしも CDATA セクションを使う必要はないことがわかった。 DOCTYPE 宣言は出力してくれないようなので、ただの文字列でくっつけている。

Github Actions のビルド時間も半分以下の30秒ぐらいになった。エコ。

フロントエンド周りはこれまで Vue.js ばかりで React には縁がなく、 JSX を触るのは初めてだった。今回 JSX を触る機会が出来てよかったと思う。

1つだけ困ったことがあり、解決していないので書き残しておく。このウェブサイトでは記事の投稿時刻と更新時刻に元となる markdown ファイルの git のコミット履歴を利用している。このせいで、記事のフォルダを移動したり名前を変更すると、すべての記事の更新時刻が更新されてしまう。今回は markdown ファイルの場所は現状維持で乗り切ったけど、あまりこういう縛りを作りたくない。どうにかしたいけどあまり良い方法が思い浮かばないのでいったん忘れることにする。
