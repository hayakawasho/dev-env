/**
 * jsonタスク
 */
var gulp = require('gulp');
var config = require('./config');
var fs = require('fs');
var ejs = require("gulp-ejs");
var rename = require('gulp-rename');

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
