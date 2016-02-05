/**
 * スクリプトタスク
 */

var gulp = require('gulp');
var config = require('./config');
var coffee = require('gulp-coffee');
var plumber = require("gulp-plumber");
var browser = require("browser-sync");
var conf;

//coffee script
gulp.task('coffee', function() {　
   return gulp.src(config.path.coffee.src)
      .pipe(plumber())
      .pipe(coffee())
      .pipe(gulp.dest(config.path.js.dest))
      .pipe(browser.stream());
});
