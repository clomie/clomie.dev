---
title: 2020年振り返り
---

2020年の振り返り。

## ねこ

増えた。黒いのが前からいたほう。茶色いのが2月に来たほう。

![](/images/20210102-cats.jpg)

## キーボードなど

1月は [実践: キースイッチのカスタマイズ \- xe\-note](https://xery.hatenablog.com/entry/2019/12/18/060000) の記事に影響を受けて、静音タクタイルスイッチのカスタマイズにハマっていた。Gateron Blue Ink のハウジング、Zilent V2 のステム、Sprint 60S Slow でスイッチを組み立てた。結構気に入っていて、次のキーボードを作るまでしばらく使っていた。

![](/images/20210102-topazstarstone.jpg)

2月頃から Angelina68i の設計を始めて、8月ごろに完成した。当時はまだこのウェブサイトを作っていなかったので、詳細と経緯を [Scrapbox に書いている](https://scrapbox.io/clomie/%E5%B7%A6%E5%8F%B3%E5%88%86%E9%9B%A2%E4%B8%80%E4%BD%93%E5%9E%8B%E3%82%AD%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89_Angelina68i_%E3%82%92%E4%BD%9C%E3%81%A3%E3%81%9F)。いまもこのセットアップのまま使っている。その後は2本ほどUSBコイルケーブルを自作した。

![](/images/20210102-angelina68i.jpg)

## 技術系

9月末にこのウェブサイトを作った。

最初は Nuxt.js + nuxt/content で作ったあと、SSG だけがやりたくて preact + JSX を使った自前のコードに移行した。今は preact も外して、JSX のレンダリングを自作のライブラリでやっている。

ウェブサイトを作る過程で、nuxt/content と preact-render-to-string へ Pull Request を出す機会があった。JSX をちゃんと理解する良い機会になったし、npm モジュールを作って公開する機会にもなった。

----

YouTube 配信の技術イベントが多くなり、家で配信を聞くようになった。フロントエンドと、コンテナ周辺の技術を中心に聞いている。

特に [Front-End Study](https://forkwell.connpass.com/event/190313/) は興味深い内容が多くて、次回以降も楽しみにしている。

----

仕事の話。

上半期は、2019年の終盤からオンプレで動いている Web アプリを、GCP へ移行するついでにコンテナ化して実行基盤も Kubernetes (GKE) に移行する仕事をしていて、そのリリースがあった。

結局いろいろあって本番環境はコンテナ化を諦めることになったものの、Cloud NAT しかない状態のプロジェクトから GKE はじめインフラ構築部分に触れることができた。ロードバランサーのバックエンドインスタンス数が原因でセッションアフィニティがうまく動かなかったことが、特に記憶に残っている。インスタンス数をゾーン数の倍数にする必要があることに気付かず、本番リリース当日に動作不良でロールバックする結果となった。他にも Circle CI, Github Actions といった CI ツールや、Kustomize を使った開発環境の yaml 管理などいろいろやった。

下半期は、別のプロジェクトで AWS を使って開発していた。PoC だったこともあり、いろいろ新しいことを試した。10個以上のコンテナがひとまとめになった ECS タスクを分割したり、Java + Spring Boot で作られたマイクロサービスを TypeScript を使った Lambda に置き換えたりなど。

振り返ると GCP と AWS に初めて触れる機会が多かった。2019年まではオンプレが主だったり、AWS を使っていても管理コンソールに触れることはほとんどなかったのに対して、急にいろいろ触るようになった印象がある。これだけ触っていても Terraform に手を出していないのが惜しい。

2019年までは Java, JavaScript を中心にフロントエンドも多少できるバックエンドエンジニア、みたいなポジションで仕事してきたけど、2020年はほとんど Java を使っていない。Kubernetes のマニフェストや Cloud Formation のための yaml を触っている時間が一番多くて、あとは Lambda を書くのに TypeScript を使っていた。その他は設計してたりそういう時間が多かった。

## その他

自宅で仕事をするようになり、デスク周りの環境を整えた。

- [Amazon ベーシックのモニターアーム2本](https://www.amazon.co.jp/dp/B07PY4TX8B)
- [上海問屋のノートPCトレイ](https://www.dospara.co.jp/5shopping/detail_parts.php?ic=444377&lf=0)
- 27インチの WQHD モニタ [PD2705Q](https://www.amazon.co.jp/dp/B08C9SZP4T/)
- [Z-999B](https://www.yamada-shomei.co.jp/search/detail.php?code=Z999B) (もらいもの)
- [Milkshake Deskpad (Monochrome)](https://novelkeys.xyz/products/milkshake-deskpad)
- MacBook Pro (16-inch, 2019)

夏に備えて自宅の全室にエアコンを設置したり、冬に備えて各部屋用の石油ファンヒーターを買ったり、家の設備を整えたことも印象深い。
