---
title: ts-node で ES Modules を使う
---

このウェブサイトを ES Modules (ESM) 形式に対応させた。

ウェブサイト上では JavaScript を使っていないが、markdown で書いたテキストから各ページをビルドするのに TypeScript で書いたコードを ts-node で起動して使っている。これまでは Common JS を使っていたけど、使っているライブラリのいくつかが ESM 形式のみを配布するようになりメジャーバージョンアップできなくなっていたので、ES Modules に対応させた。

ts-node で ESM を扱うために必要なことは、[この issue](https://github.com/TypeStrong/ts-node/issues/1007) にまとまっている。tsconfig.json と package.json, ビルドスクリプトをここに書いてあるとおり修正すれば ESM ライブラリをちゃんと認識できるようになる。

他にも対応が必要だった点を備忘として残しておく。prettier が提供する `format` 関数を import 時に分割代入していたがエラーとなった。理由は深く追えていないけど、`modules.exports` にオブジェクトをまとめて export しているからとか、export されている namespace に入ってるからとかその辺りだろうと思う。 @prettier/plugin-xml は型定義がないので以前は `require` 関数で import していたが、ESM には `require` 関数自体がない。これは型定義に module 宣言を追加して import に書き換えることで解決した。

対応したコミットは[これ](https://github.com/clomie/clomie.dev/pull/61/commits/ccdf55e2c3e70c3f94cfeed59f8d5cbdc9a9f9fd)。
