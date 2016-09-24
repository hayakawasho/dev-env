# フロント開発環境

## Dependence

- [NodeJS](https://nodejs.org/) 4.0以上
- [Gulp](http://gulpjs.com/) 3.9以上

## 構成

```
<root>
config.js           - gulp設定ファイル
gulpfile.js         - gulpファイル
node_modules/       - npmパッケージ
package.json        - npmパッケージ設定ファイル
public/             - ビルドファイルのドキュメントルート
README.md
src/                - 開発用フォルダ
styleguide/         - スタイルガイドフォルダ  
tasks/              - gulpタスクファイル郡
webpack.config.js   - WebPack設定ファイル
wiki/               - README補足
┗ *.md
```

## Get Started

### 準備

任意のディレクトリで以下のコマンドを実行します。

```
npm run start
```

### 全体をビルド

すべてのファイルをビルドします。開発を始める前に必ず一度はビルドしましょう。

```
gulp build
```

### ファイル監視の実行 & サーバー起動

以下のコマンドを実行するとブラウザで開発中のページが開きます。

```
# ディレクトリを監視
gulp

# 指定ディレクトリを監視
gulp -sp
```

### サーバーのみ起動

ビルドや監視が不要でサーバーのみ起動したい場合は以下のコマンドを使用します。

```
# サーバー起動
gulp server

# 指定ディレクトリでサーバー起動
gulp server -sp
```

### スタイルガイド生成の実行/起動

```
gulp styleguide
```

### リリースファイル作成

ひと通りの開発が完了した時点で、リリース用のファイルを作成します。

```
gulp production
```
