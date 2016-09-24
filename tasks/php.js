'use strict';
/**
 * phpタスク
 *
 */
let gulp = require('gulp');
let config = require('./config');
let browser = require('browser-sync');

gulp.task('php', function() {
  return gulp.src(config.path.php.src)
  .pipe(gulp.dest(config.path.php.dest))
  .pipe(browser.reload( { stream: true } ))
});
