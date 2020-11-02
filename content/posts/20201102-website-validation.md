---
title: Atomフィード、W3Cのバリデータ
---
ウェブサイトの Atom フィードに投稿の内容を含めるようにしたり、より valid な出力に修正した。

チェックには [W3C Feed Validation Service](https://validator.w3.org/feed/) を使った。 URL を入力するか、 XML の内容を直接入力すると Atom の仕様に合っているかどうか判定してくれる。[現在の結果](https://validator.w3.org/feed/check.cgi?url=https%3A%2F%2Fclomie.dev%2Ffeed.xml)。

直していて気付いたけど、自分は RSS や Atom を、ウェブサイトを RSS リーダーに登録するためのインターフェースのようなものだと捉えていて、最低限タイトルとリンクさえ提供されていれば良いと思っていた。実際はフィードはコンテンツを配信するためのもので、記事の内容を含めて然るべきだった。

RSS リーダーは Slack に専用のワークスペースを作って使っている。使い始めてから昼間は通知させていたけど、最近通知を切ってみたら見る頻度が落ちてけっこう溜まるようになってしまった。登録したフィードの1日分の更新をまとめて1ページにしてくれるようなサービスがあれば、そういうほうが自分には合っているかもしれない。

[W3C Markup Validator](https://validator.w3.org/) というのもあって、 HTML の正当性を検証してくれる。これも試してみたらいくつか警告が出ていたので修正した。 section 要素があるのに heading 要素がないとか、 h1 要素が ページに複数あるとか、主にそういう感じのメッセージだった。

----

この間の preact-render-to-string への [Pull Request](https://github.com/preactjs/preact-render-to-string/pull/174) は無事取り込まれた。よかった。
