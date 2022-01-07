---
title: Cloud Pub/Sub のエミュレータを docker-compose で扱う
---

仕事で Cloud Pub/Sub を使っている。

Google Cloud の非オープンソースなマネージドサービスはローカルでも開発が進められるようにエミュレータが用意されているものがある。[Cloud Pub/Sub のエミュレータ](https://cloud.google.com/pubsub/docs/emulator)も Cloud SDK の追加コンポーネントとして用意されている。ただ、以下の点で少々使いづらい。

- トピックやサブスクリプションの設定はエミュレータの起動後に行う必要がある
- トピックやサブスクリプションの設定はクライアント SDK からのみ実行できる

ローカル開発環境を用意するにあたっては docker-compose を使っている。上の使いづらさを踏まえて良い感じに扱いたくて少し頭をひねった結果、良さそうな方法を見つけたので備忘として残しておく。

以下の docker-compose.yaml を用意する。

```
version: '3'

services:
  pubsub-emulator:
    image: google/cloud-sdk:latest
    command: gcloud beta emulators pubsub start --project=dummy --host-port=0.0.0.0:8085
    init: true
    ports:
      - '8085:8085'
  pubsub-setup:
    build: ./pubsub-setup
    environment:
      - PUBSUB_EMULATOR_HOST=pubsub-emulator:8085
      - PUBSUB_PROJECT_ID=dummy
    depends_on:
      - pubsub-emulator
```

エミュレータのコンテナに加えて、エミュレータに対してトピックやサブスクリプションを SDK 経由でセットアップする処理を別のコンテナで実行する。`depends_on`の設定により、エミュレータの起動を待ってからセットアップ実行用のコンテナが起動し、セットアップが済んだら自動的に停止する。

セットアップ用コンテナの Dockerfile は以下の内容。

```
FROM python:3

RUN git clone --depth 1 https://github.com/googleapis/python-pubsub.git
WORKDIR python-pubsub/samples/snippets
RUN pip install -r requirements.txt

COPY setup.sh .
CMD ./setup.sh
```

セットアップ処理は[公式ドキュメント](https://cloud.google.com/pubsub/docs/emulator#using_the_emulator)で触れられているものと同じで、Python 向けクライアントライブラリのリポジトリにあるサンプル実装を利用する。python ベースイメージにクライアントライブラリのリポジトリを clone して利用している。

コンテナ実行時に呼び出しているスクリプト `setup.sh` は以下のような内容になる。

```
#!/bin/bash

python publisher.py dummy create hoge-topic
python subscriber.py dummy create hoge-topic hoge-subscription-pull
python subscriber.py dummy create-push hoge-topic hoge-subscription-push http://localhost:8080/subscription
```

あとは好きなだけトピックやサブスクリプションを増やせば良い。
