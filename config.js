'use strict';
/**
 * タスク設定ファイル
 */
const DEV = 'app/dev',
	PUBLIC = 'app/public',
	ASSETS = '/assets',
	ROOT = '';
module.exports = {
	// 出力先ディレクトリ
	dist: PUBLIC + ROOT + '/%type%',
	// gulpコマンドでデフォルトで監視するディレクトリ
	defaultPath: 'pc',
	// htmlhintの設定
	htmlhint: '.htmlhintrc',
	// CSSの設定
	style: {
		// node-sass(https://github.com/sass/node-sass#options)
		sass: {
			outputStyle: 'expanded'
		},
		// autoPrefixer(https://github.com/postcss/autoprefixer#options)
		autoprefixer: {
			browsers: ['last 3 version', 'ie >= 9', 'Android 4.0'],
			ignore: []
		},
		// css-mqpacker(https://github.com/hail2u/node-css-mqpacker#options)
		mqpacker: {}
	},
	// スタイルガイドの設定 sc5-styleguide(https://github.com/SC5/sc5-styleguide)
	styleguide: {
		out: 'app/styleguide/%type%',
		name: 'test',
		server: true,
		port: 5001,
		//rootPath: '',
		overviewPath: 'Overview.md', //Overviewファイルの場所を指定
		errLogToConsole: true
	},
	// Sprite生成設定
	sprite: {
		// スプライトにする画像の拡張子
		extension: '.png',
		// 生成するスプライトの拡張子
		imgExtension: '.png',
		// 生成するcssファイルの拡張子
		cssExtension: '.scss',
		// 細かいオプション
		options: {
			// 生成するcssのテンプレート
			cssTemplate: 'app/templates/sprite.ejs',
			// スプライト配置アルゴリズム
			algorithm: 'binary-tree',
			// スプライト画像の間隔
			padding: 6,
			// 出力cssの詳細オプション
			cssOpts: {
				// スプライト生成用のmixinは書き出さない
				functions: false
			}
		}
	},
	// サーバー設定 BrowserSync(http://www.browsersync.io/docs/options/)
	server: {
		// サーバーの同期オプション
		ghostMode: {
			clicks: false,
			location: false,
			forms: false,
			scroll: false
		}
	},
	// パス設定
	path: {
		html: {
			src: PUBLIC + ROOT + '/%type%/**/*.html'
		},
		ejs: {
			src: [DEV + ROOT + '/%type%/view/**/*.ejs', '!' + DEV + '/%type%/view/**/_*.ejs'],
			watch: [DEV + ROOT + '/%type%/view/**/*.ejs'],
			dest: PUBLIC + ROOT + '/%type%'
		},
		// json: jsonによるhtml生成
		json: {
			data: DEV + ROOT + '/%type%' + ASSETS + '/data/data.json', // 設定用JSONファイル
			src: 'app/templates/json.ejs', // テンプレート用EJSファイル
			dest: PUBLIC + ROOT + '/%type%'
		},
		// スタイル関連
		style: {
			src: [DEV + ROOT + '/%type%' + ASSETS + '/sass/**/*.scss', '!' + DEV + ROOT + '/%type%' + ASSETS + '/sass/**/_*.scss'],
			watch: [DEV + ROOT + '/%type%' + ASSETS + '/sass/**/*.scss'],
			dest: PUBLIC + ROOT + '/%type%' + ASSETS + '/css'
		},
		// スプライト: スプライト画像生成
		sprite: {
			src: DEV + ROOT + '/%type%' + ASSETS + '/sprites/*',
			watch: DEV + ROOT + '/%type%' + ASSETS + '/sprites/**/*',
			imagePath: '../../img',
			imageDest: PUBLIC + ROOT + '/%type%' + ASSETS + '/img',
			cssDest: DEV + ROOT + '/%type%' + ASSETS + '/sass/sprites'
		},
		images: {
			src: [DEV + ROOT + '/%type%' + ASSETS + '/img/**/*.+(jpg|jpeg|png|gif|svg)'],
			dest: PUBLIC + ROOT + '/%type%' + ASSETS + '/img'
		},
		// Javascript
		js: {
			src: [DEV + ROOT + '/%type%' + ASSETS + '/js/*.js', '!' + DEV + '/%type%' + ASSETS + '/js/_*.js'],
			dest: PUBLIC + ROOT + '/%type%' + ASSETS + '/js'
		},
		// 複製: copy
		copy: [{
			from: DEV + ROOT + '/%type%' + ASSETS + '/lib/**/*',
			to: PUBLIC + ROOT + '/%type%' + ASSETS + '/lib'
		}, {
			from: DEV + ROOT + '/%type%' + ASSETS + '/font/**/*',
			to: PUBLIC + ROOT + '/%type%' + ASSETS + '/font'
		}, {
			from: DEV + ROOT + '/%type%' + ASSETS + '/video/**/*',
			to: PUBLIC + ROOT + '/%type%' + ASSETS + '/video'
		}]
	}
};
