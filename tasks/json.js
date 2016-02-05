/**
 * style-guide
 */
var gulp = require('gulp');
var config = require('./config');
var ejs = require("gulp-ejs");
var fs = require('fs');
var rename = require('gulp-rename');

gulp.task('json-html', function() {
   var json_file = DEV + 'contents/guide/know-how/assets/data/qa.json'; // 設定用JSONファイル
   var tmp_file = DEV + 'contents/guide/know-how/assets/ejs/_qa.ejs'; // テンプレート用EJSファイル

   var json = JSON.parse(fs.readFileSync(json_file)); // JSONの読み込み
   var pages = json.pages;

   for (var i = 0; i < pages.length; i++) { // ページの数だけループ
      var id = pages[i].id;
      gulp.src(tmp_file)
         .pipe(ejs({
            jsonData: pages[i] // JSONのデータをejsに渡す
         }))
         .pipe(rename(id + ".html")) // (id).htmlにファイル名を変更
         .pipe(gulp.dest(BUILD + 'contents/guide/know-how/')); // 指定したフォルダに出力
   }
});
