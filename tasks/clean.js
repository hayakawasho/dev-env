'use strict';
/**
 * クリーンタスク
 * 指定されたディレクトリ以下をすべて削除する
 */
const gulp = require('gulp');
const del = require('del');
const config = require('./config');

gulp.task('clean', (callback) => {
   del.sync([config.dist]);
   callback();
});
