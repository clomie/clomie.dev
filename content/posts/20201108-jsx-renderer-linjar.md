---
title: linjar
---
JSX を HTML や XML を生成するテンプレートエンジンとして使うための npm モジュール [linjar](https://github.com/clomie/linjar) を作った。

先月末に [ウェブサイトの実装を変えた](/posts/20201028-website-ssg) でも書いたが、 [preact](https://github.com/preactjs/preact) と [preact-render-to-string](https://github.com/preactjs/preact-render-to-string) を使ってこのウェブサイトの HTML やフィードの XML を生成していた。

preact は十分小さいライブラリだと思うけど、ただのテンプレートエンジンとして使うだけなら diff などの仮想 DOM としての機能やライフサイクルフックは不要になる。最初からテンプレートエンジンとして作るならもっと削れるはず、というのが主な動機になっている。

実装は preact をもちろん参考にしたが、 `h` 関数で `VNode` を作るところまでの型定義は少し悩ましい部分が多かった。この部分は [Deno 向けの JSX Renderer の実装](https://github.com/syumai/deno-libs/blob/master/jsx/renderer.ts)がとても参考になった。

最低限必要な機能はひと通り実装した。 1.0.0 を publish してから実際に使ってみたら少しバグっていて、既に2回もパッチバージョンを上げてしまった。最初は 0.0.x でリリースすれば良かったかもしれない。

npm モジュールを作るのは初めてだったけど、ハードルがとても低い。ライブラリ名さえ決まれば、 npmjs.com にアカウントを作って `npm publish` コマンドを打てばすぐに公開できてしまう。公開にあたっては [TypeScript で npm パッケージを作る \- 30歳からのプログラミング](https://numb86-tech.hatenablog.com/entry/2019/06/28/220736) がとても参考になった。

既にこのウェブサイトの生成も linjar を使った実装に置き換えたので、あとはドッグフーディングしながらやっていきたい。とりあえず ES Modules 周りを雰囲気で使っているので、これを機にちゃんと理解したいと思っている。
