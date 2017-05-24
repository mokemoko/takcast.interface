# takcast.interface

# 作者

taktod
https://twitter.com/taktod
poepoemix@hotmail.com

# 概要

electronで作ってみる配信ツールのtakcastのpluginが利用するinterface定義

# takcastとは

electronをつかって作ってみる、映像や音声を合成して配信するツール
もとネタは、勤めてる会社にopenGLによる映像の合成の有用性を示すためにつくったプログラム
せっかくなので公開してみようと思います。

# 構成

pluginの形でいろいろな機能が追加できるような感じでやってみたいと思っています。

## pluginについて

@takcast/xxxという名前でnpm installされたプラグインが自動的に取り込まれて
takcast本体の動作を拡張していく
というのを想定しています。

プラグインの形は次のようになります。

```
@takcast/xxx
- node/index.js
\ render/index.js
```

node/index.jsはnodeプロセス側から呼ばれる動作でIPluginの形
render/index.jsはrenderプロセス側から呼ばれる動作でそれぞれのpluginの形で定義する

という具合

## basePlugin

AudioContextみたいに、大量に作成できないオブジェクトを管理するplugin
singletonみたいな使い方をする
いまのところ共通AudioContextの作成と、出力につなぐけど音声出力に参加させたくない
AudioNodeの作成を行うことにしてる。
本体が１つ管理すればよいものなので、追加pluginにしてはいけないやつ

## fieldPlugin

GUIの配置とかを管理するplugin
これもbasePluginと同じく、ツール本体が持ってればいいと思う。
仮に独自なものを作りたいならtakcastをfolkして使えばいいはず。

映像音声の選択等の処理を行うmediaFieldPluginと
出力まわりの処理を行うoutputFieldPlugin
の２つを作る予定

## mediaPlugin

音声や映像の合成を実施するplugin
とりあえずはdefaultPluginというthree.jsをつかって任意の場所に任意の大きさ・回転した映像を貼り付ける
ことができるものを１つ作る予定

あとで魚眼レンズを利用した180度動画の動作テストつくったりもしたいと思ってます。
opencvを利用して、いろいろやった映像を作るというのも面白そう。

## sourcePlugin

映像や音声の元となるsourceを管理するplugin
手元だと、音声ファイル、動画ファイル、カメラキャプチャ、マイクキャプチャ
前のプログラムだと、画像ファイル、デスクトップキャプチャ、webRTCのリモート映像等扱ってみたことがあります。

## outputPlugin

mediaでつくった映像・音声を何らかの形で出力するplugin
今の所webmの形でファイルに保存する動作ができてる。
前のプログラムだと、作成したwebmデータをそのままwebsocketで特定のサーバーに送信したり
webrtcの接続クライアントに映像として送りつけたりしてました。
今回はttLibJsGyp2の方がwindowsでも利用可能なrtmpの動作つくってあるので
rtmpで配信するのが１つの目標になってます。
