'use strict';
/*
 * タスク設定ファイル
 */
const DEV = 'src',
	PUBLIC = 'public',
	DIST = PUBLIC + '',
	ASSETS = '/assets',
	DIR = {
		VIEW: '/view',
		CSS: ASSETS + '/css',
		JS: ASSETS + '/js',
		IMG: ASSETS + '/img',
		LIB: ASSETS + '/lib',
		FONT: ASSETS + '/font',
		STATIC: '/static',
	};
module.exports = {
	// ドキュメントルート
	public: PUBLIC + '/%type%',
	// 出力先ディレクトリ
	dist: DIST + '/%type%',
	// gulpコマンドでデフォルトで監視するディレクトリ
	defaultPath: 'pc',
	// サーバー設定 BrowserSync(http://www.browsersync.io/docs/options/)
	server: {
		//proxy: "192.168.33.10", proxy: "10.0.23.16",
		ghostMode: {
			clicks: false,
			location: false,
			forms: false,
			scroll: false
		}
	},
	// htmlhintの設定
	htmlhint: '.htmlhintrc',
	// CSSの設定
	style: {
		sass: {
			outputStyle: 'expanded'
		},
		autoprefixer: {
			browsers: ["last 3 version", "iOS >= 8", "Android >= 4.0", "ie >= 9"]
		},
		mqpacker: {
			sort: true
		}
	},
	// スタイルガイドの設定 sc5-styleguide(https://github.com/SC5/sc5-styleguide)
	styleguide: {
		out: 'styleguide/%type%',
		title: 'styleguide',
		server: true,
		port: 5000,
		overviewPath: 'wiki/style.md',
		sideNav: true,
		disableEncapsulation: true,
		extraHead: [],
	},
	// パス設定
	path: {
		html: {
			dest: DIST + '/%type%/**/*.html',
		},
		// HTML関連
		view: {
			src: [DEV + '/%type%/' + DIR.VIEW + '/**/*.ejs', '!' + DEV + '/%type%/' + DIR.VIEW + '/**/_*.ejs'],
			watch: DEV + '/%type%/' + DIR.VIEW + '/**/*.ejs',
			dest: DIST + '/%type%'
		},
		// スタイル関連
		style: {
			src: [DEV + '/%type%' + DIR.CSS + '/**/*.scss', '!' + DEV + '/%type%' + DIR.CSS + '/**/_*.scss'],
			watch: DEV + '/%type%' + DIR.CSS + '/**/*.scss',
			dest: DIST + '/%type%' + DIR.CSS
		},
		image: {
			src: DEV + '/%type%' + DIR.IMG + '/**/*.+(jpg|png|gif|svg)',
			dest: DIST + '/%type%' + DIR.IMG
		},
		// Javascript
		js: {
			src: [DEV + '/%type%' + DIR.JS + '/**/*.js', '!' + DEV + '/%type%' + DIR.JS + '/**/_*.js'],
			dest: DIST + '/%type%' + DIR.JS
		},
		// 複製
		copy: [{
			from: DEV + '/%type%' + DIR.LIB + '/**/*',
			to: DIST + '/%type%' + DIR.LIB
		}, {
			from: DEV + '/%type%' + DIR.FONT + '/**/*',
			to: DIST + '/%type%' + DIR.FONT
		}, {
			from: DEV + '/%type%' + DIR.STATIC + '/**/*',
			to: DIST + '/%type%'
		}]
	}
};
