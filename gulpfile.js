var gulp = require('gulp');
var runSequence = require('run-sequence');

// gulpディレクトリのタスク読み込み
var tasks = require('./tasks/load');
var config = require('./tasks/config');

/**
 * 監視タスク
 */
gulp.task('watch', function() {
   gulp.watch(config.path.ejs.watch, ['ejs']);
   gulp.watch(config.path.html.src, ['html']);
   gulp.watch(config.path.style.watch, ['style']);
   gulp.watch(config.path.images.watch, ['images']);
   gulp.watch(config.path.sprite.watch, ['sprite', 'style', 'copy']);
   var copyWatches = [];
   // 複製タスクはループで回して監視対象とする
   if (config.path.copy) {
      config.path.copy.forEach(function(src) {
         copyWatches.push(src.from);
      });
      gulp.watch(copyWatches, ['copy']);
   }
});
/**
 * ビルドタスク
 */
gulp.task('build', ['clean'], function(callback) {
   runSequence('sprite', ['ejs', 'style', 'script', 'images', 'copy'], callback);
});
/**
 * プロダクションリリースタスク
 */
gulp.task('production', function(callback) {
   config.IS_PRODUCTION = true;
   return runSequence('build', callback);
});

/**
 * デフォルトタスク
 */

var defaultTasks = ['server', 'watch', 'watchScript'];

gulp.task('default', function() {
   return runSequence(defaultTasks);
});
