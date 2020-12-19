---
title: MacBook Pro、Big Sur と Day-O
---

MacBook Pro (16-inch, 2019) を買った。

![MacBook Pro](/images/20201219-macbookpro.jpg)

これまで MacBook Air (13-inch, 2013) を使っていた。近頃はキーボードの文字入力を取りこぼすほどだった。もともと2014年にとある勉強会にLT登壇するために買った記憶があるので、もう6年以上は使っていたようだ。

起動してまず初めに Big Sur にアップデートした。Catalina より全体的に見た目に丸くなってかわいくなった印象がある。なんとなく Mac はいつでも初期化できるようにしておきたい気持ちがあって、最低限のセットアップは Scrapbox に[書いておくことにした](https://scrapbox.io/clomie/Mac%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97)。主にトラックパッドの"3本指のドラッグ"の設定を探してしまうのを防ぐ目的がある。

ついでに [dotfiles のリポジトリ](https://github.com/clomie/dotfiles)も少し整理した。気づいたときにアップデートしているけど、溜まりがち。.zshrc の関数周りはもう少し整理したい気がする。作ったときは使うもののしばらく使わない時期があるとすぐに用意したことすら忘れてしまう。

-----

メニューバーに常駐するアプリとして [Day-O](https://shauninman.com/archive/2020/04/08/day_o_mac_menu_bar_clock_for_catalina) を使っている。任意のフォーマットで現在日時を表示してくれるアプリで、クリックするとシンプルなカレンダーを表示してくれる。ちょうど Windows のタスクバーにある時計のような使い勝手になる。

現時点でまだ Big Sur に対応しておらず、動作はするものの設定画面が開かないという問題があった。設定画面が開かないだけで動くのなら設定ファイルを直接編集してしまえば良い。こういうとき Windows なら `%USERPROFILE%\AppData` かレジストリかな、とすぐに思いつくのだけど Mac も触り始めて長いのにあまりパッと思い浮かばない。結局 "Mac レジストリ" とかで調べた。アプリの設定は `~/Library/Preferences` ディレクトリの中にある、アプリごとの plist ファイルに書き込まれている。plist ファイルはバイナリだったりするのだけど、`plutil` コマンドを使って中身を見たり編集ができる。参考: [コマンドラインでplistを操作（データ追加・編集・削除） \- Qiita](https://qiita.com/trakwkbys/items/a94c4d43342e96352bde)

他の Big Sur でない端末で動いている Day-O の plist ファイルを参考にコマンドを実行した。すぐには反映されなかったが、Mac を再起動すると反映された。

```
% cd ~/Library/Preferences
% plutil -insert showIcon -integer 0 com.shauninman.Day-O.plist
% plutil -insert format -string "yyyy/MM/dd E HH:mm" com.shauninman.Day-O.plist
% plutil -p com.shauninman.Day-O.plist
{
  "firstRun" => 0
  "format" => "yyyy/MM/dd E HH:mm"
  "NSStatusItem Preferred Position Item-0" => 306.5
  "showIcon" => 0
}
```

Day-O が現在日時を表示してくれるので Mac デフォルトの時刻表示は必要ない。非表示にしたかったのだけど、どうやら Big Sur から完全に非表示にはできなくなったようだ。仕方ないので一番小さく表示されるアナログ表示にしてお茶を濁している。
