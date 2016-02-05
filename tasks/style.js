/**
 * スタイルタスク
 * SCSSをコンパイルしてAutoprefixerをかける。プロダクションリリース時にはsourcemapを出力しない
 */
var gulp = require('gulp');
var config = require('./config');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var browser = require("browser-sync");
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var gulpif = require('gulp-if');
var autoprefixer = require('autoprefixer');

gulp.task('style', function() {
   config.style = config.style || {};
   return gulp.src(config.path.style.src)
      .pipe(plumber({
         errorHandler: notify.onError('<%= error.message %>')
      }))
      .pipe(gulpif(!config.IS_PRODUCTION, sourcemaps.init()))
      .pipe(sass(config.style.sass))
      .pipe(postcss([
         autoprefixer(config.style.autoprefixer)
      ]))
      .pipe(gulpif(!config.IS_PRODUCTION, sourcemaps.write('./maps')))
      .pipe(gulp.dest(config.path.style.dest))
      .pipe(browser.stream({
         match: '**/*.css'
      }));
});
