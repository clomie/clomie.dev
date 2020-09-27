---
title: "フィード、@nuxt/content のライブ編集"
---
ウェブサイトに RSS 用の Atom フィードを設置した。 @nuxtjs/feed を使えば簡単だった。いつも思うけど Atom と RSS2.0 はどっちで公開するのが良いのだろうか。両方あれば良いのだろうとは思うが、片方だけでどういうときに困るかがあまり思いつかない。

----

@nuxt/content のライブ編集が体験が良いと書いておきながら、IME の変換候補を Tab キーで選択すると変な挙動をするのに気づいたので使っていなかった。自分が IME の変換候補を Tab キーで選択していることに初めて気づいた。

修正できないかと思って調べたところ IME を使った文字編集には [compositionStart](https://developer.mozilla.org/ja/docs/Web/API/Element/compositionstart_event)などのイベントが発生するようだった。このイベントを使って確定するまでは Tab キーのハンドリングをしないように修正して Pull Request を投げてみた。
