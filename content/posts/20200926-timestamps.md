---
title: 投稿時刻を直した
---
昨日2つめのエントリを公開してから気づいたのだけど、投稿時刻がズレてしまっていたのを直した。

投稿時刻には @nuxt/content の document プロパティの createdAt を使っていて、これは単にファイルの作成時刻が反映されている。このウェブサイトは Github Action でビルドしていて、毎回 `git clone` されている。git はファイルの作成時刻を復元しないので、全エントリの投稿時刻がビルド時間になってしまった。

@nuxt/content の `content:file:beforeInsert` フックで git のコミット時刻を createdAt, updatedAt に[反映するようにした](https://github.com/clomie/clomie.dev/commit/9e62e363fa1035d8f5db1474014d068f1ab8323f)。Github Actions の actions/checkout はデフォルトで shallow clone なので、そのままだと最新のコミットログしか拾えないので `fetch-depth: 0` を設定して deep clone に[変更した](https://github.com/clomie/clomie.dev/commit/66b6afa446d6ac8fa673c10ac443be790ca0e115)。

他に思いついてやめた直し方を書き残しておく。markdown の front-matter に投稿時刻を入れるのがシンプルかなと思ったけど、時間や更新時刻のことを考えると面倒に感じてやめた。シェルスクリプトで touch コマンド使ってファイルのタイムスタンプをいじることも考えたけど、ファイル作成時刻は変更できないようだ。
