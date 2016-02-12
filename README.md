## 開発環境構築

### Feature
- テンプレートエンジン（EJS）
- SASS
- スプライト画像の作成とSassファイルの出力
- JS/CSSの圧縮と最適化
- CSSのベンダープレフィックス付与自動化
- LiveReload
- スタイルガイド生成
- JS/CSSソースマップ

### Dependence
* [NodeJS](https://nodejs.org/)
* [Gulp](http://gulpjs.com/)
* [styledocco](https://www.npmjs.com/package/gulp-styledocco)
```
npm i -g gulp
npm install -g styledocco
```
エラーが出たら `sudo` をつける

### 構成
```
package.json - npmパッケージ設定ファイル
config.js - テンプレートの設定ファイル。出力先やgulpの設定を変更できる
webpack.config.js - WebPackの設定ファイル
gulpfile.js - gulpファイル
/tasks - gulpのタスクファイル
/src
  ┣ /dev - 開発用フォルダ
  ┣ /public  - コンパイルされたデータフォルダ
  ┣ /styleguide   - スタイルガイドフォルダ
  ┗ /templates - テンプレートファイルフォルダ
    ┗ sprite.ejs - スプライト画像用テンプレート
```

### Get Started

#### 準備
任意のディレクトリで以下のコマンドを実行します。
```
npm run start
```

#### 全体をビルド
すべてのファイルをビルドします。開発を始める前に必ず一度はビルドしましょう。
```
gulp build
```

#### ファイル監視の実行 & サーバー起動
以下のコマンドを実行するとブラウザで開発中のページが開きます。
```
# ディレクトリを監視(src/dev)
gulp

# 指定ディレクトリを監視（src/dev/spディレクトリを監視する例)
gulp -sp
```

#### スプライト画像生成
複数の画像をタイル上に１枚の画像にするスプライトを自動的に生成します。images/spites以下のディレクトリごとにスプライト画像とsassファイルを出力
```
# スプライト生成
gulp sprite

# 指定ディレクトリのスプライト生成
gulp sprite -sp
```

##### 例
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

##### Retinaディスプレイ用スプライト生成
ディレクトリ名の末尾を`-2x`にすることで自動的にsass上でサイズを1/2して表示されるようになります。
```
images/sprites/icon-2x/icon-twitter.png
images/sprites/icon-2x/icon-twitter.png
```

#### サーバーのみ起動
ビルドや監視が不要でサーバーのみ起動したい場合は以下のコマンドを使用します。
```
# サーバー起動
gulp server

# 指定ディレクトリでサーバー起動
gulp server -sp
```

#### リリースファイル作成
ひと通りの開発が完了した時点で、リリース用のファイルを作成します。
```
gulp production
```

## コーディングルール

### CSS構成案


### セレクタの指定
原則、スタイルをあてる際は子孫セレクタ指定・ID指定は避け、クラス指定でコーディングしてください。
※ただし、`.foo > li`のような子セレクタ指定、`:hover`などの類似クラス、`:before`などの擬似要素による指定は可能とします。

### CSSルール
- クラス名は意味がわからないほど省略しないこと
- 原則、IDセレクタ使用の際はJavascriptのフックとすること
- `js-`プレフィックスをつけたクラスには原則スタイルを当てないようにしてください。　※ただしJavascript挙動のために必要なスタイルは除く
