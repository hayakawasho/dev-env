/**
 * HTML Lintタスク
 * HTMLが変更されたときにLintを通す
 */
var gulp = require('gulp');
var config = require('./config');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var htmlhint = require('gulp-htmlhint');

gulp.task('html', function() {
   return gulp.src(config.path.html.src)
      .pipe(plumber({
         errorHandler: notify.onError('<%= error.message %>')
      }))
      .pipe(htmlhint(config.htmlhint))
      .pipe(htmlhint.reporter())
      .pipe(htmlhint.failReporter());
});
