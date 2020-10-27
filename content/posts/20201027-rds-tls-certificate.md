---
title: node-mysql2 モジュールと Amazon RDS の証明書
---
[node-mysql2](https://github.com/sidorares/node-mysql2) モジュールに RDS の証明書が組み込まれていて驚いた話。

さいきん仕事で Lambda から RDS(Aurora/MySQL) を使うアプリを書いている。IAM 認証を使っていて、DB 接続には SSL/TLS 証明書が必要なのだけど、普段書いている Node.js の場合は証明書の存在をそこまで気にすることがなかった。

Node.js の RDS に接続するコードはいつもこんな感じ。

```
const connectionConfig = {
    host,
    user,
    database,
    ssl: 'Amazon RDS',
    authPlugins: { mysql_clear_password: () => () => authToken }
};
```

おそらく `ssl: 'Amazon RDS'` の部分で指定した名前の SSL 証明書が Lambda の Node.js コンテナランタイムにプリインストールされた中から良い感じに選択されているのだろう、なんて特に根拠もなく都合の良い解釈をしていた。RDS Proxy の場合は直接 RDS に接続する場合と必要な証明書が違うので、実際に使われている証明書がどこにある何なのかを調べてみようとしたこともあったけど、動かしたら動いてしまったのもあり、そのうち忘れてしまっていた。

ところが Python や Golang で同じく RDS に SSL/TLS で接続しようとすると、証明書をファイルとしてビルド時にアーカイブに含めたり、ソースコードに埋め込む必要が出てきたりする。

Node.js だけ証明書が必要ないのは何故か気になって改めて調べてみると、node-mysql2 モジュールに証明書そのものが組み込まれている含まれていることがわかった。node-mysql2 モジュールはあくまで MySQL ドライバだと思っていたので、これは意外に感じる。

https://github.com/sidorares/node-mysql2/blob/v2.2.5/lib/constants/ssl_profiles.js

RDS の証明書は去年から今年のはじめにかけてローテーションがあって、それまで使われていた証明書が使えなくなっている。5年周期のようなので次は2024年だけど、その際は証明書の更新ではなくモジュールそのものを更新することになるのだろう。
