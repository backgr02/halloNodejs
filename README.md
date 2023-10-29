# AWS Lambda (Node.js 18) 上で [misskey.js] を動かすサンプルコード

Node.js の開発経験は無いけれど、色々試していたら動いた。その作業メモです。間違っていたら、ごめんなさい。

## 開発環境

- Ubuntu 20.04
    - 実際には、 Windows 10 の WSL2 を使用した。
- npm 6.14.4
- aws-cli 1.18.69

## Lambda レイヤーの作成

1. `npm install --production` コマンドで、 `node_modules` ディレクトリを作成。
1. `node_modules/misskey-js/package.json` へ `"type": "module"` を追記。
1. `mkdir nodejs && cp -a node_modules nodejs/ && zip -r layer.zip nodejs && rm -rf nodejs` コマンドで、 [misskey.js] 0.0.16 を含む `layer.zip` ファイルを作成
1. [AWS マネジメントコンソール] から、 `misskey-js` レイヤーを作成。
1. `layer.zip` ファイルをアップロード

## Lambda 関数の作成

1. [AWS マネジメントコンソール] から、 `halloNodejs` 関数を作成。
1. `halloNodejs` 関数の設定から、下記の環境変数を設定。
    - キー： MISSKEY_URI / 値：（例） https://misskey.test
    - キー： MISSKEY_TOKEN / 値：（例） TOKEN
1. `./deploy.sh` スクリプトを実行して、デプロイ。
1. `aws lambda invoke --function-name halloNodejs /dev/stdout` コマンドで実行。
    - [meta] API が正常に実行されれば、 Misskey サーバー情報が取得できます。

[misskey.js]: https://github.com/misskey-dev/misskey.js
[AWS マネジメントコンソール]: https://ap-northeast-1.console.aws.amazon.com/lambda/home?region=ap-northeast-1#/discover
[meta]: https://misskey-hub.net/docs/api/endpoints/meta.html
