# 開発環境構築
## Feature
- テンプレートエンジン（EJS）
- SASS
- ES2015
- スプライト画像の作成とSassファイルの出力
- JS/CSSの圧縮と最適化
- CSSのベンダープレフィックス付与自動化
- LiveReload
- HTMLHint
- ESLint
- スタイルガイド生成
- JS/CSSソースマップ

## Dependence
- [NodeJS](https://nodejs.org/)
- [Gulp](http://gulpjs.com/)

```
npm i -g gulp
```

 エラーが出たら `sudo` をつける

## 構成

```
package.json - npmパッケージ設定ファイル
config.js - gulpの設定ファイル
webpack.config.js - WebPackの設定ファイル
gulpfile.js - gulpファイル
Overview.md - sc5-styleguideのOverviewファイル
/tasks - gulpのタスクファイル
/src
  ┣ /dev - 開発用フォルダ
  ┣ /public  - コンパイルされたデータフォルダ
  ┣ /styleguide   - スタイルガイドフォルダ ※chromeのローカルでは見えない
  ┗ /templates - テンプレートファイルフォルダ
    ┗ sprite.ejs - スプライト画像用テンプレート
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
# ディレクトリを監視(src/dev)
gulp

# 指定ディレクトリを監視（src/dev/spディレクトリを監視する例)
gulp -sp
```

### スプライト画像生成
複数の画像をタイル上に１枚の画像にするスプライトを自動的に生成します。images/spites以下のディレクトリごとにスプライト画像とsassファイルを出力

```
# スプライト生成
gulp sprite

# 指定ディレクトリのスプライト生成
gulp sprite -sp
```

#### 例

```
images/sprites/icon/icon-twitter.png
images/sprites/icon/icon-twitter.png
```

↓ `gulp sprite`

```
images/sprites/icon.png
sass/sprites/_icon.scss
```

スプライト画像は`images/sprites/*.png`に、sassは`sass/sprites/_*.scss`に展開されるので、作られたsassを`@import`して使用します。

#### Retinaディスプレイ用スプライト生成
ディレクトリ名の末尾を`-2x`にすることで自動的にsass上でサイズを1/2して表示されるようになります。

```
images/sprites/icon-2x/icon-twitter.png
images/sprites/icon-2x/icon-twitter.png
```

### サーバーのみ起動
ビルドや監視が不要でサーバーのみ起動したい場合は以下のコマンドを使用します。

```
# サーバー起動
gulp server

# 指定ディレクトリでサーバー起動
gulp server -sp
```

### スタイルガイドの実行

#### options
```
styleguide -s <source_path> -o <output_path> [-c <config_file>] [--server] [--watch]
```
- -s, --source:コンパイルしたいCSSを指定
- -o, --output:スタイルガイドのアウトプットパスを指定
- -c, --config:JSONのconfigファイルを使う場合に指定
- --server:ローカルサーバー起動
- --port:サーバーのポート番号指定
- --watch:ファイルを監視して変更があればスタイルガイドを更新する（サーバー起動必須）

### リリースファイル作成
ひと通りの開発が完了した時点で、リリース用のファイルを作成します。

```
gulp production
```
