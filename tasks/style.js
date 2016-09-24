'use strict';
/**
 * スタイルタスク
 * SCSSをコンパイルしてAutoprefixerをかける。プロダクションリリース時にはsourcemapを出力しない
 */
var gulp = require('gulp');
var config = require('./config');
var autoprefixer = require('autoprefixer');
var browser = require("browser-sync");
var cssMqpacker = require('css-mqpacker');
var cssnano = require('cssnano');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var gulpif = require('gulp-if');

gulp.task('style', () => {
   config.style = config.style || {};
   return gulp.src(config.path.style.src)
      .pipe(plumber({
         errorHandler: notify.onError('<%= error.message %>')
      }))
      .pipe(gulpif(process.env.NODE_ENV !== "production", sourcemaps.init()))
      .pipe(sass(config.style.sass))
      .pipe(gulpif(process.env.NODE_ENV === "production", postcss([cssnano()])))
      .pipe(postcss([
         autoprefixer(config.style.autoprefixer),
         cssMqpacker(config.style.mqpacker)
      ]))
      .pipe(gulpif(process.env.NODE_ENV !== "production", sourcemaps.write('./maps')))
      .pipe(gulp.dest(config.path.style.dest))
      .pipe(browser.stream({
         match: '**/*.css'
      }));
});
