/**
 * EJSタスク
 * EJSで作られたファイルを指定ディレクトリにコンパイルして出力する
 */
var gulp = require('gulp');
var config = require('./config');
var ejs = require("gulp-ejs");
var browser = require('browser-sync');
var plumber = require('gulp-plumber');
var fs = require('fs');
var rename = require('gulp-rename');

gulp.task('ejs', function() {
   return gulp.src(config.path.ejs.src)
      .pipe(plumber({
         errorHandler: notify.onError('<%= error.message %>')
      }))
      .pipe(ejs(config.ejs))
      .pipe(gulp.dest(config.path.ejs.dest))
      .pipe(browser.stream());
});

/**
 * jsonタスク
 */
gulp.task('json', function() {
   var json = JSON.parse(fs.readFileSync(config.path.json.config)); // JSONの読み込み
   var pages = json.pages;
   for (var i = 0; i < pages.length; i++) { // ページの数だけループ
      var id = pages[i].id;
      gulp.src(config.path.json.src)
         .pipe(ejs({
            jsonData: pages[i] // JSONのデータをejsに渡す
         }))
         .pipe(rename(id + ".html")) // (id).htmlにファイル名を変更
         .pipe(gulp.dest(config.path.json.dest));
   }
});
