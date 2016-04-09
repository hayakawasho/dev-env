'use strict';

let gulp = require('gulp');
let runSequence = require('run-sequence');

// gulpディレクトリのタスク読み込み
let tasks = require('./tasks/load');
let config = require('./tasks/config');

/**
 * 監視タスク
 */
gulp.task('watch', () => {
   gulp.watch(config.path.ejs.watch, ['ejs']);
   gulp.watch(config.path.html.src, ['html']);
   gulp.watch(config.path.style.watch, ['style']);
   gulp.watch(config.path.images.watch, ['images']);
   gulp.watch(config.path.sprite.watch, ['sprite', 'style', 'copy']);
   var copyWatches = [];
   // 複製タスクはループで回して監視対象とする
   if (config.path.copy) {
      config.path.copy.forEach((src) => {
         copyWatches.push(src.from);
      });
      gulp.watch(copyWatches, ['copy']);
   }
});
/**
 * ビルドタスク
 */
gulp.task('build', ['clean'], (callback) => {
   runSequence('sprite', ['ejs', 'style', 'script', 'images', 'copy'], callback);
});
/**
 * プロダクションリリースタスク
 */
gulp.task('production', (callback) => {
   config.IS_PRODUCTION = true;
   return runSequence('build', callback);
});

/**
 * デフォルトタスク
 */

var defaultTasks = ['server', 'watch', 'watchScript'];

gulp.task('default', () => {
   return runSequence(defaultTasks);
});
